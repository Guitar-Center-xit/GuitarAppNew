import { Component, OnInit } from '@angular/core';
import { ChartService } from '../../services/chartData.service';
import { Router } from '@angular/router';
import {
  faSortDown,
  faSortUp,
  faCalendar,
} from '@fortawesome/free-solid-svg-icons';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { DatetimeService } from 'src/app/services/datetime.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  fullSalesData: any;
  
  showColChart: any;
  showBarChart: any;
  showPieChart: any;
  showLineChart: any;


  originalOrdersTotalToday: any;
  originalOrdersTotalTodayAbbr: any;
  currentYearTotal: any;
  currentYearTotalAbbr: any;
  pickedYearTotal: any;
  pickedYearTotalAbbr: any;
  percentChange: any;

  faSortDown = faSortDown;
  faSortUp = faSortUp;
  faCalendar = faCalendar;

  yearData: any = [];
  dataRows = [];

  loading = false;

  selectedYear = '';
  selectedMonth = '';
  selectedDay = '';
  loader = false;

  showChangeModal = false;
  selectCompareYear: any;

  yearList = [];
  monthList: {
    monthNumber: number;
    monthName: string;
  }[] = [];
  dayList = [];
  hourList = [];

  customGoal = 0;
  customGoalAbbr = Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(this.customGoal);
  customGoalProgress: any;

  isEditable: boolean = false;

  customDate = new Date();
  model: any = null;
  todaysDate = moment(new Date()).format('YYYY-MM-DD');
  fullDate: any = moment(new Date()).format('YYYY-MM-DD');

  globalFromDate: NgbDate;
  globalToDate: NgbDate | null = null;

  currentRange: any;

  // onRangeSelect(range: any) {
  //   this.chartData.booleanSubject.next(true);
  //   this.loader = true;

  //   this.currentRange = range;
  //   if (range === '1m') {
  //     const startDate = moment()
  //       .subtract(1, 'months')
  //       .format('YYYY-MM-DD HH:mm');
  //     const endDate = moment().format('YYYY-MM-DD HH:mm');

  //     this.chartData.getOrderTotalByDayRange(startDate, endDate).subscribe({
  //       next: (resp: any) => {
  //         this.originalOrdersTotalToday = resp.totalAmount;
  //         this.originalOrdersTotalTodayAbbr = Intl.NumberFormat('en-US', {
  //           notation: 'compact',
  //           compactDisplay: 'short',
  //         }).format(this.originalOrdersTotalToday);
  //         this.customGoalProgress =
  //           ((this.originalOrdersTotalToday / this.customGoal) * 100).toFixed(
  //             1
  //           ) + '%';
  //         let dayData: any = [];
  //         this.dayList = resp.data.map((item: any) => item.day);
  //         resp.data.forEach((item: IDay) => {
  //           const itemData = [item.day, item.total];
  //           dayData.push(itemData);
  //         });
  //         this.chartData.dataArray.next(dayData);
  //       },
  //     });
  //     this.fullDate = 'Last 1 Month';
  //   } else if (
  //     range === '2h' ||
  //     range === '6h' ||
  //     range === '12h' ||
  //     range === '1d'
  //   ) {
  //     let startDate = '';
  //     let endDate = '';
  //     if (range === '2h') {
  //       startDate = moment().subtract(2, 'hours').format('YYYY-MM-DD HH:mm');
  //       endDate = moment().format('YYYY-MM-DD HH:mm');
  //       this.fullDate = 'Last 2 Hours';
  //     } else if (range === '6h') {
  //       startDate = moment().subtract(6, 'hours').format('YYYY-MM-DD HH:mm');
  //       endDate = moment().format('YYYY-MM-DD HH:mm');
  //       this.fullDate = 'Last 6 Hours';
  //     } else if (range === '12h') {
  //       startDate = moment().subtract(12, 'hours').format('YYYY-MM-DD HH:mm');
  //       endDate = moment().format('YYYY-MM-DD HH:mm');
  //       this.fullDate = 'Last 12 Hours';
  //     } else if (range === '1d') {
  //       startDate = moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm');
  //       endDate = moment().format('YYYY-MM-DD HH:mm');
  //       this.fullDate = 'Last 24 Hours';
  //     }
  //     this.chartData.getOrderTotalByHourRange(startDate, endDate).subscribe({
  //       next: (resp: any) => {
  //         this.originalOrdersTotalToday = resp.totalAmount;
  //         this.originalOrdersTotalTodayAbbr = Intl.NumberFormat('en-US', {
  //           notation: 'compact',
  //           compactDisplay: 'short',
  //         }).format(this.originalOrdersTotalToday);
  //         this.customGoalProgress =
  //           ((this.originalOrdersTotalToday / this.customGoal) * 100).toFixed(
  //             1
  //           ) + '%';
  //         let hourData: any = [];
  //         this.hourList = resp.data.map((item: any) => item.hour);
  //         resp.data.forEach((item: IHour) => {
  //           const itemData = [item.hour, item.total];
  //           hourData.push(itemData);
  //         });
  //         this.chartData.dataArray.next(hourData);
  //       },
  //     });
  //   } else if (range === '6m') {
  //     const startDate = moment()
  //       .subtract(6, 'months')
  //       .format('YYYY-MM-DD HH:mm');
  //     const endDate = moment().format('YYYY-MM-DD HH:mm');

  //     this.chartData.getOrderTotalByMonthRange(startDate, endDate).subscribe({
  //       next: (resp: any) => {
  //         this.originalOrdersTotalToday = resp.totalAmount;
  //         this.originalOrdersTotalTodayAbbr = Intl.NumberFormat('en-US', {
  //           notation: 'compact',
  //           compactDisplay: 'short',
  //         }).format(this.originalOrdersTotalToday);
  //         this.customGoalProgress =
  //           ((this.originalOrdersTotalToday / this.customGoal) * 100).toFixed(
  //             1
  //           ) + '%';
  //         let monthData: any = [];
  //         this.monthList = resp.data.map((item: any) => item.month);
  //         resp.data.forEach((item: IMonth) => {
  //           const itemData = [item.month, item.total];
  //           monthData.push(itemData);
  //         });
  //         this.chartData.dataArray.next(monthData);
  //       },
  //     });
  //     this.fullDate = 'Last 6 Months';
  //   } else if (range === '1y') {
  //     const startDate = moment()
  //       .subtract(12, 'months')
  //       .format('YYYY-MM-DD HH:mm');
  //     const endDate = moment().format('YYYY-MM-DD HH:mm');

  //     this.chartData.getOrderTotalByMonthRange(startDate, endDate).subscribe({
  //       next: (resp: any) => {
  //         this.originalOrdersTotalToday = resp.totalAmount;
  //         this.originalOrdersTotalTodayAbbr = Intl.NumberFormat('en-US', {
  //           notation: 'compact',
  //           compactDisplay: 'short',
  //         }).format(this.originalOrdersTotalToday);
  //         this.customGoalProgress =
  //           ((this.originalOrdersTotalToday / this.customGoal) * 100).toFixed(
  //             1
  //           ) + '%';
  //         let monthData: any = [];
  //         this.monthList = resp.data.map((item: any) => item.month);
  //         resp.data.forEach((item: IMonth) => {
  //           const itemData = [item.month, item.total];
  //           monthData.push(itemData);
  //         });
  //         this.chartData.dataArray.next(monthData);
  //       },
  //     });
  //     this.fullDate = 'Last 1 Year';
  //   }
  //   this.loader = false;
  // }
  onRangeSelect(range: any) {
    console.log('Range Selected', range);
    this.chartData.selectedRange.next(range);
    this.chartData.booleanSubject.next(true);
    this.loader = true;

    this.currentRange = range;
    if (range === '1m') {
      const startDate = moment('2023-05-01 16:28:21')
        .subtract(1, 'months')
        .format('YYYY-MM-DD HH:mm');
      const endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
      this.chartData
        .getFullSalesDataByRange(startDate, endDate, 1440 * 60)
        .subscribe({
          next: (resp: any) => {
            console.log('ABC', Object.values(resp));
            this.fullSalesData = Object.values(resp);
          },
        });
      this.fullDate = 'Last 1 Month';
    } else if (range === '2h' || range === '6h') {
      let startDate = '';
      let endDate = '';
      if (range === '2h') {
        startDate = moment('2023-05-01 16:28:21')
          .subtract(2, 'hours')
          .format('YYYY-MM-DD HH:mm');
        endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
        this.fullDate = 'Last 2 Hours';
      } else if (range === '6h') {
        startDate = moment('2023-05-01 16:28:21')
          .subtract(6, 'hours')
          .format('YYYY-MM-DD HH:mm');
        endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
        this.fullDate = 'Last 6 Hours';
      }
      this.chartData
        .getFullSalesDataByRange(startDate, endDate, 15 * 60)
        .subscribe({
          next: (resp: any) => {
            console.log('ABC', Object.values(resp));
            this.fullSalesData = Object.values(resp);
          },
        });
    } else if (range === '12h' || range === '1d') {
      let startDate = '';
      let endDate = '';
      if (range === '12h') {
        startDate = moment('2023-05-01 16:28:21')
          .subtract(12, 'hours')
          .format('YYYY-MM-DD HH:mm');
        endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
        this.fullDate = 'Last 12 Hours';
      } else if (range === '1d') {
        startDate = moment('2023-05-01 16:28:21')
          .subtract(1, 'days')
          .format('YYYY-MM-DD HH:mm');
        endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
        this.fullDate = 'Last 24 Hours';
      }
      this.chartData
        .getFullSalesDataByRange(startDate, endDate, 60 * 60)
        .subscribe({
          next: (resp: any) => {
            console.log('ABC', Object.values(resp));
            this.fullSalesData = Object.values(resp);
          },
        });
    } else if (range === '6m') {
      const startDate = moment('2023-05-01 16:28:21')
        .subtract(6, 'months')
        .format('YYYY-MM-DD HH:mm');
      const endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');

      this.chartData
        .getFullSalesDataByRange(startDate, endDate, 172800)
        .subscribe({
          next: (resp: any) => {
            console.log('ABC', Object.values(resp));
            this.fullSalesData = Object.values(resp);
          },
        });
      this.fullDate = 'Last 6 Months';
    } else if (range === '1y') {
      const startDate = moment('2023-05-01 16:28:21')
        .subtract(12, 'months')
        .format('YYYY-MM-DD HH:mm');
      const endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');

      this.chartData
        .getFullSalesDataByRange(startDate, endDate, 172800)
        .subscribe({
          next: (resp: any) => {
            console.log('ABC', Object.values(resp));
            this.fullSalesData = Object.values(resp);
          },
        });
      this.fullDate = 'Last 1 Year';
    }
    this.loader = false;
  }

  makeEditable() {
    this.isEditable = true;
  }
  constructor(
    private chartData: ChartService,
    private router: Router,
    calendar: NgbCalendar
  ) {
    this.globalFromDate = calendar.getToday();
    this.globalToDate = calendar.getToday();
  }

  onGlobalDateRangeChanged(date: NgbDate) {
    if (!this.globalFromDate && !this.globalToDate) {
      this.globalFromDate = date;
    } else if (
      this.globalFromDate &&
      !this.globalToDate &&
      date.after(this.globalFromDate)
    ) {
      this.globalToDate = date;
    } else {
      this.globalToDate = null;
      this.globalFromDate = date;
    }

    const beginDate =
      this.globalFromDate.year +
      '-' +
      this.globalFromDate.month +
      '-' +
      this.globalFromDate.day;
    const endDate = this.globalToDate
      ? this.globalToDate.year +
      '-' +
      this.globalToDate.month +
      '-' +
      this.globalToDate.day
      : null;
    if (beginDate && endDate) {
      this.fullDate =
        moment(beginDate, 'YYYY-M-DD').format('MMM DD YYYY') +
        ' , ' +
        moment(endDate, 'YYYY-M-DD').format('MMM DD YYYY');

      this.chartData.getOrderTotalByDayRange(beginDate, endDate).subscribe({
        next: (resp: any) => {
          this.originalOrdersTotalToday = resp.totalAmount;
          this.originalOrdersTotalTodayAbbr = Intl.NumberFormat('en-US', {
            notation: 'compact',
            compactDisplay: 'short',
          }).format(this.originalOrdersTotalToday);
          this.customGoalProgress =
            ((this.originalOrdersTotalToday / this.customGoal) * 100).toFixed(
              1
            ) + '%';
          let dayData: any = [];
          this.dayList = resp.data.map((item: any) => item.day);
          resp.data.forEach((item: IDay) => {
            const itemData = [item.day, item.total];
            dayData.push(itemData);
          });
          this.chartData.dataArray.next(dayData);
        },
      });
    }
  }

  onDateChanged(event: IMyDateModel) {



    const begin = event.dateRange?.beginDate;
    const end = event.dateRange?.endDate;

    const beginDate = begin
      ? begin.year + '-' + begin.month + '-' + begin.day
      : null;
    const endDate = end ? end.year + '-' + end.month + '-' + end.day : null;

    this.chartData.getOrderTotalForRange(beginDate, endDate).subscribe({
      next: (resp: any) => {
        console.log('dateChangeResp', resp);
        this.customGoal = resp[0].original_orders_total;
        this.customGoalAbbr = Intl.NumberFormat('en-US', {
          notation: 'compact',
          compactDisplay: 'short',
        }).format(this.customGoal);
        this.customGoalProgress =
          ((this.originalOrdersTotalToday / this.customGoal) * 100).toFixed(1) +
          '%';
      },
    });
  }

  makeNonEditable() {
    this.isEditable = false;
  }

  setCustomGoal(event: any) {
    this.customGoal = event.target.value;
    this.customGoalAbbr = Intl.NumberFormat('en-US', {
      notation: 'compact',
      compactDisplay: 'short',
    }).format(this.customGoal);
    this.customGoalProgress =
      ((this.originalOrdersTotalToday / this.customGoal) * 100).toFixed(1) +
      '%';
  }

  toggleChangeModal() {
    this.showChangeModal = !this.showChangeModal;
    console.log('showChangeModal', this.showChangeModal);
  }

  onSelectCompareYearChange(event: any) {
    this.selectCompareYear = event.target.value;
    console.log('selectCompareYear', this.selectCompareYear);
  }

  ngOnInit(): void {
    let rangeAlreadySelected;
    this.chartData.booleanSubject.next(false);
    this.chartData.selectedRange.subscribe(selectedRange => {
      console.log('selected range Dashboard', selectedRange)
      rangeAlreadySelected = selectedRange;
    })

    this.chartData
    .getFullSalesData('2023-01-01 00:00:20', '2023-01-01 23:59:00', 900)
    .subscribe({
      next: (resp: any) => {
        this.fullSalesData = Object.values(resp);
      },
    });
    // to show or hide chart on dashboard

    this.chartData.colChartPinToDB.subscribe(pinToDB => {
      console.log('DB_PintoDB_Col', pinToDB)
      this.showColChart = pinToDB;
    })
    this.chartData.barChartPinToDB.subscribe(pinToDB => {
      console.log('DB_PintoDB_Bar', pinToDB)
      this.showBarChart = pinToDB;
    })
    this.chartData.pieChartPinToDB.subscribe(pinToDB => {
      console.log('DB_PintoDB_Pie', pinToDB)
      this.showPieChart = pinToDB;
    })
    this.chartData.lineChartPinToDB.subscribe(pinToDB => {
      console.log('DB_PintoDB_Line', pinToDB)
      this.showLineChart = pinToDB;
    })

    this.chartData.selectedRange.subscribe(selectedRange => {
      console.log('selected range Dashboard', selectedRange)
      rangeAlreadySelected = selectedRange;
    })
    
    if (rangeAlreadySelected) {
      this.onRangeSelect(rangeAlreadySelected);
    } else {



      this.chartData.getOrderTotalForRange('2023-01-31', '2023-01-31').subscribe({
        next: (resp: any) => {
          console.log('dateChangeResp', resp);
          this.originalOrdersTotalToday = resp[0].original_orders_total;
          this.originalOrdersTotalTodayAbbr = Intl.NumberFormat('en-US', {
            notation: 'compact',
            compactDisplay: 'short',
          }).format(this.originalOrdersTotalToday);
          this.customGoalProgress =
            ((this.originalOrdersTotalToday / this.customGoal) * 100).toFixed(1) +
            '%';
        },
      });

      this.chartData.getOrderTotalForRange('2023-01-30', '2023-01-30').subscribe({
        next: (resp: any) => {
          console.log('dateChangeResp', resp);
          this.customGoal = resp[0].original_orders_total;
          this.customGoalAbbr = Intl.NumberFormat('en-US', {
            notation: 'compact',
            compactDisplay: 'short',
          }).format(this.customGoal);
          this.customGoalProgress =
            ((this.originalOrdersTotalToday / this.customGoal) * 100).toFixed(1) +
            '%';
        },
      });

      this.chartData.getData(2023).subscribe({
        next: (resp: any) => {
          this.currentYearTotal = resp[0].original_orders_total;
          this.currentYearTotalAbbr = Intl.NumberFormat('en-US', {
            notation: 'compact',
            compactDisplay: 'short',
          }).format(this.currentYearTotal);
          this.percentChange =
            ((this.currentYearTotal - this.pickedYearTotal) /
              this.pickedYearTotal) *
            100;
        },
      });
      this.chartData.getData(2022).subscribe({
        next: (resp: any) => {
          this.pickedYearTotal = resp[0].original_orders_total;
          this.pickedYearTotalAbbr = Intl.NumberFormat('en-US', {
            notation: 'compact',
            compactDisplay: 'short',
          }).format(this.pickedYearTotal);
          this.percentChange =
            ((this.currentYearTotal - this.pickedYearTotal) /
              this.pickedYearTotal) *
            100;
        },
      });
    }
  }

  onSelectYearChange(event: any) {
    this.selectedYear = event.target.value;
    console.log('selectedYear', this.selectedYear);
    this.loader = true;

    this.chartData.getOrderTotalForYear(this.selectedYear).subscribe({
      next: (resp: any) => {
        this.yearData = [];
        console.log('Year data', resp);
        const monthNames = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ];
        this.monthList = resp.map((item: any) => {
          return {
            monthNumber: monthNames.indexOf(item.monthName) + 1,
            monthName: item.monthName,
          };
        });
        console.log('monthList', this.monthList);
        resp.forEach((item: IItem) => {
          const itemData = [item.monthName, item.total];
          this.yearData.push(itemData);
        });
        console.log('yearDATA', this.yearData);
        this.chartData.dataArray.next(this.yearData);
        this.loader = false;
      },
    });
  }

  onSelectMonthChange(event: any) {
    this.selectedMonth = event.target.value;
    console.log('selectedMonth', this.selectedMonth);

    this.loader = true;

    this.chartData
      .getOrderTotalByDay(this.selectedYear, this.selectedMonth)
      .subscribe({
        next: (resp: any) => {
          let monthData: any = [];
          console.log('month Data', resp);
          this.dayList = resp.map((item: any) => item.day);
          resp.forEach((item: IDay) => {
            const itemData = [item.day, item.total];
            monthData.push(itemData);
          });
          console.log('New month data', monthData);
          this.chartData.dataArray.next(monthData);
          this.loader = false;
        },
      });
  }

  onSelectDayChange(event: any) {
    this.selectedDay = event.target.value;
    console.log('selectedDay', this.selectedDay);
    this.loader = true;

    this.chartData
      .getOrderTotalByHour(
        this.selectedYear,
        this.selectedMonth,
        this.selectedDay
      )
      .subscribe({
        next: (resp: any) => {
          let hourData: any = [];
          console.log('hour Data', resp);
          this.hourList = resp.map((item: any) => item.hour);
          resp.forEach((item: IHour) => {
            const itemData = [item.hour, item.total];
            hourData.push(itemData);
          });
          console.log('New month data', hourData);
          this.chartData.dataArray.next(hourData);
          this.loader = false;
        },
      });
  }

  barChartOptions = {
    text: 'New Bar Chart 1',
    categories: ['2020/21', '2019/20', '2018/19', '2017/18', '2016/17'],
    series: this.yearData,
  };
}

class IItem {
  'monthName': string;
  'total': number;
}

class IDay {
  'day': string;
  'total': number;
}

class IHour {
  'hour': string;
  'total': number;
}

class IMonth {
  'month': string;
  'total': number;
}
class IYear {
  'year': string;
  'total': number;
}
