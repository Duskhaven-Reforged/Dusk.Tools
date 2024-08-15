import { NgModule } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { SelectComponent } from './components/select/select.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { RadioComponent } from './components/radio/radio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './components/error/error.component';
import { AddressComponent } from './components/address/address.component';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmSelectModule } from '@spartan-ng/ui-select-helm';
import { BrnSelectModule } from '@spartan-ng/ui-select-brain';
import { TextareaComponent } from './components/textarea/textarea.component';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { ComboboxComponent } from './components/combobox/combobox.component';
import {
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    InputComponent,
    SelectComponent,
    CheckboxComponent,
    RadioComponent,
    ErrorComponent,
    AddressComponent,
    TextareaComponent,
    ComboboxComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HlmInputDirective,
    HlmLabelDirective,
    HlmSelectModule,
    BrnSelectModule,
    HlmButtonDirective,
    FormsModule,
    CdkVirtualScrollViewport,
    CdkVirtualForOf,
    ScrollingModule,
    NgForOf,
  ],
  exports: [
    InputComponent,
    SelectComponent,
    CheckboxComponent,
    RadioComponent,
    ErrorComponent,
    AddressComponent,
    TextareaComponent,
    ComboboxComponent,
  ],
})
export class SharedModule {}
