import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpClientInterceptor } from './interceptors/http-client.interceptor';
import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MappingComponent } from './components/mapping/mapping.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { metaReducers, reducers } from './redux';
import { StoreModule } from '@ngrx/store';
import { PrimeNgModule } from './prime-ng.module';
/*Components*/
import { FileListComponent } from './components/file-list/file-list.component';
import { TagsComponent } from './components/tags/tags.component';
/*Services*/
import { AppService } from './services/app.service';
import { FilesService } from './services/files.service';
import { GlobalService } from './services/global.service';
import { TagsService } from './services/tags.service';

@NgModule({
  declarations: [
    AppComponent,
    FileListComponent,
    TagsComponent,
    MappingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    NgxSpinnerModule,
    FormsModule,
    PrimeNgModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpClientInterceptor,
      multi: true
    },
    AppService,
    ConfirmationService,
    FilesService,
    GlobalService,
    MessageService,
    TagsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
