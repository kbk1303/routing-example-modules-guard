import { Injectable } from '@angular/core';
import {BehaviorSubject, delay, Observable, of, Subject, tap } from 'rxjs';
import { AuthData } from '../interfaces/auth-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private routeActivatedSub$: Subject<boolean> = new Subject<boolean>();
  activedRoute$ = this.routeActivatedSub$.asObservable();
  private loggedIn = false;
  constructor() { 
      this.routeActivatedSub$.next(this.loggedIn);

  }

  logout(): void {
    this.routeActivatedSub$.next(false);
  }

  login(authData: AuthData): void {
    this.verifyAuthentication(authData).subscribe((ok: boolean) => {
      if(ok) {
        this.routeActivatedSub$.next(true);
      }
    });
  }

  private verifyAuthentication(authData: AuthData): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap(() => this.loggedIn = true)
    );
  }

}
