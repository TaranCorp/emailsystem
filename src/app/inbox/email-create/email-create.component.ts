import { Component } from '@angular/core';
import { UserService } from 'src/app/authentication/user.service';
import { EmailRequest } from 'src/app/shared/dto/email-request';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.css']
})
export class EmailCreateComponent {
  showModal = false;

  constructor(
    private emailService: EmailService,
    private userService: UserService
  ) {}

  onEmailSubmit(event: EmailRequest) {
    this.emailService.createEmail(event).subscribe(() => {
      this.showModal = false;
    })
  }

  getEmailSchema(): EmailRequest {
    return {
      to: '',
      from: this.userService.username.getValue(),
      subject: '',
      text: ''
    };
  }
}
