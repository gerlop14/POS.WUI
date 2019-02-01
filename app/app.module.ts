import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';

import { LoginComponent } from './modules/login/login.component';
import { HomeComponent } from './modules/home/home.component';

import { SystemSetupModule } from './modules/systemsetup/systemsetup.module';

import { AuthService } from './services/auth.service';

const appRoutes: Routes = [

    //Site routes goes here 
    {
        path: '',
        component: SiteLayoutComponent,
        children: [
            { path: '', component: HomeComponent, pathMatch: 'full' }
        ]
    },

    //no layout routes
    { path: 'login', component: LoginComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
      AppComponent,
      SiteLayoutComponent,
      LoginComponent,
      HomeComponent
  ],
  imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      SystemSetupModule,
      RouterModule.forRoot(appRoutes)
  ],
    providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
