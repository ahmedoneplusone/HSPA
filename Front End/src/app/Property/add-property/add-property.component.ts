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

  addPropertyForm :FormGroup;
  nextClicked = [false,false,false,false,true];
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
    City: '',
    RTM: null
};


  constructor(private router: Router,private fb:FormBuilder) { }

  ngOnInit() {
    this.CreateAddPropertyForm();
  }

  CreateAddPropertyForm(){
    this.addPropertyForm = this.fb.group({
      BasicInfo: this.fb.group({
          SellRent: [null , Validators.required],
          BHK: [null, Validators.required],
          PType: [null, Validators.required],
          FType: [null, Validators.required],
          Name: [null, [Validators.required ,Validators.minLength(5), Validators.maxLength(100)]],
          City: [null, [Validators.required ,Validators.minLength(3), Validators.maxLength(25)]]
      }),

      PriceInfo: this.fb.group({
          Price: [null, [Validators.required,Validators.max(10000000),Validators.min(1000)]],
          BuiltArea: [null, [Validators.required ,Validators.max(1000000),Validators.min(100)]],
          CarpetArea: [null],
          Security: [0],
          Maintenance: [0],
      }),

      AddressInfo: this.fb.group({
          FloorNo: [null,[Validators.required,Validators.max(200),Validators.min(0)]],
          TotalFloor: [null],
          Address: [null, [Validators.required,Validators.minLength(10),Validators.maxLength(300)]],
          LandMark: [null],
      }),

      OtherInfo: this.fb.group({
          RTM: [null, Validators.required],
          PossessionOn: [null, Validators.required],
          AOP: [null],
          Gated: [null],
          MainEntrance: [null],
          Description: [null]
      })
  });
}

    // #region <Getter Methods>
    // #region <FormGroups>
  get BasicInfo() {
      return this.addPropertyForm.controls['BasicInfo'] as FormGroup;
  }

  get PriceInfo() {
      return this.addPropertyForm.controls['PriceInfo'] as FormGroup;
  }

  get AddressInfo() {
      return this.addPropertyForm.controls['AddressInfo'] as FormGroup;
  }

  get OtherInfo() {
      return this.addPropertyForm.controls['OtherInfo'] as FormGroup;
  }
  // #endregion

  // #region <Form Controls>
  get SellRent() {
      return this.BasicInfo.controls['SellRent'] as FormControl;
  }

  get BHK() {
      return this.BasicInfo.controls['BHK'] as FormControl;
  }

  get PType() {
      return this.BasicInfo.controls['PType'] as FormControl;
  }

  get FType() {
      return this.BasicInfo.controls['FType'] as FormControl;
  }

  get Name() {
      return this.BasicInfo.controls['Name'] as FormControl;
  }

  get City() {
      return this.BasicInfo.controls['City'] as FormControl;
  }

  get Price() {
      return this.PriceInfo.controls['Price'] as FormControl;
  }

  get BuiltArea() {
      return this.PriceInfo.controls['BuiltArea'] as FormControl;
  }

  get CarpetArea() {
      return this.PriceInfo.controls['CarpetArea'] as FormControl;
  }

  get Security() {
      return this.PriceInfo.controls['Security'] as FormControl;
  }

  get Maintenance() {
      return this.PriceInfo.controls['Maintenance'] as FormControl;
  }

  get FloorNo() {
      return this.AddressInfo.controls['FloorNo'] as FormControl;
  }

  get TotalFloor() {
      return this.AddressInfo.controls['TotalFloor'] as FormControl;
  }

  get Address() {
      return this.AddressInfo.controls['Address'] as FormControl;
  }

  get LandMark() {
      return this.AddressInfo.controls['LandMark'] as FormControl;
  }

  get RTM() {
      return this.OtherInfo.controls['RTM'] as FormControl;
  }

  get PossessionOn() {
      return this.OtherInfo.controls['PossessionOn'] as FormControl;
  }

  get AOP() {
      return this.OtherInfo.controls['AOP'] as FormControl;
  }

  get Gated() {
      return this.OtherInfo.controls['Gated'] as FormControl;
  }

  get MainEntrance() {
      return this.OtherInfo.controls['MainEntrance'] as FormControl;
  }

  get Description() {
      return this.OtherInfo.controls['Description'] as FormControl;
  }

  // #endregion
  // #endregion


  onCancel(){
    window.location.reload()

  }
  onSubmit() {
    let checker =  this.nextClicked.every(v => v === true);
    if(this.allTabsValid() && checker){
    console.log('Congrats, form Submitted');
    console.log(this.addPropertyForm);
    }else{
      console.log('Please review the form and provide valid entries')
    }
  }

  allTabsValid(): boolean{
    if(this.BasicInfo.invalid){
      this.formTabs.tabs[0].active = true;
      this.nextClicked[0]=true
      return false;
    }
    if(this.PriceInfo.invalid){
      this.formTabs.tabs[1].active = true;
      this.nextClicked[1]=true
      return false;
    }
    if(this.AddressInfo.invalid){
      this.formTabs.tabs[2].active = true;
      this.nextClicked[2]=true
      return false;
    }
    if(this.OtherInfo.invalid){
      this.formTabs.tabs[3].active = true;
      this.nextClicked[3]=true
      return false;
    }
    return true;
  }

  selectTab(tabId: number, IsCurrentTabValid: boolean) {
    console.log(IsCurrentTabValid)
    console.log(this.addPropertyForm)
    this.nextClicked [tabId-1] = true;
    console.log(this.nextClicked)
    if(IsCurrentTabValid){
    this.formTabs.tabs[tabId].active = true;
    }
  }

}
