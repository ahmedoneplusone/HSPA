import { Property } from './../../model/property';
 import { HousingService } from './../../services/housing.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {

  public propertyid: number;
  property = new Property();
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private HousingService:HousingService) { }

  ngOnInit() {this.galleryOptions = [
    {
      width: '100%',
      height: '500px',
      thumbnailsColumns: 4,
      imageAnimation: NgxGalleryAnimation.Slide
    },
  ];

  this.galleryImages = [
    {
      small: '../assets/Images/Prop-1.jfif',
      medium: '../assets/Images/Prop-1.jfif',
      big: '../assets/Images/Prop-1.jfif'
    },
    {
      small: '../assets/Images/Prop-2.jfif',
      medium: '../assets/Images/Prop-2.jfif',
      big: '../assets/Images/Prop-2.jfif'
    },
    {
      small: '../assets/Images/Prop-3.jfif',
      medium: '../assets/Images/Prop-3.jfif',
      big: '../assets/Images/Prop-3.jfif'
    },{
      small: '../assets/Images/Prop-4.jfif',
      medium:  '../assets/Images/Prop-4.jfif',
      big:  '../assets/Images/Prop-4.jfif'
    },
    {
      small: '../assets/Images/Prop-5.jfif',
      medium: '../assets/Images/Prop-5.jfif',
      big: '../assets/Images/Prop-5.jfif'
    }
  ];
    this.propertyid = Number(this.route.snapshot.params['id']);
    this.route.data.subscribe(
      (data:Property)=>{
        this.property = data['prp']
      }
     )
    // this.route.params.subscribe(
    //   (params) => {
    //     this.propertyid = Number(params['id']);
    //     this.HousingService.getProperty(this.propertyid).subscribe(
    //       (data:any) =>{
    //         this.property = data;
    //       },error=> this.router.navigate(['/'])
    //     );
    //   }
    // )
  }

  numberWithCommas(PropPrice: any) {
    if(PropPrice){
    return PropPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    }


}
