import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from './user';
import { environment } from 'src/environments/environment';
import { Email } from './email';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public sendEmail(email:Email):Observable<any>{
    return this.http.post(`${this.apiServerUrl}/user/email`,email);
  }

  public getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.apiServerUrl}/user/all`);
  }

  public addUser(user: User): Observable<User>{
      return this.http.post<User>(`${this.apiServerUrl}/user/add`, user);
  }

  public findUser(email: User){
    return this.http.get<User>(`${this.apiServerUrl}/user/find/${email}`);
  }

  public updatePassword(email: string, pass: string): Observable<User>{
    return this.http.put<User>(`${this.apiServerUrl}/user/updatePassword/${email}/${pass}`, pass);
  }

  public updatePacient(email: string, doctor_id_upd: number): Observable<User>{
    return this.http.put<User>(`${this.apiServerUrl}/user/updatePacient/${email}/${doctor_id_upd}`, doctor_id_upd);
  }

  public deleteUser(email: string): Observable<void>{
      return this.http.delete<void>(`${this.apiServerUrl}/user/delete/${email}`);
  }
}
