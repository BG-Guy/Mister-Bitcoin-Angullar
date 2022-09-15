import { Component, OnInit } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { BitcoinService } from 'src/app/services/bitcoin.service';
import { ContactService } from 'src/app/services/contact.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.scss']
})
export class StatisticsPageComponent implements OnInit {

  newMarketData: Array<Array<any>>
  marketTableTitle: string
  userTransactions: Array<any>
  bitcoinSubscription: Subscription
  rate: number
  currMonth: number
  slideCount: number
  

  constructor(private bitcoinService: BitcoinService, private userService: UserService, private contactService: ContactService) { }

  ngOnInit(): void {
    this.getBitcoinRate()
    this.bitcoinService.getMarketPrice()
      .subscribe(result => this.filterMarketData(result));
    // this.bitcoinService.getConfirmedTransactions()
    //   .subscribe(result => this.filterTransactionsData(result));
    //   this.currMonth = new Date().getMonth()
    this.userService.getUser().subscribe(result => this.formatTransactions(result))
      this.slideCount = 0
  }

  filterMarketData(result): void {
    this.newMarketData = this._filterData(result);
    this.marketTableTitle = result.name + ' - ' + result.description;
  }

  formatTransactions(res) {
    const formattedTransactions = res.transactions.map((trans) => {
      return trans
  
    })
    console.log("🚀 ~ file: statistics-page.component.ts ~ line 49 ~ StatisticsPageComponent ~ formattedTransactions ~ formattedTransactions", formattedTransactions)
    this.userTransactions = formattedTransactions
  }

  _filterData(result) {
    return result.values.map(value => {
      const options = { year: '21', month: '11', day: '11' };
      let date = new Date(value.x * 1000)
      // .toLocaleDateString(undefined, options);
      let bitCoinRate = value.y;
      return [date, bitCoinRate];
    })
  }

  getBitcoinRate() {
    this.bitcoinSubscription = this.bitcoinService.getBitCoinRate().subscribe((rate) => this.rate = +(1 / rate).toFixed(2));
  }

  formatMonth(monthToFormat: number) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[monthToFormat]
  }

  goToSlide(number: number) {
    this.slideCount = number
  }

  handleSlideCount(diff: number) {
    this.slideCount =+ diff
    if (this.slideCount > 1 || this.slideCount < 0) this.slideCount = 0
  }
}
