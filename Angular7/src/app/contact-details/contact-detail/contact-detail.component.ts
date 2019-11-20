import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styles: []
})
export class ContactDetailComponent implements OnInit {

  constructor(
    private service: UserService,
  ) { }

  ngOnInit() {
    this.service.getUserId();
    this.service.resetForm();

  }
}