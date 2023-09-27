import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { Country } from 'src/app/interfaces/country';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-country-master',
  templateUrl: './country-master.component.html',
  styleUrls: ['./country-master.component.css']
})
export class CountryMasterComponent {
  countriesSubject$ = new Subject<Country[]>();

  constructor(private apiService: RestApiService) {
    this.apiService.getAllCountries(true).subscribe((countries: Country[]) => {
      next: {
        this.countriesSubject$.next(countries);
      }
    });
  }
}