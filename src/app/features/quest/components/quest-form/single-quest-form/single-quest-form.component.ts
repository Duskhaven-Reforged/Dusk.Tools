import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  forwardRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { lucidePlus, lucideTrash } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmCardContentDirective,
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { HlmSwitchComponent } from '@spartan-ng/ui-switch-helm';
import { SubSink } from 'subsink';
import { SharedModule } from '../../../../../shared/shared.module';
import { AreaTableRoot } from '../../../../../types/areaTable.type';
import {
  Questform,
  QuestGiverEntityType,
} from '../../../../../types/questform.type';
import { SelectChoice } from '../../../../../types/selectChoice.type';
import { ObjectiveDialogComponent } from '../objective-dialog/objective-dialog.component';
import { QuestGiverDialogComponent } from '../quest-giver-dialog/quest-giver-dialog.component';

@Component({
  selector: 'app-single-quest-form',
  standalone: true,
  imports: [
    SharedModule,
    ReactiveFormsModule,
    CommonModule,
    HlmCardDirective,
    HlmCardTitleDirective,
    HlmCardContentDirective,
    HlmCardHeaderDirective,
    HlmButtonDirective,
    ObjectiveDialogComponent,
    HlmIconComponent,
    QuestGiverDialogComponent,
    HlmSwitchComponent,
  ],
  providers: [
    provideIcons({
      lucideTrash,
      lucidePlus,
    }),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SingleQuestFormComponent),
      multi: true,
    },
  ],
  templateUrl: './single-quest-form.component.html',
  styleUrl: './single-quest-form.component.scss',
})
export class SingleQuestFormComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  form!: FormGroup;
  private fb = inject(FormBuilder);
  private httpClient = inject(HttpClient);
  private subs = new SubSink();

  areaOptions: SelectChoice[] = [];

  questGiverOptions: SelectChoice[] = [
    { value: 'starter', label: 'Starter' },
    { value: 'ender', label: 'Ender' },
    { value: 'both', label: 'Both' },
  ];
  difficultyOptions: SelectChoice[] = [
    { value: '1', label: '1 - Simple Quests: Usually close by "Speak with X"' },
    {
      value: '2',
      label: '2 - Simple Quests: Further run distance than the former',
    },
    { value: '3', label: '3 - Simple Quests: Outside the quest-givers zone' },
    {
      value: '4',
      label:
        '4 - Normal Quests: Closeby Item Deliveries, "Slay X" where X < 10',
    },
    {
      value: '5',
      label:
        '5 - Normal Quests: Faraway Item Deliveries, "Slay X" where X > 10',
    },
    {
      value: '6',
      label: '6 - Elite Quests: Quests you need a group to complete',
    },
  ];

  factionOptions: { value: string; label: string }[] = [
    { value: 'neutral', label: 'Neutral' },
    { value: 'alliance', label: 'Alliance' },
    { value: 'horde', label: 'Horde' },
  ];

  handleInput(event: KeyboardEvent) {
    event.stopPropagation();
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      objectives: this.fb.array([]),
      designerComments: [''],
      moduleName: [''],
      objectiveText: [''],
      pickupText: [''],
      incompleteText: [''],
      completeText: [''],
      completeLogText: [''],
      POIs: this.fb.array([]),
      questGivers: this.fb.array([]),
      faction: ['neutral'],
      level: [0],
      levelRequired: [0],
      flags: this.fb.group({
        sharable: [false],
        pvp: [false],
        partyAccept: [false],
        repeatable: [false],
        stayAlive: [false],
        daily: [false],
        raid: [false],
        weekly: [false],
      }),
      groupSize: [0],
      difficulty: ['1'],
      areaSort: [''],
      startItem: [''],
      rewards: this.fb.group({
        money: [0],
        reputation: this.fb.array([]),
        items: this.fb.array([]),
        titleID: [''],
        honor: [0],
        choiceItems: this.fb.array([]),
      }),
    });

    this.subs.sink = this.form.valueChanges.subscribe((value: Questform) => {
      this.onChange(value);
      this.onTouched();
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.loadAreaTable();
  }

  private loadAreaTable() {
    this.httpClient.get('assets/data/areaTable.json').subscribe({
      next: (response) => {
        const data = response as AreaTableRoot;
        this.areaOptions = data.areaTable.map((areaTable) => {
          return {
            label: areaTable.AreaName_Lang_enUS,
            value: areaTable.ID.toString(),
          };
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  createObjective(type?: 'Item Drop' | 'NPC Target'): FormGroup {
    if (type === 'Item Drop')
      return this.fb.group({ objectiveItemID: '0', count: 0 });

    return this.fb.group({ objectiveCreatureID: '0', count: 0 });
  }

  get objectives(): FormArray {
    return this.form.get('objectives') as FormArray;
  }

  addObjective(type?: 'Item Drop' | 'NPC Target') {
    this.objectives.push(this.createObjective(type));
  }

  removeObjective(index: number) {
    this.objectives.removeAt(index);
  }

  createPOI(): FormGroup {
    return this.fb.group({ objective: 0, x: 0, y: 0, z: 0, o: 0, map: 0 });
  }

  get POIs(): FormArray {
    return this.form.get('POIs') as FormArray;
  }

  addPOI() {
    this.POIs.push(this.createPOI());
  }

  removePOI(index: number) {
    this.POIs.removeAt(index);
  }

  createQuestGiver(entityType: QuestGiverEntityType): FormGroup {
    return this.fb.group({
      entityType,
      id: '',
      type: 'ender',
      commentOut: false,
    });
  }

  get questGivers(): FormArray {
    return this.form.get('questGivers') as FormArray;
  }

  addQuestGiver(entityType: QuestGiverEntityType) {
    this.questGivers.push(this.createQuestGiver(entityType));
  }

  createReputationReward() {
    return this.fb.group({ factionID: [''], amount: [0] });
  }

  get reputationRewards(): FormArray {
    return this.form.get('rewards.reputation') as FormArray;
  }

  addReputationReward() {
    this.reputationRewards.push(this.createReputationReward());
  }

  removeReputationReward(index: number) {
    this.reputationRewards.removeAt(index);
  }

  removeQuestGiver(index: number) {
    this.questGivers.removeAt(index);
  }

  createItemReward() {
    return this.fb.group({ rewardItemID: [''], count: [0] });
  }

  get itemRewards(): FormArray {
    return this.form.get('rewards.items') as FormArray;
  }

  addItemReward() {
    this.itemRewards.push(this.createItemReward());
  }

  removeItemReward(index: number) {
    this.itemRewards.removeAt(index);
  }

  createChoiceItems() {
    return this.fb.group({ rewardItemID: [''], count: [0] });
  }

  get choiceItemRewards(): FormArray {
    return this.form.get('rewards.choiceItems') as FormArray;
  }

  addChoiceItemReward() {
    this.choiceItemRewards.push(this.createChoiceItems());
  }

  removeChoiceItemReward(index: number) {
    this.choiceItemRewards.removeAt(index);
  }

  writeValue(value: any): void {
    if (value) {
      this.form.setValue(value, { emitEvent: false });
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }
}
