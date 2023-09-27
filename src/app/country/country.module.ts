import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CountryRoutingModule } from './country-routing.module';
import { CountryMasterComponent } from './country-master/country-master.component';
import { CountryDetailComponent } from './country-detail/country-detail.component';
import { CountryVisitedComponent } from './country-visited/country-visited.component';
import { CountryComponent } from './country.component';
import { AdminModule } from '../admin/admin.module';


@NgModule({
  declarations: [
    CountryMasterComponent,
    CountryDetailComponent,
    CountryVisitedComponent,
    CountryComponent
  ],
  imports: [
    CommonModule,
    CountryRoutingModule,
    HttpClientModule,
    AdminModule,
  ]
})
export class CountryModule { }
