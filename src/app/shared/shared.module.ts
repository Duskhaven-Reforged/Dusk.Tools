import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { SelectComponent } from './select/select.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { RadioComponent } from './radio/radio.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './error/error.component';
import { AddressComponent } from './address/address.component';



@NgModule({
  declarations: [
    InputComponent,
    SelectComponent,
    CheckboxComponent,
    RadioComponent,
    ErrorComponent,
    AddressComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    InputComponent,
    SelectComponent,
    CheckboxComponent,
    RadioComponent,
    ErrorComponent,
    AddressComponent
  ]
})
export class SharedModule { }
