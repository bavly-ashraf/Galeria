import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/Services/database.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  allPhotos:any;
  albumPhotos:any;
  constructor(private myService:DatabaseService ,private myRoute:ActivatedRoute ){}
  ngOnInit(){
    setTimeout(()=>{this.myService.getAllPhotos().subscribe({next:(data)=>{
      this.allPhotos = data;
      this.albumPhotos = this.allPhotos.filter((el:any)=>{return el.albumId == this.myRoute.snapshot.params['id']});
    },error:(err)=>{alert(err);}});},5000)

  }

}
