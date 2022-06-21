import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TagsComponent } from './components/tags/tags.component';
import { FileListComponent } from './components/file-list/file-list.component';
import { MappingComponent } from './components/mapping/mapping.component';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PrimeNgModule } from './prime-ng.module';
import { metaReducers, reducers } from './redux';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        ReactiveFormsModule,
        HttpClientTestingModule,
        NgxSpinnerModule,
        FormsModule,
        PrimeNgModule
      ],
      declarations: [
        AppComponent,
        TagsComponent,
        FileListComponent,
        MappingComponent
      ],
      providers: [ConfirmationService, MessageService]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
