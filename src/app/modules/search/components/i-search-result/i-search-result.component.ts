import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Act, Category} from '../../models/models';
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
  public actGroupsAnomaly = [];

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
  public predict;

  public stats = {
    acts: 0,
    anomalies: 0,
    anomalies_pct: 0,
    not_anomalies: 0,
    not_anomalies_pct: 0,
    v_anomalies: 0,
    h_anomalies: 0,
    vh_anomalies: 0
  };

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
      this.predict = response;
    });
  }

  getActs(category: Category) {
    this.categories.forEach(c => {
      c.isActive = false;
    });
    category.isActive = true;
    this.dataService.getActs(category).subscribe(response => {
      const defaults = [];
      const anomalies = [];
      response.acts.forEach(r => {
        if (r.anomaly === 1) {
          defaults.push(r);
        } else {
          anomalies.push(r);
        }
      });
      this.stats.acts = defaults.length;
      this.stats.anomalies = anomalies.length;
      this.stats.anomalies_pct = Math.round(anomalies.length * 100 / defaults.length);
      this.stats.v_anomalies = response.counts.vertical_anomaly_count;
      this.stats.h_anomalies = response.counts.horizontal_anomaly_count;
      this.stats.vh_anomalies = response.counts.red_anomaly_count;
      this.stats.not_anomalies = defaults.length - anomalies.length;
      this.stats.not_anomalies_pct = 100 - this.stats.anomalies_pct;

      this.predicts = response.results;
      this.actGroupsAnomaly = anomalies;
      this.actGroups = new MatTableDataSource(defaults);
    });
  }

  capitalize(str: string) {
    str = str.toLowerCase();
    if (str.length > 55) {
      str = str.slice(0, 55) + '...';
    }
    return str.replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
  }

  openAct(item: Act, instance: string) {
    return this.router.navigate(['/act', item.id, instance]);
  }

  download(item: Act) {
    window.location.href = this.apiService.API_URL + '/solutions/1_instance/' + item.solution;
  }

  getIcon(icon: string) {
    return '/assets/images/results/' + icon + '.svg';
  }

  getAnomalyColor(anomaly: number) {
    if (anomaly === 2 || anomaly === 3) {
      return 'warning';
    }
    if (anomaly === 9) {
      return 'danger';
    }
  }

}
