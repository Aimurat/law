import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Item} from '../../models/models';
import {forkJoin, Observable} from 'rxjs';
import {DataService} from '../../services/data.service';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

  public searchKeyForm: FormGroup;
  public searchIntellectualForm: FormGroup;

  public selectedDefault: Item = {id: -1, name: ''};

  public languageDict: Item[] = [
    {id: 1, name: 'Казахский'},
    {id: 2, name: 'Русский'}
  ];

  public yearsDict: Item[] = [
    {id: 2016, name: ''},
    {id: 2017, name: ''},
    {id: 2018, name: ''}
  ];

  public textTypes = [
    {id: 1, key: 'text', name: 'Отдельно по словам'},
    {id: 2, key: 'text_phrase', name: 'Строго по последовательности'},
    {id: 3, key: 'stemed_text_phrase', name: 'По корням и по последовательности'}
  ];

  public synonyms: string[] = [];

  public checkBox = false;

  public isValid = true;
  public isValidText = true;

  public courts: Observable<Item[]>;
  public classifications: Observable<Item[]>;
  public regions: Observable<Item[]>;
  public judges: Observable<Item[]>;
  public results: Observable<Item[]>;

  public isLoaded: boolean;

  public courts$: Item[] = [];
  public classifications$: Item[] = [];
  public regions$: Item[] = [];
  public judges$: Item[] = [];
  public results$: Item[] = [];

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) {
  }

  ngOnInit() {
    forkJoin(
      this.courts = this.dataService.getCourts(),
      this.classifications = this.dataService.getClassifications(),
      this.judges = this.dataService.getJudges(),
      this.regions = this.dataService.getRegions(),
      this.results = this.dataService.getResults(),
    ).subscribe((response) => {

      this.createForm();

      this.courts$ = response[0];
      this.classifications$ = response[1];
      this.judges$ = response[2];
      this.regions$ = response[3];
      this.results$ = response[4];

      this.courts = this.searchKeyForm.controls['courts'].valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(this.courts$, value))
        );

      this.judges = this.searchKeyForm.controls['judges'].valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(this.judges$, value))
        );

      const local = localStorage.getItem('searchKeywords');
      if (local) {
        const p = JSON.parse(local);
        const params = {
          input: p.input,
          textType: this.findInResponse(this.textTypes, p.textType.id),
          classifications: this.findInResponse(this.classifications$, p.classifications.id),
          courts: this.findInResponse(this.courts$, p.courts.id),
          judges: this.findInResponse(this.judges$, p.judges.id),
          regions: this.findInResponse(this.regions$, p.regions.id),
          results: this.findInResponse(this.results$, p.results.id),
          years: this.findInResponse(this.yearsDict, p.years.id),
          language: this.findInResponse(this.languageDict, p.language.id),
          start_date: p.start_date,
          end_date: p.end_date
        };
        this.checkBox = p.is_smart;
        this.searchKeyForm.patchValue(params);
      }

      this.isLoaded = true;

    });
  }

  displayFn(item: Item): string {
    return item && item.name ? item.name : '';
  }

  private _filter(data: Item[], value: string): Item[] {
    if (typeof value == 'string') {
      const filterValue = value.toLowerCase();
      return data.filter(d => d.name.toLowerCase().includes(filterValue));
    } else {
      return data;
    }
  }

  findInResponse(data, id) {
    const item = data.find(r => r.id === id);
    return item ? item : this.selectedDefault;
  }

  createForm() {

    this.searchKeyForm = this.fb.group({
      textType: ['', Validators.required],
      input: ['', Validators.required],
      classifications: [this.selectedDefault],
      courts: [this.selectedDefault],
      judges: [this.selectedDefault],
      regions: [this.selectedDefault],
      results: [this.selectedDefault],
      years: [this.selectedDefault],
      language: [this.selectedDefault],
      start_date: [''],
      end_date: [''],
    });

    this.searchIntellectualForm = this.fb.group(
      {
        textarea: ['', Validators.required],
        start_date: [''],
        end_date: ['']
      }
    );

  }

  onSubmit() {
    if (this.searchKeyForm.invalid) {
      this.isValid = false;
      return;
    }

    let startdate, enddate;
    if (this.searchKeyForm.controls.start_date.value) {
      startdate = moment(this.searchKeyForm.controls.start_date.value).format('YYYY-MM-DD');
    }
    if (this.searchKeyForm.controls.end_date.value) {
      enddate = moment(this.searchKeyForm.controls.end_date.value).format('YYYY-MM-DD');
    }

    const obj = {
      region_id: this.isFilled(this.searchKeyForm.controls.regions.value),
      court_id: this.isFilled(this.searchKeyForm.controls.courts.value),
      classification_id: this.isFilled(this.searchKeyForm.controls.classifications.value),
      result_id: this.isFilled(this.searchKeyForm.controls.results.value),
      judge_id: this.isFilled(this.searchKeyForm.controls.judges.value),
      year: this.isFilled(this.searchKeyForm.controls.years.value),
      language_id: this.isFilled(this.searchKeyForm.controls.language.value),
      start_date: startdate,
      end_date: enddate,
      is_smart: this.checkBox
    };

    let textType = this.searchKeyForm.controls['textType'].value;
    obj[textType['key']] = this.searchKeyForm.controls.input.value;

    this.dataService.postKeywords(obj, this.searchKeyForm.value).subscribe(data => {
      this.dataService.saveResponse(data);
      return this.router.navigate(['/result']);
    });

  }

  onSubmitIntellectual() {
    if (this.searchIntellectualForm.invalid) {
      this.isValidText = false;
      return;
    }

    let startdate, enddate;
    if (this.searchKeyForm.controls.start_date.value) {
      startdate = moment(this.searchIntellectualForm.controls.start_date.value).format('YYYY-MM-DD');
    }
    if (this.searchKeyForm.controls.end_date.value) {
      enddate = moment(this.searchIntellectualForm.controls.end_date.value).format('YYYY-MM-DD');
    }

    this.dataService.postIntellectual({
      text: this.searchIntellectualForm.controls.textarea.value,
      start_date: startdate,
      end_date: enddate
    }).subscribe(data => {
      this.dataService.saveIntellectualResponse(data);
      return this.router.navigate(['/i-result']);
    });
  }

  isFilled = (value: Item) => {
    if (value.id > 0) {
      return value.id;
    }
    return;
  };

  onReset() {
    const params = {
      input: '',
      textType: null,
      classifications: this.selectedDefault,
      courts: this.selectedDefault,
      judges: this.selectedDefault,
      regions: this.selectedDefault,
      results: this.selectedDefault,
      years: this.selectedDefault,
      language: this.selectedDefault,
      start_date: '',
      end_date: ''
    };
    this.checkBox = false;
    this.searchKeyForm.patchValue(params);
  }

  changeCB() {
    if (this.checkBox && this.searchKeyForm.controls.input.value != '') {
      this.dataService.getSynonyms(this.searchKeyForm.controls.input.value).subscribe(response => {
        this.synonyms = response.synonyms.split(' ');
      });
    }
  }

}
