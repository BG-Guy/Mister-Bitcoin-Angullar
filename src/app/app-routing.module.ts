import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';
import { ContactResolverService } from './services/contact-resolver.service';
import { ContactsPageComponent } from './pages/contacts-page/contacts-page.component';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { StatisticsPageComponent } from './pages/statistics-page/statistics-page.component';

const routes: Routes = [
  
  {
    path: 'contacts/edit/:id',
            component: ContactEditComponent,
            resolve: { contact: ContactResolverService },
            canActivate: [AuthGuard]
  },
  {
    path: 'contacts', component: ContactsPageComponent,
    //  children: [
    //   {
    //         path: 'details/:id',
    //         component: ContactDetailsComponent,
            
    //   },
    // ]
  },
  {
    path: 'statistics', component: StatisticsPageComponent,

  },
  {
    path: 'contacts/details/:id', component: ContactDetailsComponent,
    resolve: { contact: ContactResolverService },
            canActivate: [AuthGuard]
  },
  {
    path: '', component: HomePageComponent, 
   
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
