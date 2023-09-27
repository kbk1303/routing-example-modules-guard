import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../admin/auth.guard';
import { CountryDetailComponent } from './country-detail/country-detail.component';
import { CountryMasterComponent } from './country-master/country-master.component';
import { CountryVisitedComponent } from './country-visited/country-visited.component';
import { CountryComponent } from './country.component';

const routes: Routes = [
  {path: 'country', component: CountryComponent, children: [
    {path: '', children: [
      {path: '', component: CountryMasterComponent},
      {path: ':name', outlet: 'detail', component: CountryDetailComponent},
      {path: 'messages', outlet: 'visited', component: CountryVisitedComponent},
      {path: 'admin', canActivate: [authGuard], outlet: 'privileged', loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule)}
    ]}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountryRoutingModule { }
