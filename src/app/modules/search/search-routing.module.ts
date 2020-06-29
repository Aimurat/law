import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainTemplateComponent} from '../../shared/components/main-template/main-template.component';
import {SearchFormComponent} from './components/search-form/search-form.component';
import {SearchResultComponent} from './components/search-result/search-result.component';
import {ActComponent} from './components/act/act.component';
import {ISearchResultComponent} from './components/i-search-result/i-search-result.component';

const routes: Routes = [
  {
    path: '', component: MainTemplateComponent, children: [
      {path: '', redirectTo: '/search', pathMatch: 'full'},
      {path: 'search', component: SearchFormComponent},
      {path: 'result', component: SearchResultComponent},
      {path: 'i-result', component: ISearchResultComponent},
      {path: 'act/:id/:instance', component: ActComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
