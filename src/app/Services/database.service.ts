import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private sharedData: any;
  private shareEditData:any;

  private Base_URL = "http://localhost:3000"
  constructor(private myClient:HttpClient) { }

  getAllUsers(){
    return this.myClient.get(this.Base_URL+'/users');
  }
  getUserByID(id:number){
    return this.myClient.get(this.Base_URL+'/users/'+id);
  }
  addUser(newUser:any){
    return this.myClient.post(this.Base_URL+'/users',newUser);
  }
  updateUser(id:number,newUser:any){
    return this.myClient.put(this.Base_URL+'/users/'+id,newUser);
  }
  deleteUser(id:number){
    return this.myClient.delete(this.Base_URL+'/users/'+id);
  }
  getAdmin(){
    return this.myClient.get(this.Base_URL+'/admins');
  }
  getAllAlbums(){
    return this.myClient.get(this.Base_URL+'/albums');
  }
  getAlbumByID(id:any){
    return this.myClient.get(this.Base_URL+'/albums/'+id);
  }
  getAllPhotos(){
    return this.myClient.get(this.Base_URL+'/photos');
  }


  setSharedData(data: any) {
    this.sharedData = data;
  }

  getSharedData() {
    return this.sharedData;
  }

  setEditData(data: any) {
    this.shareEditData = data;
  }

  getEditData() {
    return this.shareEditData;
  }
}
