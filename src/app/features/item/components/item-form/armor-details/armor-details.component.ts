import {
  Component,
  forwardRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { HlmCardImports } from '@spartan-ng/ui-card-helm';
import { SubSink } from 'subsink';
import { SharedModule } from '../../../../../shared/shared.module';
import { WeaponDetailsComponent } from '../weapon-details/weapon-details.component';
import { SelectChoice } from '../../../../../types/selectChoice.type';
import {
  armorTypeOptions,
  slotOptions,
} from '../../../../../shared/utils/itemFormOptions';

@Component({
  selector: 'app-armor-details',
  standalone: true,
  imports: [HlmCardImports, ReactiveFormsModule, SharedModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ArmorDetailsComponent),
      multi: true,
    },
  ],
  templateUrl: './armor-details.component.html',
  styleUrl: './armor-details.component.scss',
})
export class ArmorDetailsComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  form!: FormGroup;
  private fb = inject(FormBuilder);
  private subs = new SubSink();

  armorTypeOptions: SelectChoice[] = armorTypeOptions;
  slotOptions: SelectChoice[] = slotOptions;

  constructor() {
    this.form = this.fb.group({
      type: [''],
      slot: [''],
      armor: [0],
      durability: [0],
    });
  }

  ngOnInit(): void {
    this.subs.sink = this.form.valueChanges.subscribe((value) => {
      this.onChange(value);
      this.onTouched();
    });
  }

  ngOnDestroy(): void {}

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    if (value) {
      this.form.setValue(value, { emitEvent: false });
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }
}
