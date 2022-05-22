import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Acces } from "./acces";

@Injectable({
    providedIn: 'root'
})
export class AccesService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http:HttpClient){}

    public addAcces(acces: Acces): Observable<Acces>{
        return this.http.post<Acces>(`${this.apiServerUrl}/acces/add`, acces);
    }

    public findAcces(email: string){
        return this.http.get<Acces>(`${this.apiServerUrl}/acces/find/${email}`);
    }
}