import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { lucideChevronDown } from '@ng-icons/lucide';
import { provideIcons } from '@spartan-ng/ui-icon-helm';
import { SelectChoice } from '../../../types/selectChoice.type';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
    provideIcons({ lucideChevronDown }),
  ],
})
export class SelectComponent implements ControlValueAccessor {
  @Input() label!: string;
  @Input() options!: SelectChoice[];

  value: any;
  onChange: any = () => {};
  onTouched: any = () => {};
  isDisabled: boolean = false;

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  handleInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
    this.onTouched();
  }

  selectOption(option: SelectChoice, ctx: any) {
    this.onChange(option.value);
    this.writeValue(option.value);
    ctx.close();
  }

  findOptionFromValue(value: any) {
    const selectedOption = this.options.find((op) => op.value === value);
    if (selectedOption) return selectedOption.label;

    return value;
  }
}
