import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {NavComponent} from './components/nav/nav.component';
import {ContactComponent} from './components/contact/contact.component';
import {SignupComponent} from './components/signup/signup.component';
import {AboutComponent} from './components/about/about.component';
import {HomepageComponent} from './components/homepage/homepage.component';
import {TicketComponent} from './components/ticket/ticket.component';

@NgModule({
  imports:      [ BrowserModule,  HttpModule, FormsModule ],
  declarations: [
        AppComponent, 
        NavComponent, 
        ContactComponent, 
        SignupComponent, 
        AboutComponent, 
        HomepageComponent, 
        TicketComponent
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
