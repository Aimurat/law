import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Act, Category} from '../../models/models';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {ApiService} from '../../../../shared/services/api.service';
import {SynonymsDialogComponent} from '../../dialogs/synonyms-dialog/synonyms-dialog.component';
import {ActsDialogComponent} from '../../dialogs/acts-dialog/acts-dialog.component';

@Component({
  selector: 'app-i-search-result',
  templateUrl: './i-search-result.component.html',
  styleUrls: ['./i-search-result.component.scss']
})
export class ISearchResultComponent implements OnInit {

  public actGroups;
  public actGroupsAnomaly = [];

  public acts;

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
      if (this.categories.length >= 1) {
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
      const anomalies: Act[] = [];

      response.acts.forEach(r => {
        if (r.anomaly === 1) {
          defaults.push(r);
        } else {
          anomalies.push(r);
        }
      });

      anomalies.sort((a, b) => {
        if (a.anomaly < b.anomaly) {
          return 1;
        }
        if (a.anomaly > b.anomaly) {
          return -1;
        }
        return 0;
      });

      this.stats.anomalies = anomalies.length;
      this.stats.anomalies_pct = Math.round(anomalies.length * 100 / defaults.length);

      this.stats.not_anomalies = defaults.length;
      this.stats.not_anomalies_pct = 100 - this.stats.anomalies_pct;

      this.predicts = response.results;
      this.actGroupsAnomaly = anomalies;
      this.acts = response.acts;
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
    return this.router.navigate(['/i-act', item.id, instance]);
  }

  download(item: Act) {
    window.location.href = this.apiService.API_URL + '/solutions/1_instance/' + item.solution;
  }

  getIcon(icon: string) {
    return '/assets/images/results/' + icon + '.svg';
  }

  getAnomalyColor(anomaly: number) {
    if (anomaly == 2) {
      return 'yellow';
    }
    if (anomaly === 3) {
      return 'orange';
    }
    if (anomaly === 9) {
      return 'red';
    }
  }

  openActs(id: number) {
    let acts = this.acts.filter(a => a.result.id === id);
    console.log(acts);
    this.dialog.open(ActsDialogComponent, {
      autoFocus: false,
      width: '1000px',
      data: {
        acts: acts
      }
    });
  }

}
