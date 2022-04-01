import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Dinte } from "./dinte";

@Injectable({
    providedIn: 'root'
})
export class DinteService{
    private apiServerUrl = environment.apiBaseUrl;
    static dinteService: any;
    static getDinti: any;
    constructor(private http: HttpClient){}

    public getDinti(): Observable<Dinte[]>{
        return this.http.get<Dinte[]>(`${this.apiServerUrl}/dinte/all`)
    }
}