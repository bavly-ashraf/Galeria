import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/Services/database.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  users:any;
  albums:any;
  photos:any;
  searchUserArr:any;
  constructor(public myService:DatabaseService){}
  ngOnInit() {
    setTimeout(()=>{this.myService.getAllUsers().subscribe({next:(data)=>{this.users = data},error:(err)=>{alert(err);}});},5000)
    this.myService.getAllAlbums().subscribe({next:(data)=>{this.albums = data},error:(err)=>{alert(err);}});
    this.myService.getAllPhotos().subscribe({next:(data)=>{this.photos = data},error:(err)=>{alert(err);}});
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
}
