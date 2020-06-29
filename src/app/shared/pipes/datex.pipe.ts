import {Pipe, PipeTransform} from '@angular/core';
import {ProviderService} from '../services/provider.service';

@Pipe({
  name: 'datex'
})
export class DatexPipe implements PipeTransform {

  transform(value: any, regex: string): any {
    const date = new Date(value);
    const dd = date.getUTCDate();
    const MM = date.getUTCMonth();
    const month = ProviderService.months[MM];

    const yy = date.getUTCFullYear();
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();

    regex = regex.replace('dd', dd.toString());
    regex = regex.replace('MM', MM.toString());
    regex = regex.replace('month', month);
    regex = regex.replace('yy', yy.toString());
    regex = regex.replace('hh', hh.toString());
    regex = regex.replace('mi', mm.toString());

    return regex;
  }

}
