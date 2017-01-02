import { Component } from '@angular/core';
import {TicketService} from '../../services/ticket.service';

@Component({
  moduleId: module.id,
  selector: 'my-homepage',
  templateUrl: 'homepage.component.html',
  providers: [TicketService]
})
export class HomepageComponent{

}
