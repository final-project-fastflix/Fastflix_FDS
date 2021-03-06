// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, COMPOSITION_BUFFER_MODE } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import {
  HomeComponent,
  MovieComponent,
  ProfileComponent,
  SignupComponent,
  LoginComponent,
  WatchComponent,
  IndexComponent,
  MyListComponent,
  ProfileManageComponent,
  SliderComponent,
  DetailCardComponent,
  HeaderComponent,
  FooterComponent,
  SubHeaderComponent,
  SignupStep1Component,
  SignupStep2Component,
  SignupStep3Component,
  SignupStep4Component,
  ProfileSliderComponent,
  OriginalSliderComponent,
  SearchComponent,
  DetailSliderComponent,
} from './components';

// Directives
import { FixHeaderDirective } from './directives/fix-header.directive';
import { MoveupdownDirective } from './directives/moveupdown.directive';
import { OnUnloadDirective } from './directives/on-unload.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MovieComponent,
    SignupComponent,
    LoginComponent,
    ProfileComponent,
    SliderComponent,
    WatchComponent,
    DetailCardComponent,
    IndexComponent,
    HeaderComponent,
    FooterComponent,
    MyListComponent,
    FixHeaderDirective,
    ProfileManageComponent,
    SubHeaderComponent,
    SignupStep1Component,
    SignupStep2Component,
    SignupStep3Component,
    SignupStep4Component,
    MoveupdownDirective,
    ProfileSliderComponent,
    OriginalSliderComponent,
    OnUnloadDirective,
    SearchComponent,
    DetailSliderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: COMPOSITION_BUFFER_MODE,
      useValue: false,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
