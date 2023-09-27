import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuxiliaryService {

  private AUXILIARY_ROUTES_FROM_URL_REGEX = /\(([^)]+)\)/;
  private auxiliaryRoutesResult: RegExpExecArray | null | undefined;  //= this.AUXILIARY_ROUTES_FROM_URL_REGEX .exec(this.router.url);
  auxiliaryRoute$: Observable<string> | undefined;
  currentOutlets: Array<string> | undefined;

  constructor(private route: ActivatedRoute, private router: Router) { 
    this.currentAuxiliaryRoutes(this.router.url);
    
  }

  private currentAuxiliaryRoutes(routerUrl: string): void {
    this.auxiliaryRoutesResult = this.AUXILIARY_ROUTES_FROM_URL_REGEX.exec(routerUrl);
    this.currentOutlets = [];
    this.auxiliaryRoutesResult?.forEach((outlets) => {
      if(!outlets.includes('(')) {
        this.currentOutlets = outlets.split("//");

      }
    });
    console.log("current auxiliary outlets: ", this.currentOutlets);
  }

  getPrimaryPath(): Observable<string | undefined> {
    return of(this.auxiliaryRoutesResult?.input.substring(0, this.auxiliaryRoutesResult?.input.indexOf('(') -1))
  }

  getAuxiliaryPath(auxiliaryName: string): Observable<string> {
    this.currentAuxiliaryRoutes(this.router.url);
    let path = '';
    this.currentOutlets?.forEach((currentOutlet) => {
      if(currentOutlet.includes(auxiliaryName)) {
        path = currentOutlet.split(":")[1];
      }
    });
    return of(path);
  }

  removeOutlet(outletName: string): Observable<string> {
    this.currentAuxiliaryRoutes(this.router.url);
    let outletsString = "(";
    let updatedOutlet = "";
    this.currentOutlets?.forEach((currentOutlet) => {
      if(!currentOutlet.includes(outletName)) {
        outletsString += currentOutlet + "//";
      }
    });
    outletsString += ")";
    let lastIndex = outletsString.lastIndexOf("//");
    let length = outletsString.length;
    
    if(lastIndex > 0 && length > 0 ) {
      outletsString = outletsString.substring(0, lastIndex) + ")";
      console.log("outletString", outletsString, "lastIndex", lastIndex, "length", length)
    }
    
    return of(outletsString);
  }

  
  updateAuxiliaryRoute(outlet: string, aRoute: string, addRoute: boolean): Observable<string> {
    this.currentAuxiliaryRoutes(this.router.url);
    let outletsString = "(";
    let updatedOutlet = "";
    let MAX_SEPARATOR: number = this.currentOutlets!.length > 0 ? this.currentOutlets!.length-1:-1;
    let currentSep = 0;
    this.currentOutlets?.forEach((currentOutlet) => {
      if(currentOutlet.includes(outlet)) {
        updatedOutlet = addRoute? currentOutlet+'/'+aRoute: currentOutlet.split('/'+aRoute).join("");
        outletsString += updatedOutlet;
        if(MAX_SEPARATOR != -1) {
          if(currentSep < MAX_SEPARATOR) {
            outletsString += "//";
            currentSep++;
          }
          else {
            outletsString += ")"
            currentSep++;
          }
        }
      }
      else {
        outletsString += currentOutlet;
        if(currentSep < MAX_SEPARATOR) {
          outletsString += "//";
          currentSep++;
        }
        else {
          outletsString += ")"
          currentSep++;
        }
      }
      
    });
    return of(outletsString);
  }
   
}
