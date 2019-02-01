import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { StateTaxService } from '../../services/statetax.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatFormFieldModule, MatInputModule, MatTableModule, MatButtonModule, MatCardModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SiteLayoutComponent } from '../../_layout/site-layout/site-layout.component';
import { StateTaxListComponent } from './statetax-list.component';
import { StateTaxEditComponent } from './statetax-edit.component';

import { AuthService } from '../../services/auth.service';
import { AuthInterceptor } from '../../services/auth.interceptor';
import { AuthResponseInterceptor } from '../../services/auth.response.interceptor';

const appRoutes: Routes = [

  //Site routes goes here 
  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      { path: 'statetax', component: StateTaxListComponent },
      { path: 'statetax/edit/:id', component: StateTaxEditComponent },
      { path: 'statetax/create', component: StateTaxEditComponent }
    ]
  }
];

@NgModule({
  declarations: [
    StateTaxListComponent,
    StateTaxEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatTableModule,
      MatButtonModule,
      MatCardModule,
      BrowserAnimationsModule,
    RouterModule.forChild(appRoutes)
    ],
    providers: [AuthService, StateTaxService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthResponseInterceptor,  //AuthInterceptor,
            multi: true
        }]
})
export class SystemSetupModule { }

