import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Formular } from "./formular";

@Injectable({
    providedIn: 'root'
})
export class FormularService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getFormulars(): Observable<Formular[]> {
        return this.http.get<Formular[]>(`${this.apiServerUrl}/formular/all`);
    }

    public addFormular(formular: Formular): Observable<Formular>{
        return this.http.post<Formular>(`${this.apiServerUrl}/formular/add`, formular);
    }

    public findFormularById(id:number) :Observable<Formular[]>{
        return this.http.get<Formular[]>(`${this.apiServerUrl}/formular/all/${id}`);
    }
    public findFormular(email: string){
        return this.http.get<Formular>(`${this.apiServerUrl}/formular/find/${email}`);
    }

    public updateIdDoctor(email: string, id: number): Observable<Formular>{
        return this.http.put<Formular>(`${this.apiServerUrl}/formular/updateIdDoctor/${email}/${id}`, id);
    }

    public deleteFormular(email: string): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/formular/delete/${email}`);
    }
}