import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-synonyms-dialog',
  templateUrl: './synonyms-dialog.component.html',
  styleUrls: ['./synonyms-dialog.component.scss']
})
export class SynonymsDialogComponent implements OnInit {

  public words;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.words) {
      this.words = data.words;
    }
  }

  ngOnInit() {
  }

}
