import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { messages } from './shared/messages';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  readonly messages = messages;
  apiLoadingSubscription = new Subscription();
  loadingTextSubscription = new Subscription();
  loadingText = this.messages.loadingText;
  constructor(
    private readonly store: Store,
    private readonly spinner: NgxSpinnerService
  ) {}

  ngOnInit() {}
}
