import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { provideIcons } from '@ng-icons/core';
import { lucidePlus, lucideTrash } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmCardImports } from '@spartan-ng/ui-card-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmSwitchImports } from '@spartan-ng/ui-switch-helm';
import { SubSink } from 'subsink';
import { HlmSwitchComponent } from '../../../../shared/directives/ui-switch-helm/src/lib/hlm-switch.component';
import { SharedModule } from '../../../../shared/shared.module';
import { CreatureFamily, NPCForm } from '../../../../types/npcForm.type';
import { SelectChoice } from '../../../../types/selectChoice.type';
import { NpcService } from '../../services/npc.service';
import { ModelsDialogComponent } from '../models-dialog/models-dialog.component';

@Component({
  selector: 'app-npc-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    HlmCardImports,
    HlmLabelDirective,
    HlmSwitchImports,
    HlmSwitchComponent,
    ModelsDialogComponent,
    HlmIconComponent,
    HlmButtonDirective,
  ],

  providers: [provideIcons({ lucideTrash, lucidePlus })],
  templateUrl: './npc-form.component.html',
  styleUrl: './npc-form.component.scss',
})
export class NpcFormComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private npcService = inject(NpcService);
  private subs = new SubSink();

  form!: FormGroup;
  unitClassOptions: SelectChoice[] = [
    { value: 'WARRIOR', label: 'Warrior' },
    { value: 'MAGE', label: 'Mage' },
    { value: 'ROGUE', label: 'Rogue' },
    { value: 'PALADIN', label: 'Paladin' },
  ];
  creatureTypeOptions: SelectChoice[] = [
    { value: 'NONE', label: 'None' },
    { value: 'BEAST', label: 'Beast' },
    { value: 'DRAGONKIN', label: 'Dragonkin' },
    { value: 'DEMON', label: 'Demon' },
    { value: 'ELEMENTAL', label: 'Elemental' },
    { value: 'GIANT', label: 'Giant' },
    { value: 'UNDEAD', label: 'Undead' },
    { value: 'HUMANOID', label: 'Humanoid' },
    { value: 'CRITTER', label: 'Critter' },
    { value: 'MECHANICAL', label: 'Mechanical' },
    { value: 'NOT_SPECIFIED', label: 'Not Specified' },
    { value: 'TOTEM', label: 'Totem' },
    { value: 'NON_COMBAT_PET', label: 'Non Combat Pet' },
    { value: 'GAS_CLOUD', label: 'Gas Cloud' },
    { value: 'WILD_PET', label: 'Wild Pet' },
    { value: 'ABBERATION', label: 'Abberation' },
  ];
  factionTemplateOptions: SelectChoice[] = [
    { value: 'NEUTRAL_NON_AGGRESSIVE', label: 'Neutral (Non Aggressive)' },
    { value: 'NEUTRAL_HOSTILE', label: 'Neutral (Hostile)' },
    { value: 'NEUTRAL_PASSIVE', label: 'Neutral (Passive)' },
    { value: 'STORMWIND', label: 'Stormwind' },
    { value: 'IRONFORGE', label: 'Ironforge' },
    { value: 'GNOMEREGAN', label: 'Gnomeregan' },
    { value: 'RATCHET', label: 'RATCHET' },
    { value: 'UNDERCITY', label: 'Undercity' },
    { value: 'DARNASSUS', label: 'Darnassus' },
    { value: 'ORGRIMMAR', label: 'Orgrimmar' },
    { value: 'THUNDER_BLUFF', label: 'Thunder Bluff' },
    { value: 'BLOODSAIL_BUCCANEERS', label: 'Bloodsail Buccaneers' },
    { value: 'BOOTY_BAY', label: 'Booty Bay' },
    { value: 'DARKSPEAR_TROLLS', label: 'Darkspear Trolls' },
    { value: 'Gadgetzan', label: 'Gadgetzan' },
    { value: 'CENARION_CIRCLE', label: 'Cenarion Circle' },
    { value: 'SILVERMOON', label: 'Silvermoon' },
    { value: 'EXODAR', label: 'Exodar' },
    { value: 'SHATAR', label: 'Shatar' },
    { value: 'KIRIN_TOR', label: 'Kirin Tor' },
    { value: 'BLACKROCK', label: 'Blackrock' },
  ];
  rankOptions: SelectChoice[] = [
    { value: 'NORMAL', label: 'Normal' },
    { value: 'ELITE', label: 'Elite' },
    { value: 'RARE_ELITE', label: 'Rare Elite' },
    { value: 'BOSS', label: 'Boss' },
    { value: 'RARE', label: 'Rare' },
  ];
  familyOptions: SelectChoice[] = [];
  damageSchoolOptions: SelectChoice[] = [
    { value: 'Normal', label: 'Normal' },
    { value: 'Holy', label: 'Holy' },
    { value: 'Fire', label: 'Fire' },
    { value: 'Nature', label: 'Nature' },
    { value: 'Frost', label: 'Frost' },
    { value: 'Shadow', label: 'Shadow' },
    { value: 'Arcane', label: 'Arcane' },
  ];

  handleInput(event: KeyboardEvent) {
    event.stopPropagation();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      subname: [''],
      moduleName: [''],
      minLevel: [0],
      maxLevel: [0],
      class: ['WARRIOR'],
      rank: ['NORMAL'],
      type: ['HUMANOID'],
      factionTemplate: ['STORMWIND'],
      family: ['BEAR'],
      damageSchool: ['Normal'],
      primaryFlags: this.createPrimaryFlags(),
      secondaryFlags: this.createSecondaryFlags(),
      gossipMenu: [''],
      designerComments: [''],
      models: this.fb.array([]),
      loot: this.fb.array([]),
      weapon: this.fb.group({ rightHand: '', leftHand: '', ranged: '' }),
    });

    this.subs.sink = this.form.valueChanges.subscribe((value) => {
      this.npcService.setNPCValues(value);
    });

    this.subs.sink = this.npcService.importedNPC.subscribe((value) => {
      this.importNPC(value);
      console.log(value);
    });

    this.familyOptions = this.enumToSelectChoices(CreatureFamily);
  }

  importNPC(values?: NPCForm) {
    if (!values) return;

    Object.entries(values).forEach(([key, value]) => {
      this.handleImport(key, value);
    });
  }

  handleImport(key: string, value: any): void {
    const control = this.form.get(key);

    if (!control) {
      console.warn(`Form control ${key} not found`);
      return;
    }

    switch (key) {
      case 'loot':
        (value as any[]).forEach(() => this.addLoot());
        control.patchValue(value);
        break;
      case 'models':
        (value as any[]).forEach(() =>
          this.addModel('npcID' in value ? 'npcID' : 'visualID')
        );
        control.patchValue(value);
        break;
      default:
        control.patchValue(value);
    }
  }

  createModel(type: 'npcID' | 'visualID'): FormGroup {
    if (type === 'npcID') return this.fb.group({ npcID: 0 });

    return this.fb.group({ visualID: 0 });
  }

  get models(): FormArray {
    return this.form.get('models') as FormArray;
  }

  addModel(type: 'npcID' | 'visualID') {
    this.models.push(this.createModel(type));
  }

  removeModel(index: number) {
    this.models.removeAt(index);
  }

  createLoot(): FormGroup {
    return this.fb.group({
      itemID: '',
      dropChance: 0,
      minDropAmount: 0,
      maxDropAmount: 0,
    });
  }

  get loot(): FormArray {
    return this.form.get('loot') as FormArray;
  }

  addLoot() {
    this.loot.push(this.createLoot());
  }

  removeLoot(index: number) {
    this.loot.removeAt(index);
  }

  enumToSelectChoices(enumValues: typeof CreatureFamily): SelectChoice[] {
    const choices: SelectChoice[] = [];

    Object.keys(enumValues).forEach((key) => {
      if (!isNaN(Number(key)))
        choices.push({
          value: `${enumValues[parseInt(key)]}`,
          label: `${enumValues[parseInt(key)]}`,
        });
    });

    return choices;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  createPrimaryFlags() {
    return this.fb.group({
      gossip: [false],
      repair: [false],
      questGiver: [false],
      flightMaster: [false],
      trainer: [false],
      innKeeper: [false],
      vendor: [false],
    });
  }

  createSecondaryFlags() {
    return this.fb.group({
      immuneToPlayers: [false],
      immuneToNPC: [false],
      // notInteractable: [false],
      // canWalk: [false],
      canSwim: [false],
      // canFly: [false],
      skinnable: [false],
      // noWoundAnimation: [false],
      forceGossip: [false],
      // isBoss: [false],
    });
  }
}
