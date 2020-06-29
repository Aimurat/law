import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {Row} from '../../models/models';
import {FoundedWordsDialogComponent} from '../../dialogs/founded-words-dialog/founded-words-dialog.component';
import {Router} from '@angular/router';
import {ApiService} from '../../../../shared/services/api.service';

interface ITab {
  name: string;
  slug: string;
  count: number;
  data: any;
}

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  public displayedColumns: string[] = [
    'act_number',
    'claimant',
    'result',
    'tools'
  ];

  public tabs: ITab[] = [];

  constructor(
    private dataService: DataService,
    private dialog: MatDialog,
    private router: Router,
    private apiService: ApiService
  ) {
  }

  ngOnInit() {
    this.dataService.data.subscribe(result => {
      let data = {
        first_instances: [],
        appeals: [],
        cassations: []
      };
      if (result && (result.first_instances.length || result.appeals.length || result.cassations.length)) {
        data = result;
      } else {
        const ls = localStorage.getItem('response');
        data = JSON.parse(ls);
      }
      this.tabs = [{
        name: 'Первая инстанция',
        slug: 'first_instances',
        count: data.first_instances.length,
        data: new MatTableDataSource(data.first_instances)
      }, {
        name: 'Аппеляция',
        slug: 'appeals',
        count: data.appeals.length,
        data: new MatTableDataSource(data.appeals)
      }, {
        name: 'Кассация',
        slug: 'cassations',
        count: data.cassations.length,
        data: new MatTableDataSource(data.cassations)
      }];
    });
  }

  capitalize(str: string) {
    str = str.toLowerCase();
    return str.replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
  }

  openHighlights(item: Row) {
    this.dialog.open(FoundedWordsDialogComponent, {
      autoFocus: false,
      width: '800px',
      data: {
        highlights: item.highlight
      }
    });
  }

  openAct(item: Row, instance: string) {
    return this.router.navigate(['/act', item.act.id, instance]);
  }

  download(item: Row, instance: string) {
    const dict = {
      first_instances: '1_instance',
      appeals: 'appeal',
      cassations: 'cassation'
    };
    window.location.href = this.apiService.API_URL + '/solutions/' + dict[instance] + '/' + item.act.solution;
  }

}
