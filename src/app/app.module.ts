import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './support/page-not-found/page-not-found.component';
import {AlertMessageComponent} from './shared/components/alert-message/alert-message.component';
import {LoadingMessageComponent} from './shared/components/loading-message/loading-message.component';
import {MainHeaderComponent} from './shared/components/main-header/main-header.component';
import {MainTemplateComponent} from './shared/components/main-template/main-template.component';
import {PopupMessageComponent} from './shared/components/popup-message/popup-message.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material';
import {AuthModule} from './modules/auth/auth.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './modules/auth/helpers/jwt.interceptor';
import {ErrorInterceptor} from './modules/auth/helpers/error.interceptor';
import {SearchModule} from './modules/search/search.module';
import {DatexPipe} from './shared/pipes/datex.pipe';
import {FileSizePipe} from './shared/pipes/file-size.pipe';
import {FilterByPipe} from './shared/pipes/filter-by.pipe';
import {LeftTimePipe} from './shared/pipes/left-time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    AlertMessageComponent,
    LoadingMessageComponent,
    MainHeaderComponent,
    MainTemplateComponent,
    PopupMessageComponent,
    DatexPipe,
    FileSizePipe,
    FilterByPipe,
    LeftTimePipe
  ],
  imports: [
    AuthModule,
    SearchModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
