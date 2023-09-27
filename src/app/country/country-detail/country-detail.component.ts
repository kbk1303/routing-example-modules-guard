import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap, NavigationExtras } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Country } from 'src/app/interfaces/country';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css']
})
export class CountryDetailComponent implements OnInit {
  country$: Observable<Country> | undefined;

  constructor(private route: ActivatedRoute,
    private router: Router, private apiService: RestApiService) {}
  ngOnInit(): void {
    this.country$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.apiService.getCountry(params.get('name')!))
    );
    
  }

  navigate(name: string): void {
    const navigationExtras: NavigationExtras = {
      fragment: name
    };
    this.router.navigate(['../country', { outlets: {privileged: ['admin']}}], navigationExtras);
  }
}
