import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { QuestService } from '../../services/quest.service';
import { SubSink } from 'subsink';
import {
  Questform,
  QuestGiverEntityType,
} from '../../../../types/questform.type';
import {
  HlmCardContentDirective,
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { ObjectiveDialogComponent } from './objective-dialog/objective-dialog.component';
import { provideIcons } from '@spartan-ng/ui-icon-helm';
import { lucidePlus, lucideTrash } from '@ng-icons/lucide';
import { HlmIconComponent } from '../../../../shared/directives/ui-icon-helm/src/lib/hlm-icon.component';
import { QuestGiverDialogComponent } from './quest-giver-dialog/quest-giver-dialog.component';
import { HlmSwitchComponent } from '@spartan-ng/ui-switch-helm';

@Component({
  selector: 'app-quest-form',
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
  providers: [provideIcons({ lucideTrash, lucidePlus })],
  templateUrl: './quest-form.component.html',
  styleUrl: './quest-form.component.scss',
})
export class QuestFormComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  private questService = inject(QuestService);
  private fb = inject(FormBuilder);
  private subs = new SubSink();

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
    });

    console.log(this.form.value);

    this.subs.sink = this.form.valueChanges.subscribe((value: Questform) => {
      this.questService.setQuestValues(value);
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }

  createObjective(type?: 'Item Drop' | 'NPC Target'): FormGroup {
    if (type === 'Item Drop')
      return this.fb.group({ objectiveItemID: 0, count: 0 });

    return this.fb.group({ objectiveCreatureID: 0, count: 0 });
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
    return this.fb.group({ entityType, id: '', starter: true });
  }

  get questGivers(): FormArray {
    return this.form.get('questGivers') as FormArray;
  }

  addQuestGiver(entityType: QuestGiverEntityType) {
    this.questGivers.push(this.createQuestGiver(entityType));
  }

  removeQuestGiver(index: number) {
    this.questGivers.removeAt(index);
  }
}
