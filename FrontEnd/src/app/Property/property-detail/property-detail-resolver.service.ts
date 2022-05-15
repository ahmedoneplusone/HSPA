import { HousingService } from './../../services/housing.service';
import { Property } from 'src/app/model/property';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyDetailResolverService implements Resolve<Property> {

constructor(private router:Router,private HousingService:HousingService) { }

resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Property | Observable<Property> | Promise<Property> {
  const propID = route.params['id'];
  return this.HousingService.getProperty(+propID).pipe(
    catchError(error=>{
      this.router.navigate(['/']);
      return of(null);
    })
  );
}
}
