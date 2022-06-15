import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccesService } from '../acces.service';
import { AppointmentService } from '../appointment.service';
import { FormularService } from '../formular.service';
import { IstoricService } from '../istoric.service';
import { RadiografieService } from '../radiografie.service';
import { TokenStorageService } from '../token-storage.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-pacienti',
  templateUrl: './pacienti.component.html',
  styleUrls: ['./pacienti.component.css']
})
export class PacientiComponent implements OnInit {

  public users!: User[];
  currentUser!: any;
  loggedInUser!: any;
  neededUsers !: User[];
  constructor(private radiografieService: RadiografieService, private accesService:AccesService, private userService:UserService, private token:TokenStorageService, private appointmentService:AppointmentService, private istoricService:IstoricService, private formularService:FormularService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.userService.findUser(this.currentUser.email).subscribe({
      next:(response: User) => {
        this.loggedInUser = response;
        console.log(this.loggedInUser);
        this.getUsers();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public getUsers(): void {
    this.userService.findUsersByTypePacienti(this.loggedInUser.id).subscribe({
      next:(response: User[]) => {
        this.neededUsers = response;
        console.log(this.neededUsers);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public searchUsers(key: string) : void{
    const results: User[] = [];
    for(const neededUser of this.neededUsers){
      if(neededUser.last_name.toLowerCase().indexOf(key.toLowerCase()) !== -1 || 
      neededUser.first_name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      neededUser.email.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(neededUser);
      }
    }
    this.neededUsers = results;
    if(!key){
      this.getUsers();
    }
  }

  public onUnasignPacient(user:User){
    if(confirm("Sunteți sigur că doriți să renunțați la acest pacient?")){
      this.userService.updatePacient(user.email,0).subscribe({
        next: (response: User) => {
          console.log(response);
          window.location.reload();
          this.updateIdFormular(user);
          this.updateIdIstoric(user);
          this.updateIdAppointment(user);
          this.updateIdAcces(user);
          this.updateIdRadiografie(user);
        },
        error: (error:HttpErrorResponse) => {
          alert(error.message);
        }
      });
    }
  }
  public onDeletePacient(user:User){
    if(confirm("Sigur doriți să ștergeți contul acestui pacient?")){
      this.userService.deleteUser(user.email).subscribe({
        next: async () => {
          await new Promise(f => setTimeout(f, 2000));
          window.location.reload();
          this.deleteFormular(user);
          this.deleteIstoric(user);
          this.deleteAcces(user);
          this.deleteRadiografie(user);
        },
        error: (error:HttpErrorResponse) => {
          alert(error.message);
        }
      });
    }
  }

  public updateIdFormular(user:User): void{
    this.formularService.updateIdDoctor(user.email, 0).subscribe({
    });
  }

  public updateIdIstoric(user:User): void{
    this.istoricService.updateIdDoctor(user.email, 0).subscribe({
    });
  }

  public updateIdAppointment(user:User): void{
    this.appointmentService.updateIdDoctor(user.email, 0).subscribe({
    });
  }

  public updateIdAcces(user:User): void{
    this.accesService.updateIdDoctor(user.email, 0).subscribe({
    });
  }
  public updateIdRadiografie(user:User): void{
    this.radiografieService.updateIdDoctor(user.email, 0).subscribe({
    });
  }

  public deleteFormular(user:User){
    this.formularService.deleteFormular(user.email).subscribe({
    });
  }
  public deleteIstoric(user:User){
    this.istoricService.deleteIstoric(user.email).subscribe({
    });
  }

  public deleteAcces(user:User){
    this.accesService.deleteAcces(user.email).subscribe({
    });
  }
  public deleteRadiografie(user:User){
    this.radiografieService.deleteRadiografiiByEmail(user.email).subscribe({
    });
  }
}
