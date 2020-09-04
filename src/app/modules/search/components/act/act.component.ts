import {Component, OnInit} from '@angular/core';
import {Act} from '../../models/models';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-act',
  templateUrl: './act.component.html',
  styleUrls: ['./act.component.scss']
})
export class ActComponent implements OnInit {

  public act: Act;
  public isLoaded: boolean;
  public instance: string;


  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id && params.instance) {
        this.instance = params.instance;
        this.loadData(params.id, params.instance);
      }
    });
  }

  loadData(id: number, instance: string) {
    this.isLoaded = false;
    this.dataService.getAct(id, instance).subscribe(response => {
      if (response) {
        this.act = response;
        this.act.depersonalized_text = this.act.depersonalized_text.replace(/(?:\r\n|\r|\n)/g, '<br>');;
        this.isLoaded = true;
      }
    });
  }

  getClass(instance: string) {
    if (this.instance === instance) {
      return 'active';
    }
  }

  getResult(instance: string) {
    let result = {
      icon: null,
      name: null,
    };
    if (this.instance === 'cassations') {
      switch (instance) {
        case 'cassations':
          result = this.isFilledResult(this.act);
          break;
        case 'appeals':
          result = this.isFilledResult(this.act.appeal);
          break;
        case 'first_instances':
          result = this.isFilledResult(this.act.first_instance);
          break;
      }
    } else if (this.instance === 'appeals') {
      switch (instance) {
        case 'cassations':
          result = this.isFilledResult(this.act.cassation);
          break;
        case 'appeals':
          result = this.isFilledResult(this.act);
          break;
        case 'first_instances':
          result = this.isFilledResult(this.act.first_instance);
          break;
      }
    } else if (this.instance === 'first_instances') {
      switch (instance) {
        case 'cassations':
          result = this.isFilledResult(this.act.cassation);
          break;
        case 'appeals':
          result = this.isFilledResult(this.act.appeal);
          break;
        case 'first_instances':
          result = this.isFilledResult(this.act);
          break;
      }
    }
    return result;
  }

  isFilledResult(obj: any) {
    if (obj !== null) {
      return obj.result;
    } else {
      return null;
    }
  }

  getIcon(instance: string) {
    let icon = 'no';
    const result = this.getResult(instance);
    if (result && result.icon == null) {
      icon = 'no';
    } else {
      icon = result ? result.icon : 'no';
    }
    return `/assets/images/results/${icon}.svg`;
  }

  getName(instance: string) {
    const res = this.getResult(instance);
    if (res) {
      return res.name;
    } else {
      return '-';
    }
  }

  toInstance(instance: string) {
    if (this.act.hasOwnProperty(instance)) {
      if (this.act[instance] != null) {
        const ins = instance + 's';
        this.router.navigate(['/act', this.act[instance].id, ins]);
      }
    }
  }

  dePersonalize() {
    this.dataService.dePersonalize(this.instance, this.act.id).subscribe(response => {
      this.act.depersonalized_text = response['text'];
    });
  }

}
