import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ContactDetail } from './contact-detail.model';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  formData: ContactDetail;
  readonly BaseURL = 'http://localhost:55043/api';
  list: ContactDetail[];

  userIdString: string;
  userName:string;
  Email:string;

  count:number;
  Pages:number;
  curentPage = 1;
  countPerPage = 10;

  Auth: string;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,

  ) { }

  //REGISTER
  formModel = this.fb.group({
    FirstName: ['', [Validators.required, Validators.minLength(2)]],
    LastName: ['', [Validators.required, Validators.minLength(2)]],
    UserName: ['', [Validators.required, Validators.minLength(6), Validators.pattern("^[a-zA-Z][a-zA-Z0-9._]*[a-zA-Z0-9]$")]],
    Email: ['', [Validators.email, Validators.required, Validators.pattern("^[a-zA-Z0-9._@]*$")]],
    PhoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]*$"), Validators.maxLength(14)]],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })


  });

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.formData = {
      ContactId: 0,
      Name: '',
      PhoneNumber: '',
      Adress: '',
      Email: '',
      UserId: this.getTokenUserId()
    }
  }

  comparePasswords(fb: FormGroup) {
    let confirmPasswordControl = fb.get('ConfirmPassword');

    if (confirmPasswordControl.errors == null || 'passwordMismatch' in confirmPasswordControl.errors) {
      if (fb.get('Password').value != confirmPasswordControl.value)
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      else
        confirmPasswordControl.setErrors(null);

    }
  }

  register() {
    var body = {

      FirstName: this.formModel.value.FirstName,
      LastName: this.formModel.value.LastName,
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      PhoneNumber: this.formModel.value.PhoneNumber,
      Password: this.formModel.value.Passwords.Password

    };
    return this.http.post(this.BaseURL + '/ApplicationUser/Register', body);
  }

  //LOGIN
  login(formData) {
    return this.http.post(this.BaseURL + '/ApplicationUser/Login', formData);
  }
  getUserProfile() {
    return this.http.get(this.BaseURL + '/UserProfile');
  }
  ///////
  getUserId() {
    var token = localStorage.getItem('token');
    var decoded = jwt_decode(token);
    this.userIdString = decoded['UserID'];

  }

  getTokenUserId() {
    var token = localStorage.getItem('token');
    var decoded = jwt_decode(token);

    return decoded['UserID'];
  }
  ///////
  //CONTACT DETAILS

  postContactDetail() {
    return this.http.post(this.BaseURL + '/ContactDetail', this.formData);
  }
  putContactDetail() {
    return this.http.put(this.BaseURL + '/ContactDetail/' + this.formData.ContactId, this.formData);
  }
  deleteContactDetail(id) {
    return this.http.delete(this.BaseURL + '/ContactDetail/' + id);
  }
  getContactDetail(id) {
    return this.http.get(this.BaseURL + '/ContactDetail/' + id);
  }

  refreshList() {
    this.http.get(this.BaseURL + '/ContactDetail?id=' + this.userIdString + "&skip=" + ((this.curentPage - 1) * this.countPerPage) + "&take=" + this.countPerPage)
      .toPromise()
      .then(res => this.list = res as ContactDetail[]);
  }
  getPaginationInfo() {
    return this.http.get<number>(this.BaseURL + '/Count?id=' + this.userIdString);
    
  }
  

  //CONDITION
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);

  }

  insertRecord(form: NgForm) {
    if (this.userIdString != this.getTokenUserId()) {
      localStorage.removeItem('token');
      this.router.navigate(['/user/login']);
      document.querySelector(".modal-backdrop.fade.show").remove();
    }
    else {
      this.postContactDetail().subscribe(
        res => {
          this.resetForm(form);
          this.toastr.success('Submitted successfully', 'Contact Detail Register');
          this.refreshList();
        },
        (err) => {
          console.log(err);
        }
      )
    }
  }

  updateRecord(form: NgForm) {
    if (this.userIdString != this.getTokenUserId()) {
      localStorage.removeItem('token');
      this.router.navigate(['/user/login']);
      document.querySelector(".modal-backdrop.fade.show").remove();
    }
    else {
      this.putContactDetail().subscribe(
        res => {
          this.resetForm(form);
          this.toastr.info('Submitted successfully', 'Contact Detail Register');
          this.refreshList();
        },
        err => {
          console.log(err);
        }
      )
    }
  }


  onDelete(ContactId) {
    if(this.userIdString != this.getTokenUserId()){
      localStorage.removeItem('token');
      this.router.navigate(['/user/login']);
      document.querySelector(".modal-backdrop.fade.show").remove();
    }
    else{
    if (confirm('Are you sure to delete this record ?')) {
      this.deleteContactDetail(ContactId)
        .subscribe(res => {
          this.refreshList();
          this.toastr.warning('Deleted successfully', 'Contact Detail Register');
        },
          err => {
            console.log(err);
          })
    }
    }
  }
}
