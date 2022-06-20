import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TagsService } from '../../services/tags.service';
import * as TagActions from '../actions/tags.actions';
import { loadFiles } from '../actions/file.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { loadTagsApiSuccess } from '../actions/app.actions';
import { Tags } from '../../interfaces/tags';
import { SuccessResponse } from '../../interfaces/success-response';
import { ResponseCode } from '../../enums/response-code';
import { AppService } from '../../services/app.service';
import { messages } from '../../shared/messages';
import { loadTags } from '../actions/tags.actions';

@Injectable()
export class TagsEffects {
  fetchAllTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TagActions.loadTags.type),
      switchMap(() => {
        this.store.dispatch(loadTagsApiSuccess({ data: true }));
        return this.tagsService.getTags().pipe(
          map((tags: Array<Tags>) => {
            this.store.dispatch(loadTagsApiSuccess({ data: false }));
            this.appService.toast(
              this.messages.success,
              this.messages.apiRequests.files.success
            );
            return TagActions.loadTagsSuccess({ tags });
          }),
          catchError((error: any) => {
            console.error(this.messages.apiRequests.files.failed, error);
            this.appService.toast(
              this.messages.success,
              this.messages.apiRequests.files.failed,
              'error'
            );
            this.store.dispatch(loadTagsApiSuccess({ data: false }));
            return of(TagActions.loadTagsFailure({ error }));
          })
        );
      })
    )
  );

  createTag$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TagActions.createTag.type),
      switchMap((action: any) => {
        this.appService.showSpinner(this.messages.loading.createNode);
        return this.tagsService.addTag(action.tags.tagName).pipe(
          map((data: any) => {
            const success = false;
            if (data.responseCode === ResponseCode.sn201) {
              this.store.dispatch(loadTags());
              this.appService.toast(
                this.messages.success,
                this.messages.apiRequests.createNode.success
              );
            } else {
              console.error(this.messages.apiRequests.createNode.failed, data);
              this.appService.toast(
                this.messages.failure,
                this.messages.apiRequests.createNode.failed,
                'error'
              );
            }
            this.appService.hideSpinner();
            return TagActions.createTagSuccess({ data: success });
          }),
          catchError((error: any) => {
            console.error(this.messages.apiRequests.createNode.failed, error);
            this.appService.toast(
              this.messages.failure,
              this.messages.apiRequests.createNode.failed,
              'error'
            );
            this.appService.hideSpinner();
            return of(TagActions.createTagFailure({ error }));
          })
        );
      })
    )
  );

  deleteTag$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TagActions.deleteTag.type),
      switchMap((action: any) => {
        this.appService.showSpinner(this.messages.loading.deleteFile);
        return this.tagsService.deleteTag(action.data).pipe(
          map((data: SuccessResponse) => {
            const success = false;
            if (data.responseCode === ResponseCode.s205) {
              this.appService.toast(
                this.messages.success,
                this.messages.apiRequests.deleteFile.success
              );
              this.store.dispatch(loadFiles());
            } else {
              console.error(this.messages.apiRequests.deleteFile.failed, data);
              this.appService.toast(
                this.messages.failure,
                this.messages.apiRequests.deleteFile.failed,
                'error'
              );
            }
            this.appService.hideSpinner();
            return TagActions.deleteTagSuccess({ data: success });
          }),
          catchError((error: any) => {
            console.error(this.messages.apiRequests.deleteFile.failed, error);
            this.appService.toast(
              this.messages.failure,
              this.messages.apiRequests.deleteFile.failed,
              'error'
            );
            this.appService.hideSpinner();
            return of(TagActions.deleteTagFailure({ error }));
          })
        );
      })
    )
  );

  updateTag$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TagActions.updateTag.type),
      switchMap((action: any) => {
        this.appService.showSpinner(this.messages.loading.updateTags);
        return this.tagsService.updateTag(action.tags).pipe(
          map((data: SuccessResponse) => {
            let success = false;
            if (data.responseCode === ResponseCode.sn201) {
              success = true;
              this.store.dispatch(loadFiles());
              this.appService.toast(
                this.messages.success,
                this.messages.apiRequests.updateFileTag.success
              );
            } else {
              console.error(
                this.messages.apiRequests.updateFileTag.failed,
                data
              );
              this.appService.toast(
                this.messages.failure,
                this.messages.apiRequests.updateFileTag.failed,
                'error'
              );
            }
            this.appService.hideSpinner();
            return TagActions.updateTagSuccess({ data: success });
          }),
          catchError((error: any) => {
            console.error(
              this.messages.apiRequests.updateFileTag.failed,
              error
            );
            this.appService.toast(
              this.messages.failure,
              this.messages.apiRequests.updateFileTag.failed,
              'error'
            );
            this.appService.hideSpinner();
            return of(TagActions.updateTagFailure({ error }));
          })
        );
      })
    )
  );

  readonly messages = messages;

  constructor(
    private actions$: Actions,
    private readonly store: Store,
    private readonly tagsService: TagsService,
    private readonly appService: AppService
  ) {}
}
