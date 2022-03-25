import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Diagnostic } from "./diagnostic";

@Injectable({
    providedIn: 'root'
})
export class DiagnosticService{
    private apiServerUrl = environment.apiBaseUrl;
    static diagnosticSerivce: any;
    static getDiagnostics: any;
    constructor(private http: HttpClient){}

    public getDiagnostics(): Observable<Diagnostic[]>{
        return this.http.get<Diagnostic[]>(`${this.apiServerUrl}/diagnostic/all`)
    }
}