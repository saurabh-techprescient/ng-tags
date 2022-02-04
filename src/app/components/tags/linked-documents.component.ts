/**
 * Created by adriangillette on 2/7/17.
 */

import { Component, OnInit, Inject, ChangeDetectorRef, HostListener, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'linked-documents',
  templateUrl: 'linked-documents.component.html',
  styles: [
    '.fa {margin-left: 20px; cursor: pointer}'
  ]
})

export class LinkedDocumentsComponent implements OnInit {
  @HostListener('mouseenter') onMouseEnter() {
    this.mouseover = true;
    this.show = true;
  }
  @HostListener('mouseleave') onMouseLeave() {
    if (!this.removeClick) {
      this.mouseover = false;
    }
    this.show = false;
  }

  public mouseover: boolean = false;
  public removeClick: boolean = false;
  public show: boolean = false;

  @ViewChild('removePop') removePop: any;

  @Input() user: any;

  @Output() removeUser: EventEmitter<any> = new EventEmitter();

  public constructor(

  ) {

  }

  public ngOnInit() {

  }

  public onRemoveClick() {
    this.removeClick = true;
  }

  public onRemoveClickOutside() {
    if (!this.show) {
      this.removeClick = false;
      this.mouseover = false;
    }
  }

  public remove() {
    this.removeUser.emit(this.user);
    this.removePop.hide();
    this.removeClick = false;
    this.mouseover = false;
  }

  public cancelRemove() {
    this.removePop.hide();
    this.removeClick = false;
    this.mouseover = false;
  }
}
