import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Radiografie } from "./radiografie";

@Injectable({
    providedIn: 'root'
})
export class RadiografieService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http:HttpClient){}

    public addRadiografie(uploadImageData:FormData, email:string, id:number): Observable<Radiografie>{
        return this.http.post<Radiografie>(`${this.apiServerUrl}/radiografie/upload/${email}/${id}`, uploadImageData);
    }

    public getRadiografie(name :string): Observable<Radiografie>{
        return this.http.get<Radiografie>(`${this.apiServerUrl}/radiografie/get/${name}`);
    }

    public getAll(): Observable<Radiografie[]>{
        return this.http.get<Radiografie[]>(`${this.apiServerUrl}/radiografie/all`);
    }
}