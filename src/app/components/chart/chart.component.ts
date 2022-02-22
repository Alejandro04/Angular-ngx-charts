import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartService } from '../../services/chart.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {

  // Chart procceses:
  // First: create an variable chartDataFront for the view
  // After: the chartDataFront variable, should be create again like static variable
  // on tansFormData function
  // After: implement Object.assign function to chartDatFront
  chartDataFront: any[] = [];
  view: number[] = [1000000000];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Population';
  timeline: boolean = true;
  public dataInactive: boolean = false;
  public chartData: any[] = [
    {
      "name": "dataPoints", 
      "series": []
    }
  ];

  constructor(private service: ChartService,) {
   //
  }

  ngOnInit() {
    this.getData();
  }

  public getData() {
    this.dataInactive = true;
    this.service.getData().pipe(take(1)).subscribe((data: any) => {
      this.transformData(data);
    });
  }

  public transformData(data: any) {
    data.dataPoints.forEach((element: { value: any; timeStamp: any; }) => {
      this.chartData[0].series.push({
        value: element.value,
        name: element.timeStamp
      })
    });

    let chartDataFront = this.chartData
    Object.assign(this, { chartDataFront });
    this.dataInactive = false;
  }

  onSelect(event: any) {
    console.log(event);
  }
}