import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-founded-words-dialog',
  templateUrl: './founded-words-dialog.component.html',
  styleUrls: ['./founded-words-dialog.component.scss']
})
export class FoundedWordsDialogComponent implements OnInit {

  public highlights;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.highlights) {
      this.highlights = data.highlights;
    }
  }

  ngOnInit() {
  }

}
