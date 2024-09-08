import {
  Component,
  ElementRef,
  HostListener,
  inject,
  Input,
  OnChanges,
  Renderer2,
  signal,
  ViewChild,
} from '@angular/core';
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
  ControlValueAccessor,
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
export class ComboboxComponent implements OnChanges, ControlValueAccessor {
  dropdownVisible = false;
  selectedItem = signal<SelectChoice | undefined>(undefined);
  @Input() options!: SelectChoice[];
  @Input() label!: string;
  @Input() control!: AbstractControl;
  private fb = inject(FormBuilder);
  private fuse!: Fuse<SelectChoice>;
  private subs = new SubSink();
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);
  shownItems: SelectChoice[] = [];

  @ViewChild('boundary') boundary!: ElementRef;
  @ViewChild('toggleButton') toggleButton!: ElementRef;

  searchForm!: FormGroup;

  constructor() {
    this.searchForm = this.fb.group({
      input: [''],
    });

    this.renderer.listen('window', 'click', (e: Event) => {
      if (
        !this.boundary.nativeElement.contains(e.target) &&
        this.dropdownVisible
      )
        this.dropdownVisible = false;
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

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    if (value) {
      const option = this.options.find((op) => op.value === value);
      if (!option) return;

      this.selectedItem.set(option);
      this.control.setValue(option.value);
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
      this.searchForm.disable();
    } else {
      this.searchForm.enable();
    }
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
