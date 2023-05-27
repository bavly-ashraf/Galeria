import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegistrationComponent } from './Components/registration/registration.component';
import { AdminComponent } from './Components/admin/admin.component';
import { AlbumsComponent } from './Components/albums/albums.component';
import { PhotosComponent } from './Components/photos/photos.component';
import { ErrorComponent } from './Components/error/error.component';
import { UserComponent } from './Components/user/user.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'signup',component:RegistrationComponent},
  {path:'admin',component:AdminComponent},
  {path:'user',component:UserComponent},
  {path:'user/:id',component:AlbumsComponent},
  {path:'album/:id',component:PhotosComponent},
  {path:'**',component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
