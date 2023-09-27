import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuxiliaryService } from 'src/app/services/auxiliary.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthService, private auxService: AuxiliaryService) {}

  login(): void {
    this.authService.login({userName: "", password: ""});
    this.auxService.updateAuxiliaryRoute("privileged", "login", false).subscribe((route: string) => {
      console.log("new path", route);
      
      this.auxService.getPrimaryPath().subscribe((prim: string | undefined) => {
        if(prim) {
          this.router.navigateByUrl(prim+'/'+route);
        }
      });
    });
  }

}
