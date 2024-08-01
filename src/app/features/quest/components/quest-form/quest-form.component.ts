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

@Component({
  selector: 'app-quest-form',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule, CommonModule],
  templateUrl: './quest-form.component.html',
  styleUrl: './quest-form.component.scss',
})
export class QuestFormComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ];
  subscriptionOptions = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
  ];
  private questService = inject(QuestService);
  private fb = inject(FormBuilder);
  private subs = new SubSink();

  constructor() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      terms: [false, Validators.requiredTrue],
      subscription: ['', Validators.required],
      items: this.fb.array([this.createItem()]),
      addresses: this.fb.array([this.createAddress()]),
    });

    this.subs.sink = this.form.valueChanges.subscribe((value) => {
      this.questService.setQuestValues(value);
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {}

  get items() {
    return this.form.get('items') as FormArray;
  }

  createItem(): FormGroup {
    return this.fb.group({
      itemName: ['', Validators.required],
    });
  }

  addItem(): void {
    this.items.push(this.createItem());
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  get addresses(): FormArray {
    return this.form.get('addresses') as FormArray;
  }

  createAddress(): FormGroup {
    return this.fb.group({ address: '' });
  }

  addAddress(): void {
    this.addresses.push(this.createAddress());
  }

  removeAddress(index: number): void {
    this.addresses.removeAt(index);
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
