import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { TokenStorageService } from '../token-storage.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-pacient',
  templateUrl: './add-pacient.component.html',
  styleUrls: ['./add-pacient.component.css']
})
export class AddPacientComponent implements OnInit {

  public users!: User[];
  currentUser!: any;
  loggedInUser!: any;
  public neededUsers !: User[];

  constructor(private userService:UserService, private notifyService:NotificationService, private token:TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.userService.findUser(this.currentUser.email).subscribe({
      next:(response: User) => {
        this.loggedInUser = response;
        console.log(this.loggedInUser);
        
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
    this.getUsers();
  }

  public getUsers(): void {
    this.userService.getUsers().subscribe({
      next:(response: User[]) => {
        this.users = response;
        console.log(this.users);
        this.userService.findUsersByType().subscribe({
          next:(response: User[]) => {
            this.neededUsers = response;
            console.log(this.neededUsers);
          },
          error: (error: HttpErrorResponse) => {
            alert(error.message);
          }
        });
        
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
  showToasterSuccess(){
    this.notifyService.showSuccess("Pacient adaugat cu succes !!")
  }

  public onAddPacient(user:User){
    if(confirm("Sunteți sigur că doriți să vă atribuiți acest pacient?")){
      this.userService.updatePacient(user.email,this.loggedInUser.id).subscribe({
        next: (response: User) => {
          console.log(response);
          window.location.reload();
          this.showToasterSuccess();
        },
        error: (error:HttpErrorResponse) => {
          alert(error.message);
        }
      });
    }
  }
}
