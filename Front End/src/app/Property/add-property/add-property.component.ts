import { IProperty } from './../../model/IProperty.interface';
import { AlertifyService } from './../../services/alertify.service';
import { HousingService } from './../../services/housing.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  addPropForm:FormGroup;
  prop: IProperty;
  constructor(private router:Router,private HousingService:HousingService,private AlertifyService:AlertifyService) { }

  ngOnInit() {
    this.addPropForm = new FormGroup({
      propName: new FormControl(null,[Validators.required,Validators.minLength(5),Validators.maxLength(50)]),
      propType: new FormControl(null,[Validators.required,Validators.minLength(5),Validators.maxLength(50)]),
      propPrice: new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(10)])
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


  OnSubmit(){
    console.log(this.addPropForm);
    this.addPropForm.markAllAsTouched();

  }


}
