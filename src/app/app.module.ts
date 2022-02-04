import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, Headers, RequestOptions, Response } from '@angular/http';
import { Ng2SmartTableModule } from 'ngx-smart-table';
import {
  NgModule,
  ApplicationRef
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { AppState, InternalStateType } from './app.service';

/*
 * 3rd part modules
 */

import './rxjs-extensions';
import { TreeModule } from 'angular-tree-component';
import { MaterialModule } from '@angular/material';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { DndModule } from 'ng2-dnd';
import { Ng2TableModule } from 'ng2-table';
import { FileUploadModule } from 'ng2-file-upload';
import { BusyModule, BusyConfig } from 'angular2-busy';
import { TagInputModule } from 'ng2-tag-input';
import { AuthConfig } from 'angular2-jwt';
import { JwtConfigService, JwtHttp } from 'angular2-jwt-refresh';

// services
import { TagsService } from './services/tags.service';
import { MetadataService } from './services/metadata.service';
import { GlobalService } from './services/global.service';

// components
import { UsersComponent } from './components/tags/tags.component';
import { LinkedDocumentsComponent } from './components/tags/linked-documents.component';
import { PersonaMgmtComponent } from './components/persona-mgmt/persona-mgmt.component';
import { PersonaTagsComponent } from './components/persona-mgmt/tags/persona-tags.component';

// directives
import { ClickOutsideDirective } from './directives/clickOutside.directive';


import '../styles/styles.scss';

// pipes
import { ContentTypePipe } from './pipes/content-type.pipe';
import { GroupTypePipe } from './pipes/group-type.pipe';

import '../styles/styles.scss';

// Application wide providers
const APP_PROVIDERS = [
  AppState,
    {
    provide: JwtHttp,
    useFactory: getJwtHttp,
    deps: [ Http ]
  },
  {
    provide: TagsService,
    useFactory: configTagsService,
    deps: [ Http, JwtHttp ]
  },
  {
    provide: MetadataService,
    useFactory: configMetadataService,
    deps: [ Http, JwtHttp ]
  },
  GlobalService
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  entryComponents: [ AppComponent ],
  declarations: [
    AppComponent,
    ClickOutsideDirective,
    PersonaMgmtComponent,
    PersonaTagsComponent,
    UsersComponent,
    LinkedDocumentsComponent,
    ClickOutsideDirective,
    ContentTypePipe,
    GroupTypePipe
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    Ng2AutoCompleteModule,
    ButtonsModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    PopoverModule.forRoot(),
    BsDropdownModule.forRoot(),
    DndModule.forRoot(),
    Ng2SmartTableModule,
    Ng2TableModule,
    FileUploadModule,
    BusyModule.forRoot(
      new BusyConfig({
        message: '',
        template: '<div class="loading-spinner">{{message}}</div>',
        delay: 200
      })
    ),
    TreeModule,
    TagInputModule,
    // RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState
  ) {}

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }
    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }
  public hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}

export function getJwtHttp(http: Http, options: RequestOptions) {
  let jwtOptions = {
    endPoint: window['Drupal'].settings.ng_persona.refreshAPI,
    // optional
    payload: { refreshToken: window['Drupal'].settings.OktaRefreshToken },
    beforeSeconds: 600, // refresh tokens before 10 min
    tokenName: 'refresh_token',
    refreshTokenGetter: (() => window['Drupal'].settings.OktaRefreshToken),
    tokenSetter: ((res: Response): boolean | Promise<void> => {
      res = res.json();

      window['Drupal'].settings.OktaAccessToken = res['access_token'];
      window['Drupal'].settings.OktaRefreshToken = res['refresh_token'];

      let tokenPayload = JSON.stringify({
        'OktaAccessToken':      res['access_token'],
        'OktaRefreshToken':     res['refresh_token']
      });

      let csrfToken: any;

      return http
        .get(window.location.origin + '/services/session/token')
        .map((res) => {
          if (res) {
            csrfToken = res['_body'];
          }

          return res;
        })
        .flatMap(res => {
            let headers = new Headers();
            headers.append('X-CSRF-Token', csrfToken);
            headers.append('Content-Type', 'application/json');

            return http
              .put(
                window.location.origin + '/api/AccessToken/refresh',
                tokenPayload,
                { headers }
              )
              .map(res => res.json());
          }
        )
        .toPromise();
    })
  };
  let authConfig = new AuthConfig({
    noJwtError: true,
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => window['Drupal'].settings.OktaAccessToken),
  });

  return new JwtHttp(
    new JwtConfigService(jwtOptions, authConfig),
    http,
    options
  );
}

export function configTagsService(http: Http, jwtHttp: JwtHttp) {
  return new TagsService(
    window['Drupal'].settings.ng_persona.baseAPI,
    window['Drupal'].settings.ng_persona.tagsAPI,
    http,
    jwtHttp
  )
}

export function configMetadataService(http: Http, jwtHttp: JwtHttp) {
  return new MetadataService(
    window['Drupal'].settings.ng_persona.metadataAPI,
    http,
    jwtHttp
  )
}
