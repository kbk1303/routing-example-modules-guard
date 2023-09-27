import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Country } from '../interfaces/country';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  url: string = "http://localhost:3000";
  endpointAllCountries: string = "countries";

  constructor(private httpClient: HttpClient, private messageService: MessageService) { }

  getAllCountries(init: boolean): Observable<Country[]> {
    const c$ = this.httpClient.get<Country[]>(this.url+'/'+this.endpointAllCountries);
    if(c$ && init) {
      this.messageService.addMessage("Fetched all countries");
    } 
    return c$;
  }

  getCountry(name: string): Observable<Country> {
    const c$ = this.getAllCountries(false).pipe(map((countries: Country[]) => 
      countries.find(country => country.name === name)!)
    );
    if(c$) {
      this.messageService.addMessage("Fetched county: "+name);
    }
    return c$;
  }
}
