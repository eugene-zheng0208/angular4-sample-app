import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tempConverter'
})
export class TempconverterPipe implements PipeTransform {

  transform(value: any): any {
    return `${Math.round(value)+'\xB0C'}`;
  }

}
