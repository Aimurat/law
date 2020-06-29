import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {ActGroup, Category} from '../../models/models';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {ApiService} from '../../../../shared/services/api.service';

@Component({
  selector: 'app-i-search-result',
  templateUrl: './i-search-result.component.html',
  styleUrls: ['./i-search-result.component.scss']
})
export class ISearchResultComponent implements OnInit {

  public actGroups;
  public actGroupsAnomaly;

  public category: Category = null;
  public categories: Category[] = [];
  public displayedColumns: string[] = [
    'act_number',
    'claimant',
    'result',
    'tools'
  ];

  public data;
  public predicts;

  constructor(
    private dataService: DataService,
    private dialog: MatDialog,
    private router: Router,
    private apiService: ApiService
  ) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.searchActs();
    this.dataService.intellectualData.subscribe(response => {
      if (response.length === 1) {
        const ls = localStorage.getItem('categories');
        if (ls) {
          this.categories = JSON.parse(ls);
        }
      } else {
        this.categories = response;
      }
      if (this.categories.length > 1) {
        this.category = this.categories[0];
        this.getActs(this.categories[0]);
        this.loadResultPredict();
      }
    });
  }

  loadResultPredict() {
    this.dataService.getResultPredict(this.category.code).subscribe(response => {
      this.predicts = response;
      console.log(response);
    });
  }

  searchActs() {
    this.dataService.searchActs().subscribe(response => {
      const defaults = [];
      const anomalies = [];
      response.forEach(r => {
        if (r.anomaly === 1) {
          defaults.push(r);
        } else {
          anomalies.push(r);
        }
      });
      this.actGroupsAnomaly = anomalies;
      this.actGroups = new MatTableDataSource(defaults);
    });
  }

  getActs(category: Category) {
    this.categories.forEach(c => {
      c.isActive = false;
    });
    category.isActive = true;
    this.dataService.getActs(category).subscribe(response => {
      this.data = new MatTableDataSource(response);
    });
  }

  capitalize(str: string) {
    str = str.toLowerCase();
    if (str.length > 55) {
      str = str.slice(0, 55) + '...';
    }
    return str.replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
  }

  openAct(item: ActGroup, instance: string) {
    return this.router.navigate(['/act', item.act.id, instance]);
  }

  download(item: ActGroup) {
    window.location.href = this.apiService.API_URL + '/solutions/1_instance/' + item.act.solution;
  }

  getIcon(icon: string) {
    return '/assets/images/results/' + icon + '.svg';
  }

  getAnomalyColor(anomaly: number) {
    if (anomaly === 2) {
      return 'warning';
    }
    if (anomaly === 3) {
      return 'danger';
    }
  }

}
