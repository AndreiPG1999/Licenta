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

  constructor(private userService:UserService, private notifyService:NotificationService, private token:TokenStorageService) { }

  ngOnInit(): void {
    this.getUsers();
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
  }

  public getUsers(): void {
    this.userService.getUsers().subscribe({
      next:(response: User[]) => {
        this.users = response;
        console.log(this.users);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public searchUsers(key: string) : void{
    const results: User[] = [];
    for(const user of this.users){
      if(user.last_name.toLowerCase().indexOf(key.toLowerCase()) !== -1 || 
      user.first_name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      user.email.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(user);
      }
    }
    this.users = results;
    if(results.length === 0 || !key){
      this.getUsers();
    }
  }
  showToasterSuccess(){
    this.notifyService.showSuccess("Pacient adaugat cu succes !!")
  }

  public onAddPacient(user:User){
    console.log("Futu-ti mama ta!");
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
