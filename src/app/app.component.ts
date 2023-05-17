import { Component } from '@angular/core';
import { ChartService, DataService } from './services/chartData.service';
import { SalesDataService } from './services/sales-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'guitarApp';
  daterange: any;
  constructor(
    private salesData: SalesDataService,
    private chartData: ChartService
  ) {}
}
