import { Component } from '@angular/core';
import {TicketService} from '../../services/ticket.service';
import {Ticket} from '../../../ticket';

@Component({
  moduleId: module.id,
  selector: 'ticket',
  templateUrl: 'ticket.component.html'
})

export class TicketComponent{
    tickets: Ticket[];
    hideForm = true;
    hideList = false;
    roundTrip = false;

    constructor(private ticketService: TicketService){};

    cap(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    sethideForm(){
        this.hideList = false;
        this.hideForm = true;
    }

    getTickets(origin, destination, day){
        this.hideForm = false;
        this.hideList = true;
        var origin = this.cap(origin);
        var destination = this.cap(destination);
        var day = this.cap(day);
        var ticket = {
            'origin': origin,
            'destination': destination,
            'day': day
        };
        if (this.roundTrip){
            var returnTicket = {
                'origin': ticket.destination,
                'destination': ticket.origin,
                'day': day
            }
        }
        this.ticketService.getTickets(ticket)
            .subscribe(ticket => {
                var newticket = ticket.map(function(){
                    if (ticket.dep_time.length > 1){
                        var arrayfare = [];
                        for (var i=0; i<=ticket.dep_time.length; i++){
                            arrayfare.push(ticket.fare)
                        }
                        return ticket.fare = arrayfare;
                    }
                    else{
                        var arrayfare = [];
                        return ticket.fare = arrayfare.push(ticket.fare); 
                    }
                })
                this.tickets = newticket;
                // this.tickets = ticket;
        });
    }

    
    
}
