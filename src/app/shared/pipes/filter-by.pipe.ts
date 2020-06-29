import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filterBy',
  pure: false
})
export class FilterByPipe implements PipeTransform {

  transform(items: any[], param: string, value: string): any {
    if (!items || !value) {
      return items;
    }
    return items.filter(item => item[param].indexOf(value) !== -1);
  }

}
