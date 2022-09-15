import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppHeaderComponent } from './cmps/app-header/app-header.component';
import { AppFooterComponent } from './cmps/app-footer/app-footer.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContactListComponent } from './cmps/contact-list/contact-list.component';
import { ContactFilterComponent } from './cmps/contact-filter/contact-filter.component';
import { ContactPreviewComponent } from './cmps/contact-preview/contact-preview.component';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';
import { ContactsPageComponent } from './pages/contacts-page/contacts-page.component';
import { LottieModule } from 'ngx-lottie';
import { DetailsPipe } from './pages/details.pipe';
import { LoginModalComponent } from './modals/login-modal/login-modal.component';
import { ChartComponent } from './cmps/chart/chart.component';
import { CommonModule } from '@angular/common';
import { StatisticsPageComponent } from './pages/statistics-page/statistics-page.component';
import { GoogleChartsModule } from 'angular-google-charts';


@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent,
    HomePageComponent,
    ContactListComponent,
    ContactFilterComponent,
    ContactPreviewComponent,
    ContactDetailsComponent,
    ContactEditComponent,
    ContactsPageComponent,
    DetailsPipe,
    LoginModalComponent,
    ChartComponent,
    StatisticsPageComponent,

  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    LottieModule.forRoot({ player: playerFactory }),
    GoogleChartsModule,
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function playerFactory() { 
  return import('lottie-web'); 
} 
