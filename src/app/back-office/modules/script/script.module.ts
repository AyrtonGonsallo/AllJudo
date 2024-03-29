import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../sharedModule/shared/shared.module';
import { ScriptRoutingModule } from './script-routing.module';
import { DisplayComponent } from './display/display.component';


@NgModule({
  declarations: [
    DisplayComponent
  ],
  imports: [
    CommonModule,SharedModule,
    ScriptRoutingModule
  ]
})
export class ScriptModule { }
