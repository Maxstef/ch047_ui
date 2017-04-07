import {Injectable} from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/uk';

@Injectable()

export class DateService {
    diffDays: number = -15;
    getTodayDate(): string{
        return moment().format();
    }
    getDateToRenew(){
        return moment().set({'year': moment().get('year'), 'month': moment().get('month') - 1, date: 15});
    }
    getPeriodToRenew(){
        return moment().set({'year': moment().get('year'), 'month': moment().get('month') - 1, date: 15}).format('MMMM, YYYY');
    }
    getPeriod(month: number, year: number){
        return this.getMonthByNumber(month) + ', ' + year;
    }
    getMonthByNumber(number: number){
        return moment().set({'month': number - 1}).format('MMMM');
    }
    getMonth(date?: any): number{
        if(typeof date == 'undefined'){
            return moment().get('month') + 1;
        } else {
            return date.get('month') + 1;
        }
    }
    getYear(date?: any): number{
        if(typeof date == 'undefined'){
            return moment().get('year');
        } else {
            return date.get('year');
        }
    }
    displayDate(date: any): string{
        return moment().set({'year': date.substring(0,4), 'month': date.substring(5,7) - 1, 'date': date.substring(8,10)}).format('DD/MM/YYYY');
    }

}