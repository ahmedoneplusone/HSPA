import { Property } from './../model/property';
import { IProperty } from '../model/IProperty';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http:HttpClient) { }

  getAllCities(): Observable<string[]>{
    return this.http.get<string[]>('http://localhost:5048/api/city');
  }

  getProperty(id:number){
    return this.getAllProperties().pipe(
      map(propertyArray=>{
        // throw new Error('Some Error');
        return propertyArray.find(p=>p.ID === id);
      })
    );

  }

  getAllProperties(SellRent?:number): Observable<Property[]>{
    return this.http.get('data/properties.json').pipe(
      map(data=>{
        const propertiesArray: Array<Property> = [];
        const localProps = JSON.parse(localStorage.getItem('newProp'));
        if(localProps){
          for(const id in localProps){
            if(SellRent){
            if(localProps.hasOwnProperty(id) && localProps[id].SellRent === SellRent){
            propertiesArray.push(localProps[id]);
                      }
                    }else{
                      propertiesArray.push(localProps[id])
                    }
          }
        }
        for(const id in data){
          if(SellRent){
          if(data.hasOwnProperty(id) && data[id].SellRent === SellRent){
          propertiesArray.push(data[id]);
        }}else{
          propertiesArray.push(data[id]);
        }
        }
        return propertiesArray;
      })
      );
  }

  addProperty(property:Property){
    let newProp = [property];
    if(localStorage.getItem('newProp')){
      newProp = [property,... JSON.parse(localStorage.getItem('newProp'))];
    }
    localStorage.setItem('newProp',JSON.stringify(newProp));
}

newPropID(){
  if(localStorage.getItem('PID')){
    return Number(localStorage.getItem('PID'))+1 ;
  } else{
    localStorage.setItem('PID','101');
    return 101;
  }
}

}
