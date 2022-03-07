import { ActivatedRoute } from '@angular/router';
import { IProperty } from './../IProperty.interface';
import { HousingService } from './../../services/housing.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {


  properties: Array<IProperty>;
  SellRent: number = 1
  constructor(private route: ActivatedRoute,private HousingService:HousingService) { }

  ngOnInit(): void {
    if(this.route.snapshot.url.toString()){
      this.SellRent = 2;
    }
  this.HousingService.getAllProperties(this.SellRent).subscribe(
  data=>{
    this.properties = data;
    console.log(data);
  },error => {
    console.log(error);
  }
  );


  }

}
