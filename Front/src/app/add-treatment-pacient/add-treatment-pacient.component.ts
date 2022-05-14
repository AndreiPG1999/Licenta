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
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-treatment-pacient',
  templateUrl: './add-treatment-pacient.component.html',
  styleUrls: ['./add-treatment-pacient.component.css']
})
export class AddTreatmentPacientComponent implements OnInit {

  treatmentForm!:FormGroup
  submitted = false
  treatments !: Treatment[];
  diagnostics !: Diagnostic[];
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
      email_pacient: new FormControl(''),
      treatment: new FormControl(''),
      diagnostic: new FormControl(''),
      pret: new FormControl('',[Validators.required, Validators.pattern('^[0-9-]+$')]),
      dinte: new FormControl('', Validators.required)
    });
    this.getDiagnostics()
    this.getTreatments();
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
      this.treatmentForm.value['email_pacient'] = this.currentUser.email;
      this.istoricService.addIstoric(treatmentForm.value).subscribe({
        next:async (response: Istoric) => {
          console.log(response);
          this.showToasterSuccess();
          await new Promise(f => setTimeout(f, 2000));
          window.location.reload();
          this.submitted = false;
        },
        error: (error:HttpErrorResponse) => {
          alert(error.message);
        }
      })
    }
  }
}