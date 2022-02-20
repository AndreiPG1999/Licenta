import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http:HttpClient, private router:Router){

  }

  login(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiBaseUrl}/user/login`, user);
    
  }

  logout() {
    this.router.navigate(['/login']);
  }

}


