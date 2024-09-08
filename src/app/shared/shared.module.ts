import {
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { CommonModule, NgForOf } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import {
  BrnPopoverModule,
  BrnPopoverTriggerDirective,
} from '@spartan-ng/ui-popover-brain';
import { HlmPopoverModule } from '@spartan-ng/ui-popover-helm';
import { BrnSelectModule } from '@spartan-ng/ui-select-brain';
import { AddressComponent } from './components/address/address.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { ComboboxComponent } from './components/combobox/combobox.component';
import { ErrorComponent } from './components/error/error.component';
import { InputComponent } from './components/input/input.component';
import { RadioComponent } from './components/radio/radio.component';
import { SelectComponent } from './components/select/select.component';
import { TextareaComponent } from './components/textarea/textarea.component';

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
    HlmPopoverModule,
    BrnPopoverModule,
    BrnPopoverTriggerDirective,
    BrnSelectModule,
    HlmButtonDirective,
    FormsModule,
    CdkVirtualScrollViewport,
    CdkVirtualForOf,
    ScrollingModule,
    NgForOf,
    HlmIconComponent,
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
