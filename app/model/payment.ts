export interface Payment {
    id?: number,
    month: number,
    year: number,
    counterValue: number,
    prevCounterValue: number,
    sumToPay: number,
    payed: boolean,
    dateOfpayment: string,
    dateOfInput: string,
    userId: number
}