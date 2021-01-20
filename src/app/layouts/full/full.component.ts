import {
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  ViewChild,
  HostListener,
  Directive,
  AfterViewInit,
  OnInit
} from '@angular/core';
import * as $ from 'jquery';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from '../../shared/menu-items/menu-items';
import { Router } from '@angular/router';
@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: [],
  providers:[MenuItems] 
})
export class FullComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems)
  {
    this.mobileQuery = media.matchMedia('(min-width:768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  } 
  
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  } 
}



