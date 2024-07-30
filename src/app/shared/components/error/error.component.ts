import { Component, Input } from '@angular/core';
import { AbstractControl, AbstractControlDirective, FormControl } from '@angular/forms';

type ErrorMessages = {
  [key: string]: (params: any) => string;
};


@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent {
  errorMsgList: any = [];
  @Input() controlName!: AbstractControl | AbstractControlDirective

  errorMessage: ErrorMessages  = {
    'required': (params: any) => `This field is required`,
    'maxlength': (params: any) => `Maximum ${params.requiredLength} characters are allowed`,
    'minlength': (params: any) => `Minimum ${params.requiredLength} characters are required`,
    'pattern': (params: any) => `Invalid format`,
    'email': (params: any) => `Not a valid email address`,
    'min': (params: any) => `Minimum amount should be ₹ ${params.min}`,
    'whitespace': (params: any) => `White spaces are not allowed`
  };

  listErrors() {
    if (!this.controlName) return [];
    if (this.controlName.errors) {
      this.errorMsgList = [];
      Object.keys(this.controlName.errors).map(error => {
        this.controlName.touched || this.controlName.dirty ?
          this.errorMsgList.push(this.errorMessage[error](this.controlName?.errors?.[error])) : '';
      });
      return this.errorMsgList;
    }
    else {
      return [];
    }
  }
}
