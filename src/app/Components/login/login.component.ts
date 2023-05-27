
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DatabaseService } from 'src/app/Services/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Admins:any;
  Users:any;
  selectedOption: any;
  filteredArr:any;
  constructor( public myService:DatabaseService , public myRoute:Router , private cookie:CookieService ){
    if(cookie.get('email') && cookie.get('role') == 'admin'){
      myRoute.navigateByUrl('/admin');
    }
    else if(cookie.get('email') && cookie.get('role') == 'user'){
      myRoute.navigateByUrl('/user');
    }

  }
  ngOnInit() {
    this.myService.getAdmin().subscribe({next:(data)=>{this.Admins = data; console.log(data);},error:(e)=>{alert(e);}});
    this.myService.getAllUsers().subscribe({next:(data)=>{this.Users = data; console.log(data);},error:(e)=>{alert(e);}})
  }
  myValidation = new FormGroup({
    email: new FormControl("",[Validators.required,Validators.minLength(2),Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")]),
    password: new FormControl("",[Validators.required,Validators.minLength(10),Validators.pattern("^[A-Za-z0-9]*$")]),
  })

  showErrorMessages = false;

  get passwordValid(){
    return this.myValidation.controls["password"].valid;
  }

  get emailValid(){
    return this.myValidation.controls["email"].valid;
  }
  get adminCheck(){
    return this.selectedOption == "admin";
  }
  Add(){
    if (this.myValidation.valid) {
      if(this.selectedOption == "admin"){
       this.filteredArr = this.Admins.filter((el:any)=>{ return el.email == this.myValidation.controls["email"].value && el.password == this.myValidation.controls["password"].value});
       if(this.filteredArr.length == 0){
        alert('email or pass is incorrect');
       }
       else{
        this.myRoute.navigateByUrl('/admin');
        this.cookie.set("role","admin");
        this.cookie.set("email",this.filteredArr[0].email);
       }

       console.log(this.filteredArr);

      }
      else if(this.selectedOption == "user"){
        this.filteredArr = this.Users.filter((el:any)=>{ return el.email == this.myValidation.controls["email"].value && el.password == this.myValidation.controls["password"].value});
        if(this.filteredArr.length == 0){
         alert('email or pass is incorrect');
        }
        else{
         this.myRoute.navigateByUrl('/user');
         this.cookie.set("role","user");
         this.cookie.set("email",this.filteredArr[0].email);
        }

        console.log(this.filteredArr);
      }
      else{
        alert("you must select your role");

      }
      this.myValidation.reset();
      this.showErrorMessages = false;
    } else {
      this.showErrorMessages = true;
    }
  }

}
