
export class MessageDto {
  public user: string = '';
  public msgText: string = '';
  public to:string='';
}
export class Messages{
  public mId:Number=0;
  public from:string='';
  public to:string='';
  public date:Date=new Date;
  public message:string='';
  public status:boolean=true;
}
export class notification{
  public from:string='';
  public counts:Number=0;
  public messages:Messages[]=[];
}
