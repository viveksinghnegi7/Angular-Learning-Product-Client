import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserslistComponent } from './userslist/userslist.component';
import { UserComponent } from './user/user.component';


@NgModule({
  declarations: [UsersComponent, UserslistComponent, UserComponent],
  imports: [
    CommonModule, DemoMaterialModule, FlexLayoutModule, FormsModule, ReactiveFormsModule, UsersRoutingModule
  ]
})
export class UsersModule { }
