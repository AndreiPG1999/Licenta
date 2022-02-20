import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Prices } from './prices';

@Injectable({
  providedIn: 'root'
})
export class PricesService {

  private apiServerUrl = environment.apiBaseUrl;
  static pricesService: any;
  static getPrices: any;
  constructor(private http: HttpClient) { }

  public getPrices(): Observable<Prices[]>{
    return this.http.get<Prices[]>(`${this.apiServerUrl}/prices/all`);
  }
}
