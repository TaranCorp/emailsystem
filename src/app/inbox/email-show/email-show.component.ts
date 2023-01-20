import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailResponse } from 'src/app/shared/dto/email-response';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent implements OnInit {
  email: EmailResponse;

  constructor(
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this.route.data.subscribe(({email}) => {
      this.email = email;
    });
  }
}
