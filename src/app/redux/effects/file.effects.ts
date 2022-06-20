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

  // unlinkFile$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(FileActions.unlinkFile.type),
  //     switchMap((action: any) => {
  //       this.appService.showSpinner(this.messages.loading.deleteFile);
  //       return this.fileService
  //         .unlinkFile(action.data.metadataId, action.data.files)
  //         .pipe(
  //           map((data: SuccessResponse) => {
  //             const success = false;
  //             if (data.responseCode === ResponseCode.sn205) {
  //               this.store.dispatch(loadTags());
  //               this.appService.toast(
  //                 this.messages.success,
  //                 this.messages.apiRequests.unlinkFile.success
  //               );
  //             } else {
  //               console.error(
  //                 this.messages.apiRequests.unlinkFile.failed,
  //                 data
  //               );
  //               this.appService.toast(
  //                 this.messages.failure,
  //                 this.messages.apiRequests.unlinkFile.failed,
  //                 'error'
  //               );
  //             }
  //             this.appService.hideSpinner();
  //             return FileActions.unlinkFileSuccess({ data: success });
  //           }),
  //           catchError((error: any) => {
  //             console.error(this.messages.apiRequests.unlinkFile.failed, error);
  //             this.appService.toast(
  //               this.messages.failure,
  //               this.messages.apiRequests.unlinkFile.failed,
  //               'error'
  //             );
  //             this.appService.hideSpinner();
  //             return of(FileActions.unlinkFileFailure({ error }));
  //           })
  //         );
  //     })
  //   )
  // );

  readonly messages = messages;

  constructor(
    private actions$: Actions,
    private readonly store: Store,
    private readonly appService: AppService,
    private readonly filesService: FilesService
  ) {}
}
