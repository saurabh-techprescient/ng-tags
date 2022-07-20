import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileListComponent } from './file-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PrimeNgModule } from '../../prime-ng.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { metaReducers, reducers } from '../../redux';

describe('FileListComponent', () => {
  let component: FileListComponent;
  let fixture: ComponentFixture<FileListComponent>;

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
      declarations: [FileListComponent],
      providers: [ConfirmationService, MessageService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
