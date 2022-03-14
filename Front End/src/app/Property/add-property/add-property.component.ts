 import { IProperty } from '../../model/IProperty'
import { AlertifyService } from './../../services/alertify.service';
import { HousingService } from './../../services/housing.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup ,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  @ViewChild('formTabs') formTabs:TabsetComponent;
  addPropForm:FormGroup;

  propertyTypes: Array<string> = ['House','Apartment','Villa','Duplex']
  furnishTypes: Array<string> = ['Fully','Semi','Unfurnished']

  propertyView:IProperty ={
    ID:null,
    Name:'',
    Price:null,
    SellRent:null,
    FType:null,
    PType:null,
    BHK:null,
    City:null,
    BuiltArea:null,
    RTM:null,
    Description:null
  };

  constructor(private router:Router,private HousingService:HousingService,private AlertifyService:AlertifyService) { }

  ngOnInit() {
    this.addPropForm = new FormGroup({
      propName: new FormControl(null,[Validators.required,Validators.minLength(5),Validators.maxLength(50)]),
      propPType: new FormControl(null,[Validators.required,Validators.minLength(5),Validators.maxLength(50)]),
      propPrice: new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
      propBHK: new FormControl(null,[Validators.required]),
      propFType: new FormControl(null,[Validators.required]),
      propCity: new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(25)]),
      propBuiltArea: new FormControl(null,[Validators.required,Validators.minLength(2),Validators.maxLength(25)]),
      propSellRent: new FormControl(null,[Validators.required])

    })

  }

  get GetPropName(){
    return this.addPropForm.get('propName') as FormControl
  }
  get GetPropType(){
    return this.addPropForm.get('propType') as FormControl
  }
  get GetPropPrice(){
    return this.addPropForm.get('propPrice') as FormControl
  }
  get GetCity(){
    return this.addPropForm.get('propCity') as FormControl
  }


  OnSubmit(){
    console.log(this.addPropForm);
    this.addPropForm.markAllAsTouched();

  }

  selectTab(tabId: number) {
    if (this.formTabs?.tabs[tabId]) {
      this.formTabs.tabs[tabId].active = true;
    }
  }

}
