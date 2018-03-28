import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'speedConverter'
})

@Injectable()
export class SpeedConverterPipe implements PipeTransform {

  transform(value: any): any {
    let valueToMph = value  * 3.6;
    return Math.round(valueToMph);
  }

}
