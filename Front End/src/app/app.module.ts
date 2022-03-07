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

const appRoutes: Routes = [

  {path:'',component: PropertyListComponent},
  {path:'rent-property',component: PropertyListComponent},
  {path:'property-detail/:id',component: PropertyDetailComponent},
  {path:'add-property',component: AddPropertyComponent},
  {path:'**',component: PropertyListComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    PropertyCardComponent,
    PropertyListComponent,
      NavBarComponent,
      AddPropertyComponent,
      PropertyDetailComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [HousingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
