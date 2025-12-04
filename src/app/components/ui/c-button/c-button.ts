import { Component, HostBinding, Input } from '@angular/core';
@Component({
  selector: 'c-button',
  imports: [],
  templateUrl: './c-button.html',
  styleUrl: './c-button.scss',
})
export class CButton {
  @Input() bgColor: string = "";
  @Input() fontSize: string = "";
  @Input() fontColor: string = "";

  @HostBinding('style')
  get style(): Record<string, boolean> {
    return {
      
    }
  }
}
