import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Diagnostic } from '../diagnostic';
import { DiagnosticService } from '../diagnostic.service';
import { Istoric } from '../istoric';
import { IstoricService } from '../istoric.service';
import { NotificationService } from '../notification.service';
import { TokenStorageService } from '../token-storage.service';
import { Treatment } from '../treatment';
import { TreatmentService } from '../treatment.service';
import { User } from '../user';
import { UserService } from '../user.service';


@Component({
  selector: 'app-add-treatment',
  templateUrl: './add-treatment.component.html',
  styleUrls: ['./add-treatment.component.css']
})
export class AddTreatmentComponent implements OnInit {

  treatmentForm!:FormGroup
  radiografieForm!: FormGroup
  submitted = false
  submittedRad = false
  treatments !: Treatment[];
  diagnostics !: Diagnostic[];
  users !: User[];
  loggedInUser!: any;
  currentUser!: any;

  constructor(private istoricService:IstoricService, private notifyService:NotificationService, private userService:UserService, private treatmentService:TreatmentService, private diagnosticSerivce: DiagnosticService, private token:TokenStorageService) {
    
  }
  showToasterSuccess(){
    this.notifyService.showSuccess("Date adaugate cu succes !!")
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.treatmentForm = new FormGroup({
      email_pacient: new FormControl('',Validators.required),
      treatment: new FormControl('', Validators.required),
      diagnostic: new FormControl('', Validators.required),
      pret: new FormControl('',[Validators.required, Validators.pattern('^[0-9-]+$')]),
      dinte: new FormControl('', Validators.required)
    });
    this.userService.findUser(this.currentUser.email).subscribe({
      next:(response: User) => {
        this.loggedInUser = response;
        console.log(this.loggedInUser);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
    this.getDiagnostics()
    this.getTreatments()
    this.getUsers();
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

  public getDiagnostics(){
    this.diagnosticSerivce.getDiagnostics().subscribe({
      next:(response: Diagnostic[]) => {
        this.diagnostics = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }
  public getTreatments(){
    this.treatmentService.getTreatments().subscribe({
      next:(response: Treatment[]) => {
        this.treatments = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }
  async onSubmit(treatmentForm:FormGroup){
    this.submitted = true;
    if(treatmentForm.valid){
      //treb adaugata si radiografie
      this.istoricService.addIstoric(treatmentForm.value).subscribe({
        next:async (response: Istoric) => {
          console.log(response);
          this.showToasterSuccess();
          await new Promise(f => setTimeout(f, 1000));
          this.treatmentForm.controls['pret'].reset();
          this.treatmentForm.controls['dinte'].reset();
          this.treatmentForm.controls['radiografie'].reset();
          this.submitted = false;
        },
        error: (error:HttpErrorResponse) => {
          alert(error.message);
        }
      })
    }
  }
}
