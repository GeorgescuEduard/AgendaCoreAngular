import { ContactDetail } from './../../shared/contact-detail.model';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';

@Component({
  selector: 'app-contact-detail-list',
  templateUrl: './contact-detail-list.component.html',
  styles: []
})
export class ContactDetailListComponent implements OnInit {
  config: any;

  constructor(
    private service: UserService,
    private http: HttpClient,
  
  ) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems : 0
    };
   }

  ngOnInit() {
    this.service.getUserId();
    this.refreshList();
  }

  populateForm(contact: ContactDetail) {
    this.service.formData = Object.assign({}, contact);
  }
  pageChanged(event){
    this.config.currentPage = event;
    this.service.curentPage = event;
    this.refreshList();
    
  }

  refreshList() {
    this.service.getPaginationInfo().subscribe(result =>
      {
        this.config.totalItems =result;
      },
      (err) => {console.log(err);}
      );
    this.http.get(this.service.BaseURL + '/ContactDetail?id=' + this.service.userIdString + "&skip=" + ((this.service.curentPage - 1) * this.service.countPerPage) + "&take=" + this.service.countPerPage)
      .toPromise()
      .then(res => this.service.list = res as ContactDetail[]);
  }
  
}