import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { FilesService } from '../../services/files.service';
import * as FileActions from '../actions/file.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { loadFilesApiSuccess } from '../actions/app.actions';
import { AppService } from '../../services/app.service';
import { messages } from '../../shared/messages';
import { File } from '../../interfaces/file';

@Injectable()
export class FileEffects {
  fetchAllFiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FileActions.loadFiles.type),
      switchMap(() => {
        this.store.dispatch(loadFilesApiSuccess({ data: true }));
        return this.filesService.getDocs().pipe(
          map((data: Array<File>) => {
            this.store.dispatch(loadFilesApiSuccess({ data: false }));
            this.appService.toast(
              this.messages.success,
              this.messages.apiRequests.files.success
            );
            return FileActions.loadFilesSuccess({ data });
          }),
          catchError((error: any) => {
            console.error(this.messages.apiRequests.files.failed, error);
            this.appService.toast(
              this.messages.success,
              this.messages.apiRequests.files.failed,
              'error'
            );
            this.store.dispatch(loadFilesApiSuccess({ data: false }));
            return of(FileActions.loadFilesFailure({ error }));
          })
        );
      })
    )
  );

  readonly messages = messages;

  constructor(
    private actions$: Actions,
    private readonly store: Store,
    private readonly appService: AppService,
    private readonly filesService: FilesService
  ) {}
}
