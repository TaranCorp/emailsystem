import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailRequest } from '../shared/dto/email-request';
import { EmailResponse } from '../shared/dto/email-response';
import { Rest } from '../shared/rest';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  rootUrl = Rest.angularEmailApiUrl;

  constructor(private httpClient: HttpClient) { }

  getEmails() {
    return this.httpClient.get<Array<EmailResponse>>(`${this.rootUrl}/emails`);
  }

  getEmail(id: number) {
    return this.httpClient.get<EmailResponse>(`${this.rootUrl}/emails/${id}`);
  }

  createEmail(email: EmailRequest) {
    return this.httpClient.post(`${this.rootUrl}/emails`, { ...email });
  }
}
