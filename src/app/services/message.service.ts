import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messages: Array<string> = [];
  private msgSub$ : BehaviorSubject<string[]> = new BehaviorSubject<string[]>(this.messages);
  messages$ = this.msgSub$.asObservable();
  
  constructor(private router: Router, private route: ActivatedRoute) { }

  clearMessages(): void {
    this.messages.splice(0);
    this.router.navigate(['../country',{ outlets: { visited: null}}]);
  }

  addMessage(msg: string): void {
    this.messages.push(msg);
    this.router.navigate(['../country', { outlets: {visited: ['messages']}}]);
  }

}