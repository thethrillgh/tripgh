import { HomepageComponent } from './../homepage/homepage.component';
import { NorthernTourPackageComponent } from './../packages/northern-tour-package/northern-tour-package.component';
import { EcotourismTourPackageComponent } from './../packages/ecotourism-tour-package/ecotourism-tour-package.component';
import { DiscoverTourPackageComponent } from './../packages/discover-tour-package/discover-tour-package.component';
import { CultureTourPackageComponent } from './../packages/culture-tour-package/culture-tour-package.component';
import { AccraTourPackageComponent } from './../packages/accra-tour-package/accra-tour-package.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: '/homepage', pathMatch: 'full' },
    { path: 'accra-tour', component: AccraTourPackageComponent },
    { path: 'culture-tour', component: CultureTourPackageComponent },
    { path: 'discover-tour', component: DiscoverTourPackageComponent },
    { path: 'ecotourism-tour', component: EcotourismTourPackageComponent },
    { path: 'northern-tour', component: NorthernTourPackageComponent },
    { path: 'homepage', component: HomepageComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
