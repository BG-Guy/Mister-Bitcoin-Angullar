import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class BitcoinService {

  constructor(private http: HttpClient) { }

  getBitCoinRate() {
    return this.http.get<number>(`https://blockchain.info/tobtc?currency=USD&value=1`);
  }

  getMarketPrice() {
    return this.http.get<any>(`https://api.blockchain.info/charts/market-price?timespan=2months&format=json&cors=true`);
  }

  getConfirmedTransactions() {
    return this.http.get<any>(`https://api.blockchain.info/charts/n-transactions?timespan=2months&format=json&cors=true`);
  }
}