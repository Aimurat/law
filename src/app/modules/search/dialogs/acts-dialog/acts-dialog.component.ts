import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatTableDataSource} from '@angular/material';
import {Act} from '../../models/models';
import {Router} from '@angular/router';
import {ApiService} from '../../../../shared/services/api.service';

@Component({
  selector: 'app-acts-dialog',
  templateUrl: './acts-dialog.component.html',
  styleUrls: ['./acts-dialog.component.scss']
})
export class ActsDialogComponent implements OnInit {

  public displayedColumns: string[] = [
    'act_number',
    'claimant',
    'result',
    'tools'
  ];

  public acts;

  constructor(
    private apiService: ApiService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.acts) {
      this.acts = new MatTableDataSource(data.acts);
    }
  }

  ngOnInit() {
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

}
