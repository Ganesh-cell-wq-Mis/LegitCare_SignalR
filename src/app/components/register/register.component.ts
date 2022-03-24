import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  RegForm: any = FormGroup;
  dataSource:any
  roles:any=[
    {'value':'Patient'},
    {'value':'Doctor'},
  ]


  constructor(private formbuilder: FormBuilder, private service: DataService) {}

  ngOnInit(): void {
    this.PageLoadEvent();
    //this.GetDoctorDrop();
  }



  // GetDoctorDrop() {
  //   this.service.getDoctorDrop().subscribe(data => {

  //     if (data.isSuccess) {
  //       this.dataSource = data.listResult;
  //       console.log(this.dataSource);
  //     }
  //   },
  //     );
  // }
  PageLoadEvent() {
    this.RegForm = this.formbuilder.group({
      userID: [],
      firstName: [],
      lastName: [],
      mobileNumber: [''],
      emailId: [''],
      roleName: [],
      password: [''],
      reportingId:[null],

    });
  }

  onSubmit() {
    if (this.RegForm.invalid) {
      return;

    }
    let formModel = this.RegForm.value;

    var reg = {
      'userId': formModel.userID,
      'userName': formModel.emailId,
      'mobileNumber':formModel.mobileNumber,
      'emailId': formModel.emailId,
      'password': formModel.password,
      'roleName': 'PATIENT',
      'firstName': formModel.firstName,
      'lastName': formModel.lastName,
      'reportingId':7
      // 'reportingId':formModel.reportingId==''?null:Number(formModel.reportingId)
    };
    this.service.registerUser(reg).subscribe((data) => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
      if(data.isSuccess){
        this.RegForm.reset();
      }else{
      }
    },
    error => {
      console.log("Error")
      // this.toaster.error('UnAuthorize Customer', 'Error');
      //error.error
    });
  }
}
