import { Component, Input, OnChanges } from '@angular/core';
import { EmailRequest } from 'src/app/shared/dto/email-request';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.css']
})
export class EmailReplyComponent implements OnChanges {
  showModal = false;
  @Input() email: EmailRequest;

  constructor(private emailService: EmailService) {}

  ngOnChanges() {
    this.email = {
      ...this.email,
      to: this.email.from,
      from: this.email.to,
      subject: `RE: ${this.email.subject}`
    }
  }

  onSubmit(email: EmailRequest) {
    this.emailService.createEmail(email).subscribe(() => {
      this.showModal = false;
    });
  }
}
