import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class ChartService {
  private apiLink: string;

  constructor(private _http: HttpClient) {
    this.apiLink = environment.baseUrl;
  }

  /**
   * getBarChartInfo service to get the bar chart info.
   */
  public getBarChartInfo() {
    return this._http.get(`${this.apiLink}/barChart`);
  }

  /**
   * getDoughnutChartInfo service to get the doughnut chart info.
   */
  public getDoughnutChartInfo() {
    return this._http.get(`${this.apiLink}/doughnutChart`);
  }
}
