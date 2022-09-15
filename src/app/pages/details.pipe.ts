import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'details'
})
export class DetailsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
