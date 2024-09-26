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
import { SelectChoice } from '../../../../../types/selectChoice.type';
import {
  materialOptions,
  schoolOptions,
  subTypes,
} from '../../../../../shared/utils/itemFormOptions';
import { SharedModule } from '../../../../../shared/shared.module';
import { HlmSwitchComponent } from '@spartan-ng/ui-switch-helm';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { HlmLabelModule } from '@spartan-ng/ui-label-helm';

@Component({
  selector: 'app-weapon-details',
  standalone: true,
  imports: [
    HlmCardImports,
    ReactiveFormsModule,
    SharedModule,
    HlmSwitchComponent,
    NgxSliderModule,
    HlmLabelModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WeaponDetailsComponent),
      multi: true,
    },
  ],
  templateUrl: './weapon-details.component.html',
  styleUrl: './weapon-details.component.scss',
})
export class WeaponDetailsComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  form!: FormGroup;
  private fb = inject(FormBuilder);
  private subs = new SubSink();
  sliderOptions: Options = {
    floor: 1500,
    ceil: 4000,
  };

  subType: SelectChoice[] = subTypes;
  schoolOptions: SelectChoice[] = schoolOptions;
  materialOptions: SelectChoice[] = materialOptions;

  constructor() {
    this.form = this.fb.group({
      subType: [''],
      durability: [0],
      school: [''],
      schoolMin: [0],
      schoolMax: [0],
      material: [''],
      delay: [''],
      mainHandOnly: [false],
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
