import { AlertifyService } from './../../services/alertify.service';
import { HousingService } from './../../services/housing.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs/public_api';
import { IPropertyBase } from '../../model/IPropertyBase';
import { Property } from 'src/app/model/property';


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
  property = new Property();

  // Will come from masters
  propertyTypes: Array<string> = ['House', 'Apartment', 'Duplex']
  furnishTypes: Array<string> = ['Fully', 'Semi', 'Unfurnished']
  cityList: string[];

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


  constructor(
    private router: Router,
    private fb:FormBuilder,
    private HousingService:HousingService,
    private AlertifyService:AlertifyService) { }

  ngOnInit() {
    this.CreateAddPropertyForm();
    this.HousingService.getAllCities().subscribe(data=>{
      this.cityList = data;
      console.log(data);
    })
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

    if(this.allTabsValid()){

      this.mapProperty();
      this.HousingService.addProperty(this.property);
      this.AlertifyService.success('Congrats, your property listed successfully');
      console.log(this.addPropertyForm);
      console.log(this.SellRent.value);
        if(this.SellRent.value === "2"){
          this.router.navigate(['rent-property']);
        }else{
          this.router.navigate(['/']);
        }

    }else{
      this.AlertifyService.error('Please review the form and provide valid entries')
    }

  }

  mapProperty(): void {
    this.property.ID = this.HousingService.newPropID();
    this.property.SellRent = +this.SellRent.value;
    this.property.BHK = this.BHK.value;
    this.property.PType = this.PType.value;
    this.property.Name = this.Name.value;
    this.property.City = this.City.value;
    this.property.FType = this.FType.value;
    this.property.Price = this.Price.value;
    this.property.Security = this.Security.value;
    this.property.Maintenance = this.Maintenance.value;
    this.property.BuiltArea = this.BuiltArea.value;
    this.property.CarpetArea = this.CarpetArea.value;
    this.property.FloorNo = this.FloorNo.value;
    this.property.TotalFloor = this.TotalFloor.value;
    this.property.Address = this.Address.value;
    this.property.Address2 = this.LandMark.value;
    this.property.RTM = this.RTM.value;
    this.property.AOP = this.AOP.value;
    this.property.Gated = this.Gated.value;
    this.property.MainEntrance = this.MainEntrance.value;
    this.property.Possession = this.PossessionOn.value;
    this.property.Description = this.Description.value;
    this.property.PostedOn = new Date().toString();
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
