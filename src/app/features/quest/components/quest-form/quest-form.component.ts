import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { lucidePlus, lucideTrash } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmCardContentDirective,
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { provideIcons } from '@spartan-ng/ui-icon-helm';
import { HlmSwitchComponent } from '@spartan-ng/ui-switch-helm';
import { SubSink } from 'subsink';
import { HlmIconComponent } from '../../../../shared/directives/ui-icon-helm/src/lib/hlm-icon.component';
import { SharedModule } from '../../../../shared/shared.module';
import { ObjectiveDialogComponent } from './objective-dialog/objective-dialog.component';
import { QuestGiverDialogComponent } from './quest-giver-dialog/quest-giver-dialog.component';
import { SingleQuestFormComponent } from './single-quest-form/single-quest-form.component';
import { QuestService } from '../../services/quest.service';
import { HlmAccordionImports } from '@spartan-ng/ui-accordion-helm';
import { BrnAccordionImports } from '@spartan-ng/ui-accordion-brain';

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
    SingleQuestFormComponent,
    HlmAccordionImports,
    BrnAccordionImports,
  ],
  providers: [
    provideIcons({
      lucideTrash,
      lucidePlus,
    }),
  ],
  templateUrl: './quest-form.component.html',
  styleUrl: './quest-form.component.scss',
})
export class QuestFormComponent implements OnInit, OnDestroy {
  parentForm!: FormGroup;
  private fb = inject(FormBuilder);
  private subs = new SubSink();
  private questService = inject(QuestService);

  ngOnInit(): void {
    this.parentForm = this.fb.group({
      quests: this.fb.array([this.createQuest()]),
    });

    this.subs.sink = this.parentForm.valueChanges.subscribe((value) => {
      this.questService.setQuestValues(value);
    });
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  createQuest(): FormGroup {
    return this.fb.group({
      quest: '',
    });
  }

  get quests() {
    return this.parentForm.get('quests') as FormArray;
  }

  addQuest() {
    this.quests.push(this.createQuest());
  }

  deleteQuest(index: number) {
    this.quests.removeAt(index);
  }
}
