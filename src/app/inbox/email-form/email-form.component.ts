import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailRequest } from 'src/app/shared/dto/email-request';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent implements OnInit {
  @Input() email: EmailRequest;

  @Output() submitEmail = new EventEmitter();
  emailForm = new FormGroup({
    to: new FormControl('', [Validators.required, Validators.email]),
    from: new FormControl({value: '', disabled: true}),
    subject: new FormControl('', Validators.required),
    text: new FormControl('', Validators.required)
  })

  ngOnInit() {
    if (this.email) {
      const { to, from, subject, text } = this.email;
      this.emailForm.setValue({ 
        to: to,
        subject: subject,
        text: text,
        from: from
      })
    }
  }

  onSubmit() {
    if (this.emailForm.invalid) {
      return;
    }

    this.submitEmail.emit(this.emailForm.value);
  }

  get subject() {
    return this.emailForm.controls.subject;
  }

  get from() {
    return this.emailForm.controls.from;
  }

  get to() {
    return this.emailForm.controls.to;
  }

  get text() {
    return this.emailForm.controls.text;
  }
}
