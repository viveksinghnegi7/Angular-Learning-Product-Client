import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionAnchorDirective } from "./accordion/accordionanchor.directive";
import { AccordionLinkDirective } from "./accordion/accordionlink.directive";
import { AccordionDirective } from "./accordion/accordion.directive";
import { MenuItems } from "./menu-items/menu-items";


@NgModule({
  declarations: [AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective],
  imports: [
    CommonModule
  ],
  exports: [AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective],
  providers:[MenuItems]
})
export class SharedModule { }
