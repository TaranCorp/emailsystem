import { Component, OnInit } from '@angular/core';
import { EmailResponse } from 'src/app/shared/dto/email-response';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-index',
  templateUrl: './email-index.component.html',
  styleUrls: ['./email-index.component.css']
})
export class EmailIndexComponent implements OnInit {
  emails: Array<EmailResponse> = [];

  constructor(private emailService: EmailService) {}

  ngOnInit() {
    this.initiateEmails();
  }

  private initiateEmails() {
    this.emailService.getEmails().subscribe(emails => {
      this.emails = emails;
    })
  }
}
