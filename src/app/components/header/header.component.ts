import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  UserData: any;
  DoctorLogin: boolean = false;
  RoleName:any
  constructor() {
    this.RoleName=sessionStorage.getItem('RoleName')
    this.UserData = JSON.parse(
      sessionStorage.getItem('UserInformation') || '{}');
  }

  ngOnInit(): void {
    this.DoctorLogin=this.RoleName=="Admin"?false:true;
  }
  logout() {
    sessionStorage.clear();
    window.location.href = 'login';
  }

}
