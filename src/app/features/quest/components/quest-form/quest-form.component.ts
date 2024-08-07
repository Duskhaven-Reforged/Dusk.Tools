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
import { Questform } from '../../../../types/questform.type';
import {
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  BrnDialogTriggerDirective,
  BrnDialogContentDirective,
} from '@spartan-ng/ui-dialog-brain';
import {
  HlmDialogComponent,
  HlmDialogContentComponent,
  HlmDialogHeaderComponent,
  HlmDialogFooterComponent,
  HlmDialogTitleDirective,
  HlmDialogDescriptionDirective,
} from '@spartan-ng/ui-dialog-helm';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { lucidePlus } from '@ng-icons/lucide';

@Component({
  selector: 'app-quest-form',
  standalone: true,
  imports: [
    SharedModule,
    ReactiveFormsModule,
    CommonModule,
    HlmCardDirective,
    HlmCardTitleDirective,
    HlmCardHeaderDirective,
    HlmButtonDirective,
    BrnDialogTriggerDirective,
    BrnDialogContentDirective,
    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogHeaderComponent,
    HlmDialogFooterComponent,
    HlmDialogTitleDirective,
    HlmDialogDescriptionDirective,
    HlmIconComponent,
  ],
  providers: [provideIcons({ lucidePlus })],
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
      objectives: this.fb.array([this.createObjective()]),
    });

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

  createObjective(): FormGroup {
    return this.fb.group({ address: '' });
  }

  get objectives(): FormArray {
    return this.form.get('objectives') as FormArray;
  }

  addObjective() {
    this.objectives.push(this.createObjective());
  }
}
