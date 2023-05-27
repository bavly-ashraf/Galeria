import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/app/Services/database.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  allAlbums:any;
  userAlbums:any;
  user:any
  constructor(private myService:DatabaseService, private myRoute:ActivatedRoute, private router:Router){ console.log(myRoute.snapshot.params["id"]);}
  ngOnInit(){
    setTimeout(()=>{this.myService.getAllAlbums().subscribe({next:(data)=>
      {
        this.allAlbums = data;
        this.userAlbums = this.allAlbums.filter((el:any)=>{ return el.userId == this.myRoute.snapshot.params["id"]});
      },error:(err)=>{alert(err);}});},5000)
     this.myService.getUserByID(this.myRoute.snapshot.params["id"]).subscribe({next:(data)=>{this.user = data},error:(err)=>{alert(err);}});
  }
  navigateToPhotos(x:any){
    this.router.navigateByUrl('/album/'+x);
  }
}
