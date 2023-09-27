import { Component } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-country-visited',
  templateUrl: './country-visited.component.html',
  styleUrls: ['./country-visited.component.css']
})
export class CountryVisitedComponent {
  constructor(public messageService: MessageService) {}
}
