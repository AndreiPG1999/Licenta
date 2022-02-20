import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../notification.service';
import { Prices } from '../prices';
import { PricesService } from '../prices.service';
import { UserService } from '../user.service';
import { emailValidator } from '../validators/register-email.validator';

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
  constructor(private notifyService:NotificationService, private userService:UserService, private priceService:PricesService) {
    
  }
  showToasterSuccess(){
    this.notifyService.showSuccess("Treatment added successfully !!")
  }

  ngOnInit(): void {
    this.treatmentForm = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email], emailValidator(this.userService)),
      treatment: new FormControl('', Validators.required)
    });
    this.radiografieForm = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email], emailValidator(this.userService)),
      radiografie: new FormControl('', Validators.required)
    })
    this.getPrices();
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
