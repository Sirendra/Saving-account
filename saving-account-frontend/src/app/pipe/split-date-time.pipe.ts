import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitDateTime',
  standalone:false
})
export class SplitDateTimePipe implements PipeTransform {

  transform(value: string, type: 'date' | 'time'): string {
    if (!value) return '';

    const dateObj = new Date(value);

    if (type === 'date') {
      return dateObj.toLocaleDateString();  // Formats date
    } else if (type === 'time') {
      return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });  // Formats time
    }

    return '';
  }

}
