import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-spell-form',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule, CommonModule],
  templateUrl: './spell-form.component.html',
  styleUrl: './spell-form.component.scss'
})
export class SpellFormComponent {
  form!: FormGroup;
  genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];
  subscriptionOptions = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      terms: [false, Validators.requiredTrue],
      subscription: ['', Validators.required],
      items: this.fb.array([this.createItem()]),
      addresses: this.fb.array([this.createAddress()])
    });
  }

  get items() {
    return this.form.get('items') as FormArray;
  }

  createItem(): FormGroup {
    return this.fb.group({
      itemName: ['', Validators.required]
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
    return this.fb.group({address:''});
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
