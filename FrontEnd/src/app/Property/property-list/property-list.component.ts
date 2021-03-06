import { IPropertyBase } from './../../model/IPropertyBase';
import { ActivatedRoute } from '@angular/router';
import { IProperty } from '../../model/IProperty';
import { HousingService } from './../../services/housing.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {


  properties: IPropertyBase[];
  SellRent: number = 1;
  City = '';
  SearchCity = '';
  SortbyParam = '';
  SortDirection = 'asc';

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

  onCityFilter(){
    this.SearchCity = this.City;
  }
  onCityFilterClear(){
    this.City = '';
    this.SearchCity = '';
  }
  onSortDirection(){
    if(this.SortDirection === 'desc'){
      this.SortDirection = 'asc';
    }else{
      this.SortDirection = 'desc';
    }
  }

}
