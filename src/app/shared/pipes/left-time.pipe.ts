import {Pipe, PipeTransform} from '@angular/core';
import {ProviderService} from '../services/provider.service';

@Pipe({
  name: 'leftTime'
})
export class LeftTimePipe implements PipeTransform {

  transform(start: any, format: string): any {
    if (format === 'day') {
      const oneDay = 24 * 60 * 60 * 1000;
      const firstDate = new Date();
      const secondDate = new Date(start * 1000);
      const result = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
      if (result < 1) {
        return 'Сегодня';
      }
      return result + ' ' + ProviderService.getEndOfNumber(result, ['день', 'дня', 'дней']);
    }
  }

}
