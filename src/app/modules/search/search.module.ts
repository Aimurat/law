import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SearchRoutingModule} from './search-routing.module';
import {SearchFormComponent} from './components/search-form/search-form.component';
import {
  MatButtonModule,
  MatCheckboxModule, MatDatepickerModule, MatDialogModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule, MatListModule, MatNativeDateModule, MatProgressBarModule,
  MatRippleModule,
  MatSelectModule, MatSortModule, MatTableModule,
  MatTabsModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { FoundedWordsDialogComponent } from './dialogs/founded-words-dialog/founded-words-dialog.component';
import { ActComponent } from './components/act/act.component';
import { ISearchResultComponent } from './components/i-search-result/i-search-result.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';


@NgModule({
  declarations: [
    SearchFormComponent,
    SearchResultComponent,
    FoundedWordsDialogComponent,
    ActComponent,
    ISearchResultComponent,
    SafeHtmlPipe
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatRippleModule,
    MatCheckboxModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatListModule,
    MatIconModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  entryComponents: [
    FoundedWordsDialogComponent
  ]
})
export class SearchModule {
}
