import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss'
})
export class RadioComponent {
  @Input() form!: FormGroup;
  @Input() controlName!: string;
  @Input() options!: { value: string; label: string }[];
}
