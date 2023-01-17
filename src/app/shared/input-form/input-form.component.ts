import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent {
  @Input() control: FormControl = new FormControl();
  @Input() label: string = '';
  @Input() type: string = 'text';

  showErrors(): boolean {
    return !!this.control.errors && this.control.touched && this.control.dirty
  }  
}
