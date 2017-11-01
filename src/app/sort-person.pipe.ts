import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortPerson'
})
export class SortPersonPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    console.log(value);

    return value.sort( (a, b) => (a.firstName < b.firstName) ? 1 : (a.firstName == b.firstName) ? 0 : -1);
  }

}
