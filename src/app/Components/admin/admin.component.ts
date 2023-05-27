import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/Services/database.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users:any;
  albums:any;
  photos:any;
  searchUserArr:any;

  constructor(public myService:DatabaseService,private router:Router){}
  ngOnInit() {
    setTimeout(()=>{this.myService.getAllUsers().subscribe({next:(data)=>{this.users = data},error:(err)=>{alert(err);}});},5000)
    this.myService.getAllAlbums().subscribe({next:(data)=>{this.albums = data},error:(err)=>{alert(err);}});
    this.myService.getAllPhotos().subscribe({next:(data)=>{this.photos = data},error:(err)=>{alert(err);}});
  }
deleteBtn(id:number){
  this.myService.deleteUser(id).subscribe({next:()=>{this.myService.getAllUsers().subscribe({next:(data)=>{this.users = data},error:(err)=>{alert(err);}});}});
}
editBtn(data:any){
this.myService.setEditData(data);
this.myService.setSharedData('Edit');
this.router.navigateByUrl('/signup');
}
userSearch(x:any){
  if(x.target.value.length !== 0){
    this.searchUserArr = this.users.filter((el:any)=>{
      return el.name.toLowerCase().includes(x.target.value)});
  }
  else{
    this.myService.getAllUsers().subscribe({next:(data)=>{this.users = data},error:(err)=>{alert(err);}});
  }
}
fireNow(){
  this.myService.setEditData(undefined);
  this.myService.setSharedData('Add');
}
}
