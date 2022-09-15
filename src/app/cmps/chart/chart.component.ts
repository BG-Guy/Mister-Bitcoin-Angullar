import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { GoogleChartModel } from 'src/app/models/googleChart.model';
declare var google: any;
@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {

  marketChart = new GoogleChartModel();
  transactionsChart = new GoogleChartModel();
  @Input() marketData: any = [];
  @Input() marketTableTitle: string;
  @Input() transactionsData: any = [];
  @Input() transactionsTableTitle: string;
  
  constructor() { }
  
  ngOnInit(): void {
    this.drawChart()
  }

  ngOnChanges(): void {
    this.marketChart.data = this.marketData;
    this.marketChart.title = this.marketTableTitle;
    this.transactionsChart.data = this.transactionsData;
    this.transactionsChart.title = this.transactionsTableTitle;
  }

  

  drawChart() {
    this.marketChart.data = this.marketData;
    this.marketChart.title = this.marketTableTitle;
    this.transactionsChart.data = this.transactionsData;
    this.transactionsChart.title = this.transactionsTableTitle;
    console.log("🚀 ~ file: chart.component.ts ~ line 11 ~ ChartComponent ~ marketChart", this.marketChart)

  }
}
