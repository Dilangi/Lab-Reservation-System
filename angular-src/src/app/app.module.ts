import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { UserDashModule } from './user-dash/user-dash.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AuthGuard} from './guards/auth.guard';
import {RoleGuard} from './guards/role.guard';
import { AddReservationComponent } from './components/add-reservation/add-reservation.component';
import { ViewReservationComponent } from './components/view-reservation/view-reservation.component';
import { CreateUpdateComponent } from './components/create-update/create-update.component';
import { SearchReservationComponent } from './components/search-reservation/search-reservation.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';




const appRoutes: Routes = [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path:'userDash', component: UserDashModule},
  {path:'addReservation', component: AddReservationComponent, canActivate:[AuthGuard]},
  {path:'veiwReservation', component: ViewReservationComponent, canActivate:[AuthGuard]},
  {path:'editReservation/:id',component:CreateUpdateComponent, canActivate:[AuthGuard]},
  {path:'searchReservation', component:SearchReservationComponent, canActivate:[AuthGuard]},
  {path:'adminPanel', component:AdminPanelComponent, canActivate:[RoleGuard]}
  
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    DashboardComponent,
    AddReservationComponent,
    ViewReservationComponent,
    CreateUpdateComponent,
    SearchReservationComponent,
    AdminPanelComponent
  ],

  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes), // appRoutes: an object
    FormsModule, 
    FlashMessagesModule.forRoot(),
    HttpClientModule,
    HttpModule,
    UserDashModule,
  ],

  providers: [ValidateService,AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

