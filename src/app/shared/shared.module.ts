import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { SelectComponent } from './components/select/select.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { RadioComponent } from './components/radio/radio.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './components/error/error.component';
import { AddressComponent } from './components/address/address.component';



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
