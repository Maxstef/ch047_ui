import {TariffRange} from './tariff-range';

export interface Tariff {
    changePointUnit: string,
    valueUnit: string,
    tariffs: Array<TariffRange>
}