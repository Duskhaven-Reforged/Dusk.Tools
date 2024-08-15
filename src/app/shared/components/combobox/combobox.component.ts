import { Component, inject, Input, OnChanges, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import {
  lucideChevronsUpDown,
  lucideCheck,
  lucideSearch,
} from '@ng-icons/lucide';
import { SelectChoice } from '../../../types/selectChoice.type';
import Fuse from 'fuse.js';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-combobox',
  templateUrl: './combobox.component.html',
  styleUrl: './combobox.component.scss',
  providers: [
    provideIcons({ lucideChevronsUpDown, lucideCheck, lucideSearch }),
  ],
})
export class ComboboxComponent implements OnChanges {
  dropdownVisible = false;
  selectedItem = signal<SelectChoice | undefined>(undefined);
  @Input() options!: SelectChoice[];
  @Input() label!: string;
  @Input() control!: AbstractControl;
  private fb = inject(FormBuilder);
  private fuse!: Fuse<SelectChoice>;
  private subs = new SubSink();
  shownItems: SelectChoice[] = [];

  searchForm!: FormGroup;

  constructor() {
    this.searchForm = this.fb.group({
      input: [''],
    });

    this.subs.sink = this.searchForm.valueChanges.subscribe(
      (value: { input: string }) => {
        if (value.input !== '') {
          this.shownItems = this.searchList(value.input);
        } else {
          this.shownItems = this.options;
        }
      }
    );
  }

  ngOnChanges(): void {
    this.shownItems = this.options;
    this.fuse = new Fuse(this.options, {
      keys: ['label'],
      minMatchCharLength: 2,
      threshold: 0.3,
    });
  }

  onModelChange(event: any): void {
    const choice = this.selectedItem();
    if (choice) {
      this.selectedItem.set({ ...choice, label: event });
    }
  }

  searchList(input: string) {
    const result = this.fuse.search(input);
    this.fuse.getIndex();
    console.log(this.fuse.getIndex());

    return result.map((res) => res.item);
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  selectOption(option: SelectChoice) {
    this.selectedItem.set(option);
    this.control.setValue(option.value);
    this.dropdownVisible = false;
  }
}
