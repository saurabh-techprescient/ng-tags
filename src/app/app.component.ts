import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  getAppApiRequests,
  getLoadingText
} from './redux/selectors/app.selectors';
import { NgxSpinnerService } from 'ngx-spinner';
import { messages } from './shared/messages';
import { loadFiles } from './redux/actions/file.actions';
import { loadTags } from './redux/actions/tags.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  readonly messages = messages;
  apiLoadingSubscription = new Subscription();
  loadingTextSubscription = new Subscription();
  loadingText = this.messages.loadingText;
  constructor(
    private readonly store: Store,
    private readonly spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.store.dispatch(loadFiles());
    this.store.dispatch(loadTags());
    this.apiLoadingSubscription = this.store
      .select(getAppApiRequests)
      .subscribe({
        next: (value: { tags: boolean; fileList: boolean }) => {
          if (value.fileList || value.tags) {
            if (value.fileList) {
              this.loadingText = this.messages.loadingText;
            }
            if (value.tags) {
              this.loadingText = this.messages.loadingText;
            }
            this.spinner.show().then();
          } else if (!value.fileList && !value.tags) {
            this.spinner.hide().then();
          }
          if (value.fileList && value.tags) {
            this.loadingText = this.messages.loadingText;
            this.spinner.show().then();
          }
        }
      });
    this.loadingTextSubscription = this.store.select(getLoadingText).subscribe({
      next: (value) => (this.loadingText = value)
    });
  }

  ngOnDestroy() {
    this.apiLoadingSubscription.unsubscribe();
    this.loadingTextSubscription.unsubscribe();
  }
}
