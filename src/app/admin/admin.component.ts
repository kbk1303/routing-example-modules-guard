import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Country } from '../interfaces/country';
import { AuxiliaryService } from '../services/auxiliary.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})


export class AdminComponent implements OnInit {

  private readonly adminOutLetName: string = "privileged";
  
  countryname$: Observable<Country> | undefined;
 
  rootPath: string | undefined;
  auxString: string | undefined;
  routeAuthenticated = false;

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, private auxService: AuxiliaryService) {
    this.auxService.getPrimaryPath().subscribe((path: string| undefined) => {
      next: {this.rootPath = path;}
    });

  }

  login(): void {
    this.navigateToRoute('login');

  }

  editCountry(): void {
    this.auxService.getAuxiliaryPath("detail").subscribe((path: string) => {
      if(path) {
        console.log("path from detail: ", path)
        this.navigateToRoute(path);
      }
    });

  }
  
  navigateToRoute(route: string): void {
    this.auxService.getAuxiliaryPath(route).subscribe((path: string) => {
      next: {
        if(path == '') {
          //not a country from the detail outlet, navigate is ok
          this.auxService.updateAuxiliaryRoute(this.adminOutLetName, route, true).subscribe((auxString: string) => {
            this.auxString = auxString;
          });
          this.router.navigateByUrl(this.rootPath+"/"+this.auxString);
        }
        else {
          //is the route activated?
          this.authService.activedRoute$.subscribe((activated: boolean) => {
            if(activated) {
              //ok, user is authenticated, update the outlet with privileged information
              this.auxService.updateAuxiliaryRoute(this.adminOutLetName, route, true).subscribe((auxString: string) => {
                this.auxString = auxString;
              });  
              this.router.navigateByUrl(this.rootPath+"/"+this.auxString);
            }
            else {
              //route not activated - user is logged out
              this.auxService.updateAuxiliaryRoute(this.adminOutLetName, "login", true).subscribe((auxString: string) => {
                this.auxString = auxString;
              });  
              this.router.navigateByUrl(this.rootPath+"/"+this.auxString);
            }
          });
          //We will end here if the activatedRoute observable doesn't have a value, so just route to login
          this.auxService.updateAuxiliaryRoute(this.adminOutLetName, "login", true).subscribe((auxString: string) => {
            this.auxString = auxString;
          });  
          this.router.navigateByUrl(this.rootPath+"/"+this.auxString);
        }
      }
    });

    
  } 

  public ngOnInit(): void {
   

}

}
