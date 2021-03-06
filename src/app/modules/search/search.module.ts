import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SearchRoutingModule} from './search-routing.module';
import {SearchFormComponent} from './components/search-form/search-form.component';
import {
  MatAutocompleteModule,
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
import { SynonymsDialogComponent } from './dialogs/synonyms-dialog/synonyms-dialog.component';
import { ActsDialogComponent } from './dialogs/acts-dialog/acts-dialog.component';


@NgModule({
  declarations: [
    SearchFormComponent,
    SearchResultComponent,
    FoundedWordsDialogComponent,
    ActComponent,
    ISearchResultComponent,
    SafeHtmlPipe,
    SynonymsDialogComponent,
    ActsDialogComponent
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
    MatNativeDateModule,
    MatAutocompleteModule
  ],
  entryComponents: [
    FoundedWordsDialogComponent,
    SynonymsDialogComponent,
    ActsDialogComponent
  ]
})
export class SearchModule {
}
