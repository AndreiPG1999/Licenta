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

    public findIstoricById(id:number): Observable<Istoric[]>{
        return this.http.get<Istoric[]>(`${this.apiServerUrl}/istoric/all/${id}`);
      }
    
    public findIstoricByEmail(email:string): Observable<Istoric[]>{
        return this.http.get<Istoric[]>(`${this.apiServerUrl}/istoric/find/${email}`);
    }

    public updateIdDoctor(email: string, id: number): Observable<Istoric>{
        return this.http.put<Istoric>(`${this.apiServerUrl}/istoric/updateIdDoctor/${email}/${id}`, id);
    }

    public addIstoric(istoric: Istoric): Observable<Istoric>{
        return this.http.post<Istoric>(`${this.apiServerUrl}/istoric/add`, istoric);
    }

    public deleteIstoric(email: string): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/istoric/delete/${email}`);
    }
}