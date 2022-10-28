import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { Store } from '@ngrx/store';
import { messages } from '../shared/messages';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  readonly messages = messages;
  constructor(
    private readonly messageService: MessageService,
    private readonly spinner: NgxSpinnerService,
    private readonly store: Store
  ) {}

  hideSpinner(): void {
    this.spinner.hide().then();
  }

  toast(summary: string, detail: string, severity = 'success'): void {
    this.messageService.add({ severity, summary, detail });
  }
}
