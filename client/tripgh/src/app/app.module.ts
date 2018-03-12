import { AppRoutingModule } from './routing/app-routing.module';
import { NorthernTourPackageComponent } from './packages/northern-tour-package/northern-tour-package.component';
import { EcotourismTourPackageComponent } from './packages/ecotourism-tour-package/ecotourism-tour-package.component';
import { DiscoverTourPackageComponent } from './packages/discover-tour-package/discover-tour-package.component';
import { CultureTourPackageComponent } from './packages/culture-tour-package/culture-tour-package.component';
import { AccraTourPackageComponent } from './packages/accra-tour-package/accra-tour-package.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';


@NgModule({
  declarations: [
    AppComponent,
    AccraTourPackageComponent,
    CultureTourPackageComponent,
    DiscoverTourPackageComponent,
    EcotourismTourPackageComponent,
    NorthernTourPackageComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
