import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//components
//Root components
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

//app components
import { HomeComponent } from './home/home.component';

//APP modules
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    AuthModule,
    AppRoutingModule //Must be the last one to find all feature Modules
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
