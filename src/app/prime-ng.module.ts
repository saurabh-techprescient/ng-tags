import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TreeModule } from 'primeng/tree';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [],
  imports: [
    TreeModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    ConfirmDialogModule,
    TableModule,
    CheckboxModule,
    RippleModule,
    MenuModule,
    ChipsModule,
    FileUploadModule,
    ToastModule
  ],
  exports: [
    TreeModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    ConfirmDialogModule,
    TableModule,
    CheckboxModule,
    RippleModule,
    MenuModule,
    ChipsModule,
    FileUploadModule,
    ToastModule
  ]
})
export class PrimeNgModule {}
