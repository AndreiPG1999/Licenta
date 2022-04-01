import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Treatment } from './treatment';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {

  private apiServerUrl = environment.apiBaseUrl;
  static treatmentService: any;
  static getPrices: any;
  constructor(private http: HttpClient) { }

  public getTreatments(): Observable<Treatment[]>{
    return this.http.get<Treatment[]>(`${this.apiServerUrl}/treatments/all`);
  }
}
