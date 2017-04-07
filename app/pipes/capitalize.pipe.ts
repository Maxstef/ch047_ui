import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'capitalize'})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    if(value[0] != 'undefined'){
        let firtsLetter = value[0].toUpperCase();
        if(value[1] != 'undefined'){
            let letters = value. substring(1);
            return firtsLetter + letters;
        } else {
            return firtsLetter;
        }
    } else {
        return value;
    }
  }
}