import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { LabComponent } from './lab/lab.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from './shared/auth.service';
import { UserComponent } from './user/user.component';




@NgModule({
  declarations: [
    AppComponent,
    LabComponent,
    LoginComponent,
    AdminComponent,
    HomeComponent,
    SignupComponent,
    UserComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: 'signup',
        component : SignupComponent
      },
      {
        path: 'lab',
        component : LabComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'user',
        component: UserComponent
      },
      {
        path: 'admin',
        component: AdminComponent
      },
      {
        path: '',
        component: HomeComponent
      }
    ])  
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

