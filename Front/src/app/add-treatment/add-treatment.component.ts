import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Diagnostic } from '../diagnostic';
import { DiagnosticService } from '../diagnostic.service';
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

  constructor(private notifyService:NotificationService, private userService:UserService, private treatmentService:TreatmentService, private diagnosticSerivce: DiagnosticService, private token:TokenStorageService) {
    
  }
  showToasterSuccess(){
    this.notifyService.showSuccess("Date adaugate cu succes !!")
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.treatmentForm = new FormGroup({
      email: new FormControl('',Validators.required),
      treatment: new FormControl('', Validators.required),
      diagnostic: new FormControl('', Validators.required),
      pret: new FormControl('',[Validators.required, Validators.pattern('^[0-9-]+$')]),
      dinte: new FormControl('', Validators.required)
    });
    this.radiografieForm = new FormGroup({
      email: new FormControl('',Validators.required),
      radiografie: new FormControl('', Validators.required)
    })
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
      this.userService.updateIstoric(this.treatmentForm.get('email')!.value,this.treatmentForm.get('treatment')!.value, this.treatmentForm.get('diagnostic')!.value, this.treatmentForm.get('pret')!.value, this.treatmentForm.get('dinte')!.value).subscribe({
        next:(response: User) => {
          console.log(response);
        },
        error: (error:HttpErrorResponse) => {
          alert(error.message);
        }
      });
      this.showToasterSuccess();
      await new Promise(f => setTimeout(f, 1000));
      this.submitted = false;
    }
  }
  async onSubmitRad(radiografieForm:FormGroup){
    this.submittedRad = true;
    if(radiografieForm.valid){
      this.showToasterSuccess();
      await new Promise(f => setTimeout(f, 1000));
      radiografieForm.reset();
      this.submittedRad = false;
    }
  }
}
