import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ChartService } from './chart.service';

import 'chartjs-adapter-date-fns';
Chart.register(...registerables);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public chartData: any[];
  public labelData: any[];
  public realData: any[];
  public colorData: any[];

  public filter: any;
  public chart: any;
  public month: any;
  public year: any;
  constructor(private chartService: ChartService) {
    this.chartData = [];
    this.labelData = [];
    this.realData = [];
    this.colorData = [];
  }

  ngOnInit(): void {
    this.chartService.getBarChartInfo().subscribe((res: any) => {
      this.chartData = res;
      if (this.chartData != null) {
        for (let i = 0; i < this.chartData.length; i++) {
          this.labelData.push(this.chartData[i].blabel);
          this.realData.push(this.chartData[i].value);
        }
        this.renderBarChart(this.labelData, this.realData);
      }
    });

    // this.chartService.getDoughnutChartInfo().subscribe((res: any) => {
    //   this.chartData = res;
    //   if (this.chartData != null) {
    //     for (let i = 0; i < this.chartData.length; i++) {
    //       // console.log(this.chartData[i]);
    //       this.labelData.push(this.chartData[i].dlabel);
    //       this.realData.push(this.chartData[i].value);
    //       this.colorData.push(this.chartData[i].color);
    //     }
    //     this.renderDoughnutChart(this.labelData, this.realData, this.colorData);
    //   }
    // });
  }

  /**
   * renderBarChart method to render the bar chart.
   * @param labelData
   * @param mainData
   */
  public renderBarChart(labelData: any, mainData: any) {
    this.month = [
      { x: Date.parse('2022-08-01 00:00:00 GMT+0530'), y: 100 },
      { x: Date.parse('2022-09-01 00:00:00 GMT+0530'), y: 457 },
      { x: Date.parse('2022-10-01 00:00:00 GMT+0530'), y: 654 },
      { x: Date.parse('2022-11-01 00:00:00 GMT+0530'), y: 233 },
      { x: Date.parse('2022-12-01 00:00:00 GMT+0530'), y: 800 },
    ];

    this.year = [
      { x: Date.parse('2025-11-07 00:00:00 GMT+0530'), y: 400 },
      { x: Date.parse('2026-11-14 00:00:00 GMT+0530'), y: 300 },
      { x: Date.parse('2027-11-21 00:00:00 GMT+0530'), y: 233 },
      { x: Date.parse('2028-11-28 00:00:00 GMT+0530'), y: 900 },
    ];

    this.chart = new Chart('barChart', {
      type: 'bar',
      data: {
        // labels: labelData,
        datasets: [
          {
            data: this.month,
            borderWidth: 1,
            barThickness: 10,
            borderRadius: 50,
            backgroundColor: 'rgba(37, 171, 221, 1)',
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 1000,
            ticks: {
              stepSize: 200,
            },
            border: {
              dash: [8],
            },
          },
          x: {
            type: 'time',
            time: {
              unit: 'month',
            },
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }

  /**
   * timeFrame method to get the chart as per the option selected from the dropdown. i.e: Monthly or Yearly
   */
  public timeFrame() {
    if (this.filter == 'month') {
      this.chart.config.options.scales.x.time.unit = this.filter;
      this.chart.config.data.datasets[0].data = this.month;
    }
    if (this.filter == 'year') {
      this.chart.config.options.scales.x.time.unit = this.filter;
      this.chart.config.data.datasets[0].data = this.year;
    }
    this.chart.update();
  }

  /**
   * RenderDoughnutChart method to render the doughnut chart.
   * @param labelData
   * @param mainData
   * @param colorData
   */
  public renderDoughnutChart(labelData: any, mainData: any, colorData: any) {
    const counter = {
      id: 'counter',
      beforeDraw(chart: any, args: any, options: any) {
        const {
          ctx,
          chartArea: { top, right, bottom, left, width, height },
        } = chart;
        ctx?.save();

        const yCenter = height / 2 + top;
        const xCenter = width / 2;
        ctx.textAlign = 'center';
        ctx.font = '60px sans-serif';
        ctx.fillStyle = 'red';
        ctx?.fillText(
          mainData.reduce((a: number, b: number) => a + b, 0),
          xCenter,
          yCenter
        );
      },
    };

    const myChart = new Chart('doughnutChart', {
      type: 'doughnut',
      data: {
        labels: labelData,
        datasets: [
          {
            data: mainData,
            borderWidth: 1,
            backgroundColor: colorData,
            hoverOffset: 50,
          },
        ],
      },
      options: {
        responsive: true,
        cutout: '90%',
        plugins: {
          tooltip: {
            enabled: false,
          },
          legend: {
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
            },
          },
        },
      },
      plugins: [counter],
    });
  }
}
