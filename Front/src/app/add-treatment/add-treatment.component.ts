import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Diagnostic } from '../diagnostic';
import { DiagnosticService } from '../diagnostic.service';
import { NotificationService } from '../notification.service';
import { Prices } from '../prices';
import { PricesService } from '../prices.service';
import { User } from '../user';
import { UserService } from '../user.service';
import { emailValidator} from '../validators/register-email.validator';


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
  prices !: Prices[];
  diagnostics !: Diagnostic[];

  constructor(private notifyService:NotificationService, private userService:UserService, private priceService:PricesService, private diagnosticSerivce: DiagnosticService) {
    
  }
  showToasterSuccess(){
    this.notifyService.showSuccess("Diagnostic și tratament adaugate cu succes !!")
  }

  ngOnInit(): void {
    this.treatmentForm = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email], emailValidator(this.userService)),
      treatment: new FormControl('', Validators.required),
      diagnostic: new FormControl('', Validators.required)
    });
    this.radiografieForm = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email], emailValidator(this.userService)),
      radiografie: new FormControl('', Validators.required)
    })
    this.getDiagnostics()
    this.getPrices();
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
  public getPrices(){
    this.priceService.getPrices().subscribe({
      next:(response: Prices[]) => {
        this.prices = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }
  async onSubmit(treatmentForm:FormGroup){
    this.submitted = true;
    if(treatmentForm.valid){
      this.userService.updateTreatment(this.treatmentForm.get('email')!.value,this.treatmentForm.get('treatment')!.value).subscribe({
        next:(response: User) => {
          console.log(response);
        },
        error: (error:HttpErrorResponse) => {
          alert(error.message);
        }
      });
      this.userService.updateDiagnostic(this.treatmentForm.get('email')!.value,this.treatmentForm.get('diagnostic')!.value).subscribe({
        next:(response: User) => {
          console.log(response);
        },
        error: (error:HttpErrorResponse) => {
          alert(error.message);
        }
      });
      this.showToasterSuccess();
      await new Promise(f => setTimeout(f, 1000));
      treatmentForm.reset();
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
