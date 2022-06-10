import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from '../appointment.service';
import { Diagnostic } from '../diagnostic';
import { DiagnosticService } from '../diagnostic.service';
import { Dinte } from '../dinte';
import { DinteService } from '../dinte.service';
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
  appointmentForm !: FormGroup
  submitted = false
  treatments !: Treatment[];
  diagnostics !: Diagnostic[];
  users !: User[];
  loggedInUser!: any;
  currentUser!: any;
  selectedFile !: File;
  dinti !: Dinte[];

  constructor(private dinteService:DinteService, private appointmentService: AppointmentService, private istoricService:IstoricService, private notifyService:NotificationService, private userService:UserService, private treatmentService:TreatmentService, private diagnosticSerivce: DiagnosticService, private token:TokenStorageService) {
    
  }
  showToasterSuccess(){
    this.notifyService.showSuccess("Date adaugate cu succes !!")
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.treatmentForm = new FormGroup({
      email: new FormControl(''),
      treatment: new FormControl(''),
      diagnostic: new FormControl(''),
      pret: new FormControl('',[Validators.required, Validators.pattern('^[0-9-]+$')]),
      dinte: new FormControl('', Validators.required),
      id_doctor: new FormControl(''),
      descriere: new FormControl('', Validators.required)
    });
    this.userService.findUser(this.currentUser.email).subscribe({
      next:(response: User) => {
        this.loggedInUser = response;
        console.log(this.loggedInUser);
        this.userService.findUsersByEmail(this.loggedInUser.id).subscribe({
          next:(response: User[]) => {
            this.users = response;
            console.log(this.users);
            this.getDiagnostics();
            this.getTreatments();
            this.getDinti();
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
  public getDinti(){
    this.dinteService.getDinti().subscribe({
      next:(response: Dinte[]) => {
        this.dinti = response;
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
      this.treatmentForm.value['id_doctor'] = this.loggedInUser.id;
      this.istoricService.addIstoric(treatmentForm.value).subscribe({
        next:async (response: Istoric) => {
          console.log(response);
          this.showToasterSuccess();
          await new Promise(f => setTimeout(f, 1000));
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
