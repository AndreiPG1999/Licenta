import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Appointment } from "./appointment";

@Injectable({
    providedIn: 'root'
})
export class AppointmentService{

    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getAppointments(): Observable<Appointment[]> {
        return this.http.get<Appointment[]>(`${this.apiServerUrl}/appointment/all`);
    }

    public addAppointment(appointment: Appointment): Observable<Appointment>{
        return this.http.post<Appointment>(`${this.apiServerUrl}/appointment/add`, appointment);
    }

    public deleteAppointment(id: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/appointment/delete/${id}`);
    }
}