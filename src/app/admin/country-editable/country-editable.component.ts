import { Component } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Country } from 'src/app/interfaces/country';
import { AuxiliaryService } from 'src/app/services/auxiliary.service';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-country-editable',
  templateUrl: './country-editable.component.html',
  styleUrls: ['./country-editable.component.css']
})
export class CountryEditableComponent {
  country$: Observable<Country> | undefined;

  constructor(private route: ActivatedRoute,
    private router: Router, private apiService: RestApiService, private auxService: AuxiliaryService) {}
  ngOnInit(): void {
    this.country$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.apiService.getCountry(params.get('name')!))
    );
    
  }

  close(): void {
    this.auxService.removeOutlet("privileged").subscribe((path: string) => {
      this.auxService.getPrimaryPath().subscribe((rootPath: string | undefined) => {
         this.router.navigateByUrl(rootPath+'/'+path); 
      });
    });
  }

}
