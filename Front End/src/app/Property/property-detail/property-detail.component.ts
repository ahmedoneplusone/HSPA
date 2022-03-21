import { Property } from './../../model/property';
 import { HousingService } from './../../services/housing.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {

  public propertyid: number;
  property = new Property();
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private HousingService:HousingService) { }

  ngOnInit() {
    this.propertyid = Number(this.route.snapshot.params['id']);
    this.route.params.subscribe(
      (params) => {
        this.propertyid = Number(params['id']);
        this.HousingService.getProperty(this.propertyid).subscribe(
          (data:any) =>{
            this.property = data;
          }
        );
      }
    )
  }

  numberWithCommas(PropPrice: any) {
    if(PropPrice){
    return PropPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    }


}
