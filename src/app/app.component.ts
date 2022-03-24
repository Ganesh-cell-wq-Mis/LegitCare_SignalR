import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { MessageDto, Messages } from 'src/app/Dto/MessageDto';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
  }
  get logincheck() {
    let obj = sessionStorage.getItem("UserInformation");
    if (obj == '' || obj == undefined) {
      return false;
    }
    else {
      return true;
    }
  }

}


