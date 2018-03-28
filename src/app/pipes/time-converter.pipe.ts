import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeConverter'
})
export class TimeConverterPipe implements PipeTransform {

  transform(value: any): any {
    let date  = new Date(value);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    let modMinutes = minutes < 10 ? '0'+minutes : minutes;
    let strTime = hours + ':' + modMinutes + ' ' + ampm;
    return strTime.toString();
  }

}
