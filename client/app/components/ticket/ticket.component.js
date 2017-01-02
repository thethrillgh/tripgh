"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var ticket_service_1 = require("../../services/ticket.service");
var TicketComponent = (function () {
    function TicketComponent(ticketService) {
        this.ticketService = ticketService;
        this.hideForm = true;
        this.hideList = false;
    }
    ;
    TicketComponent.prototype.cap = function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    TicketComponent.prototype.sethideForm = function () {
        this.hideList = false;
        this.hideForm = true;
    };
    TicketComponent.prototype.getTickets = function (origin, destination, day) {
        var _this = this;
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
        this.ticketService.getTickets(ticket)
            .subscribe(function (ticket) {
            var newticket = ticket.map(function () {
                if (ticket.dep_time.length > 1) {
                    var arrayfare = [];
                    for (var i = 0; i <= ticket.dep_time.length; i++) {
                        arrayfare.push(ticket.fare);
                    }
                    return ticket.fare = arrayfare;
                }
                else {
                    var arrayfare = [];
                    return ticket.fare = arrayfare.push(ticket.fare);
                }
            });
            _this.tickets = ticket;
            var newtickets;
        });
    };
    return TicketComponent;
}());
TicketComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'ticket',
        templateUrl: 'ticket.component.html'
    }),
    __metadata("design:paramtypes", [ticket_service_1.TicketService])
], TicketComponent);
exports.TicketComponent = TicketComponent;
//# sourceMappingURL=ticket.component.js.map