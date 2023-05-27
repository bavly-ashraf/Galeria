import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/Services/database.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})


export class RegistrationComponent {
  userEditData:any;
  constructor( private myService:DatabaseService, private router:Router ){
    this.userEditData = myService.getEditData();
    console.log(this.userEditData);
    this.myValidation.controls['name'].setValue(this.userEditData?.name);
    this.myValidation.controls['userName'].setValue(this.userEditData?.username);
    this.myValidation.controls['phone'].setValue(this.userEditData?.phone);
    this.myValidation.controls['email'].setValue(this.userEditData?.email);
    this.myValidation.controls['street'].setValue(this.userEditData?.address.street);
    this.myValidation.controls['suite'].setValue(this.userEditData?.address.suite);
    this.myValidation.controls['city'].setValue(this.userEditData?.address.city);
    this.myValidation.controls['password'].setValue(this.userEditData?.password);
  }
  getData(){
    return this.myService.getSharedData();
  }
  myValidation = new FormGroup({
    name: new FormControl("",[Validators.required,Validators.minLength(2),Validators.pattern(/^[A-Za-z\s]*$/)]),
    userName: new FormControl("",[Validators.required,Validators.minLength(2),Validators.pattern("^[A-Za-z]*$")]),
    phone: new FormControl("",[Validators.required,Validators.minLength(2),Validators.pattern("^[0-9]{1}[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$")]),
    email: new FormControl("",[Validators.required,Validators.minLength(2),Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")]),
    street: new FormControl("",[Validators.required,Validators.minLength(2),Validators.pattern(/^[A-Za-z\s]*$/)]),
    suite: new FormControl("",[Validators.required,Validators.minLength(2),Validators.pattern(/^[A-Za-z0-9\s]*$/)]),
    city: new FormControl("",[Validators.required,Validators.minLength(2),Validators.pattern(/^[A-Za-z\s]*$/)]),
    password: new FormControl("",[Validators.required,Validators.minLength(10),Validators.pattern("^[A-Za-z0-9]*$")]),
  })

  showErrorMessages = false;

  get phoneValid(){
    return this.myValidation.controls["phone"].valid;
  }

  get nameValid(){
    return this.myValidation.controls["name"].valid;
  }

  get userNameValid(){
    return this.myValidation.controls["userName"].valid;
  }

  get passwordValid(){
    return this.myValidation.controls["password"].valid;
  }

  get emailValid(){
    return this.myValidation.controls["email"].valid;
  }

  get streetValid(){
    return this.myValidation.controls["street"].valid;
  }
  get suiteValid(){
    return this.myValidation.controls["suite"].valid;
  }
  get cityValid(){
    return this.myValidation.controls["city"].valid;
  }

  Add(){
    if (this.myValidation.valid) {
      if(this.getData() == 'Edit'){
        this.myService.updateUser(this.userEditData.id,{
          name: this.myValidation.controls['name'].value,
          phone: this.myValidation.controls['phone'].value,
          username:this.myValidation.controls['userName'].value,
          email:this.myValidation.controls['email'].value,
          address:{
            street:this.myValidation.controls['street'].value,
            city:this.myValidation.controls['city'].value,
            suite:this.myValidation.controls['suite'].value
          },
          password:this.myValidation.controls['password'].value,
        }).subscribe({next:()=>{this.router.navigateByUrl('/admin')}});
      }
      else{
        this.myService.addUser({
        name: this.myValidation.controls['name'].value,
        phone: this.myValidation.controls['phone'].value,
        username:this.myValidation.controls['userName'].value,
        email:this.myValidation.controls['email'].value,
        address:{
          street:this.myValidation.controls['street'].value,
          city:this.myValidation.controls['city'].value,
          suite:this.myValidation.controls['suite'].value
        },
        password:this.myValidation.controls['password'].value,
      }).subscribe({next:()=>{this.router.navigateByUrl('/admin')}});
      }
      this.myValidation.reset();
      this.showErrorMessages = false;
    } else {
      this.showErrorMessages = true;
    }
  }




}
