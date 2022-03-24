import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.scss'],
})
export class ChatHistoryComponent implements OnInit {
  dataSource = new MatTableDataSource<any[]>();
  pageSize = 5;
  pageEvent: any;
  length: any;
  pageSizeOptions: number[] = [2, 5, 10, 25];
  DisplayedColumns = ['From', 'To', 'Date', 'Message'];

  constructor(private service: DataService, private toaster: ToastrService) {}

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  ngOnInit() {
    this.GetAllChatDEtails();
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  GetAllChatDEtails() {
    this.service.getChats().subscribe((data) => {

      if (data.isSuccess) {
        var list = data.listResult == null ? [] : data.listResult;
        // list.sort((a, b) => a.RegId - b.RegId);
        this.dataSource.data = data.listResult == null ? [] : data.listResult;
        console.log(JSON.stringify(data.listResult));
        console.log(this.dataSource);
        // console.log(this.DataSource);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.toaster.success('Getting History Detail Successfully..!', 'success');
      }
    },
      error => {
        this.toaster.error('UnAuthorize Person', 'Error');
        //error.error
      });
      }



  // ngOnInit(): void {
  //   this.chatService.retrieveMappedObject().subscribe( (receivedObj: MessageDto) => { this.addToInbox(receivedObj);});  // calls the service method to get the new messages sent

  // }

  // msgDto: MessageDto = new MessageDto();
  // msgInboxArray: MessageDto[] = [];

  // send(): void {
  //   if(this.msgDto) {
  //     if(this.msgDto.user.length == 0 || this.msgDto.user.length == 0){
  //       window.alert("Both fields are required.");
  //       return;
  //     } else {
  //       this.chatService.broadcastMessage(this.msgDto);                   // Send the message via a service
  //     }
  //   }
  // }

  // addToInbox(obj: Message) {
  //   let newObj = new Message();
  //   newObj.user = obj.user;
  //   newObj.msgText = obj.msgText;
  //   this.msgInboxArray.push(newObj);
}
