import { IProperty } from '../model/IProperty';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http:HttpClient) { }

  getAllProperties(SellRent:number): Observable<IProperty[]>{
    return this.http.get('data/properties.json').pipe(
      map(data=>{
        const propertiesArray: Array<IProperty> = [];
        for(const id in data){
          if(data.hasOwnProperty(id) && data[id].SellRent === SellRent){
          propertiesArray.push(data[id]);
        }
        }
        return propertiesArray;
      })
      );
  }

  addProperty(property:IProperty){
    let properties = [];
  if(localStorage.getItem('Properties')){
    properties = JSON.parse(localStorage.getItem('Properties'));
    properties = [property, ...properties];
    console.log(properties);
  }else{
    properties = [property];
  }
  localStorage.setItem('Users',JSON.stringify(properties));
}

}
