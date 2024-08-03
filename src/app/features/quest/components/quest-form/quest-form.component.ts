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

@Component({
  selector: 'app-quest-form',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule, CommonModule],
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
}
