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
  HlmCardContentDirective,
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { ObjectiveDialogComponent } from './objective-dialog/objective-dialog.component';
import { provideIcons } from '@spartan-ng/ui-icon-helm';
import { lucideTrash } from '@ng-icons/lucide';
import { HlmIconComponent } from '../../../../shared/directives/ui-icon-helm/src/lib/hlm-icon.component';

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
  ],
  providers: [provideIcons({ lucideTrash })],
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
}
