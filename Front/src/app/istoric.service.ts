import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Istoric } from "./istoric";

@Injectable({
    providedIn: 'root'
})
export class IstoricService{

    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getIstorics(): Observable<Istoric[]> {
        return this.http.get<Istoric[]>(`${this.apiServerUrl}/istoric/all`);
    }

    public addIstoric(istoric: Istoric): Observable<Istoric>{
        return this.http.post<Istoric>(`${this.apiServerUrl}/istoric/add`, istoric);
    }
}