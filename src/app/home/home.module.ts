import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/material.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { RegisterComponent } from './register/register.component';
import { ViewComponent } from './view/view.component';

@NgModule({
  declarations: [
    HomeComponent,
    RegisterComponent,
    ViewComponent,
  ],
  imports: [    
    CommonModule,
    HomeRoutingModule,    
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [],
})
export class HomeModule { }
