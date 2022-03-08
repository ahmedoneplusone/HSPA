import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  @ViewChild('Form') addPropForm: NgForm;
  constructor(private router:Router) { }

  ngOnInit() {
  }

  OnBack(){
    this.router.navigate(['/'])
  }

  OnSubmit(){
    console.log(this.addPropForm);

  }

}
