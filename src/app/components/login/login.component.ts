import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { users } from 'src/app/users.Models.ts/Users.Model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = new Subject<users>();
  Reg:boolean=true
  loginForm: any;
  message: any = 'User id and password is worng';
  userData: any;
  submitted = false;
  count: any;
  constructor(private router: Router,
    private fb: FormBuilder,
    private service: DataService) { }

  ngOnInit(): void {
    this.formBuild();
  }
  formBuild() {
    this.loginForm = this.fb.group({
      UserName: [''],
      Password: [''],
    });
  }
  onLogin() {
    //this.IsWait=true;

    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    var loginReq = {
      UserName: this.loginForm.value.UserName,
      Password: this.loginForm.value.Password,
    };
    this.service.getLogin(loginReq).subscribe(
      (data) => {
        if (data.isSuccess) {
          sessionStorage.clear();
          sessionStorage.setItem(
            'UserInformation',
            JSON.stringify(data.result)
          );

          var res = data.result;
          this.authenticatedUser(
            res.email,
            res.userId,
            res.access_token,
            res.expires_in
          );
          this.UserData();
          this.router.navigate(['/Home'])
        } else {
          this.loginForm.reset();
        }
      },
      error => {
        console.log("Internal Error");
      }
    );
  }
  register(){
    this.Reg=false;
  }

  private authenticatedUser(
    email: any,
    userId: any,
    token: any,
    expireIn: any
  ) {
    const ExpirationDate = new Date(new Date().getTime() + expireIn * 1000);
    const user = new users(email, userId, token, ExpirationDate);
    this.user.next(user);
  }
  UserData() {

    let UserData = JSON.parse(sessionStorage.getItem('UserInformation') || '{}');
    sessionStorage.setItem('userId', UserData.userID);
    sessionStorage.setItem('email', UserData.emailId);
    sessionStorage.setItem('RoleName', UserData.role);
    sessionStorage.setItem('ReportingUserEmailId', UserData.userInfo.reportingUserEmailId);
  }

}
