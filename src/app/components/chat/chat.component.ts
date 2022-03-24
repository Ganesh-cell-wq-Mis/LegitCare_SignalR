import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MessageDto, Messages, notification } from 'src/app/Dto/MessageDto';
import { ChatService } from 'src/app/services/chat.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  //User Details
  user: any;
  to: any;
  roleName: any;

  //Arrays
  msgDto: MessageDto = new MessageDto();
  msgInboxArray: MessageDto[] = [];
  msgInboxAdminArray: notification[] = [];
  isChecked: boolean = false;

  //Form Array

  msgForm: FormGroup;

  constructor(
    private chatService: ChatService,
    private service: DataService,
    private fb: FormBuilder
  ) {
    this.user = sessionStorage.getItem('email');
    this.to = sessionStorage.getItem('ReportingUserEmailId');
    this.roleName = sessionStorage.getItem('RoleName');
    this.chatService
      .retrieveMappedObject()
      .subscribe((receivedObj: MessageDto) => {
        this.addToInbox(receivedObj);
      }); // calls the service method to get the new messages sent

    this.msgForm = this.fb.group({
      msgText: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.isChecked = true;
    this.getMessages();
  }
  get skills(): FormArray {
    return this.msgForm.get('msgText') as FormArray;
  }
  newSkill(): FormGroup {
    return this.fb.group({
      msg: '',
    });
  }
  addMsg() {
    (this.msgForm.controls['msgText'] as FormArray).push(this.newSkill());
    // this.skills.push(this.newSkill());
  }
  removeSkill(i: number) {
    this.skills.removeAt(i);
  }
  send(to: any, index: any): void {
debugger
    // if(this.msgDto) {
    let msg = (this.msgForm.get('msgText') as FormArray)
      .at(index)
      .get('msg').value;
    if (msg.length == 0) {
      window.alert('Message fields is required.');
      return;
    } else {
      var obj = new Messages();
      obj.from = this.user;
      obj.to = (this.to == null || this.to == "null") ? to : this.to;
      obj.message = msg;
      this.chatService.broadcastMessage(obj); // Send the message via a service
      (this.msgForm.get('msgText') as FormArray)
        .at(index)
        .get('msg')
        .setValue('');
    }
    // }
  }

  getMessages() {
    this.service
      .getAdminMessages(sessionStorage.getItem('email'))
      .subscribe((data: any) => {

        if (data.isSuccess) {
          this.msgInboxAdminArray =
            data.listResult == null ? [] : data.listResult;
          this.msgInboxAdminArray.forEach((element) => {
            this.addMsg();
          });
          console.log(this.msgInboxAdminArray);
          this.isChecked = true;
          if (
            this.roleName != 'Admin' &&
            (this.msgInboxAdminArray.length == 0 ||
              this.msgInboxAdminArray == null)
          ) {
            let countOjb = new notification();
            countOjb.from = this.to;
            countOjb.counts = 1;
            this.msgInboxAdminArray.push(countOjb);
            this.addMsg();
          }
        } else {
        }
      });
  }

  addToInbox(obj: MessageDto) {

    let countOjb = new notification();
    let newObj = new Messages();
    newObj.from = obj.user;
    newObj.message = obj.msgText;
    newObj.to = obj.to;
    newObj.date = new Date();
    newObj.status = true;
    let newlyObj = true;

    for (let element of this.msgInboxAdminArray) {
      if (element.from == obj.user || element.from == obj.to) {
        element.messages.push(newObj);
        newlyObj = false;
        this.isChecked = true;
        break;
      }
    }
    if (newlyObj) {
      countOjb.from = obj.user;
      countOjb.counts = 1;
      countOjb.messages.push(newObj);
      this.msgInboxAdminArray.push(countOjb);
      this.addMsg();
      this.isChecked = true;
    }
  }
  close(index: any) {
    this.msgInboxAdminArray.splice(index, 1);
  }
}
