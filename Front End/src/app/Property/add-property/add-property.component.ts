import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs/public_api';
import { IPropertyBase } from '../../model/IPropertyBase';


@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
 // @ViewChild('Form') addPropertyForm: NgForm;
  @ViewChild('formTabs') formTabs: TabsetComponent;

  addPropertyForm :FormGroup
  // Will come from masters
  propertyTypes: Array<string> = ['House', 'Apartment', 'Duplex']
  furnishTypes: Array<string> = ['Fully', 'Semi', 'Unfurnished']

  propertyView: IPropertyBase = {
    ID: null,
    Name: '',
    Price: null,
    SellRent: null,
    PType: null,
    FType: null,
    BHK: null,
    BuiltArea: null,
    City: null,
    RTM: null
  };


  constructor(private router: Router,private fb:FormBuilder) { }

  ngOnInit() {
    this.CreateAddPropertyForm();
  }

  CreateAddPropertyForm(){
    this.addPropertyForm = this.fb.group({
      BasicInfo:this.fb.group({
        SellRent: [null,Validators.required],
        PType: [null,Validators.required],
        Name: [null,Validators.required]
      }),
      PriceInfo: this.fb.group({
        Price: [null,Validators.required],
        BuiltArea: [null,Validators.required]
      })

    });
  }

  get BasicInfo(){
    return this.addPropertyForm.controls[this.BasicInfo] as FormGroup;
  }

  onBack() {
     this.router.navigate(['/']);
  }

  onSubmit() {
    console.log('Congrats, form Submitted');
    console.log('SellRent=' + this.addPropertyForm.value.BasicInfo.SellRent);
    console.log(this.addPropertyForm);
  }


  selectTab(tabId: number) {
    this.formTabs.tabs[tabId].active = true;
    console.log(this.BasicInfo)
  }

}
