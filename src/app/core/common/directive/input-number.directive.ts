import {Directive, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';

@Directive({
  selector: 'input[numbersAndLetterOnly]'
})
export class InputNumberDirective {
  @Output() valueChange = new EventEmitter();

  // Allow key codes for special events. Reflect :
  @Input() options: boolean = false;
  // Allow decimal numbers. The \. is only allowed once to occur
  private regex: RegExp = new RegExp(/^[0-9]+(\.[0-9]*){0,1}$/g);
  // Backspace, tab, end, home
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home'];

  constructor(private el: ElementRef) {
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    let current: string = this.el.nativeElement.value;
    let next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    let initalValue = this.el.nativeElement.value;
    if (this.options) {
      if (Number(initalValue) === 0) {
        this.el.nativeElement.value = null;
        event.preventDefault();
      }
    }
  }
}
