import { AuthService } from './services/auth.service';
import { AlertifyService } from './services/alertify.service';
import { UserService } from './services/user.service';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { AddPropertyComponent } from './Property/add-property/add-property.component';
import { HousingService } from './services/housing.service';
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { PropertyCardComponent } from './Property/property-card/property-card.component';
import { PropertyListComponent } from './Property/property-list/property-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { Routes,RouterModule } from '@angular/router';
import { PropertyDetailComponent } from './Property/property-detail/property-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


const appRoutes: Routes = [

  {path:'',component: PropertyListComponent},
  {path:'rent-property',component: PropertyListComponent},
  {path:'property-detail/:id',component: PropertyDetailComponent},
  {path:'add-property',component: AddPropertyComponent},
  {path:'user-login',component: UserLoginComponent},
  {path:'user-register',component: UserRegisterComponent},
  {path:'**',component: PropertyListComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    PropertyCardComponent,
    PropertyListComponent,
      NavBarComponent,
      AddPropertyComponent,
      PropertyDetailComponent,
      UserLoginComponent,
      UserRegisterComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot()
  ],
  providers: [HousingService,UserService,AlertifyService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
