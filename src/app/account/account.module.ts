import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AccountRoutingModule } from './account-routing.module'; 
import { DemoMaterialModule } from "../demo-material-module";
import { FlexLayoutModule } from '@angular/flex-layout';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from "./login/login.component";
import { AccountComponent } from './account.component';
import { AlertComponent } from "../alert/alert.component";

@NgModule({
  declarations: [AccountComponent, LoginComponent, RegisterComponent,AlertComponent],
  imports: [
    CommonModule, DemoMaterialModule, FlexLayoutModule, FormsModule, ReactiveFormsModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
