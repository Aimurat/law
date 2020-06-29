import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {

  transform(bytes: number): any {
    const kb = bytes / 1024;
    if (kb >= 1024) {
      return Math.round(kb / 1024) + ' Мб';
    }
    return Math.round(kb) + ' Кб';
  }

}
