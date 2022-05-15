import { IPropertyBase } from './../../model/IPropertyBase';
import { Component, Input } from "@angular/core";

@Component({
  selector:'app-property-card',
  templateUrl:'property-card.component.html',
  styleUrls: ['property-card.component.css']
})



export class PropertyCardComponent{
  @Input() property:IPropertyBase
  @Input() hideIcons:boolean

  numberWithCommas(PropPrice: any) {
    if(PropPrice){
    return PropPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    }
  }


