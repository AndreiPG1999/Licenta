import { HttpErrorResponse } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Formular } from '../formular';
import { FormularService } from '../formular.service';
import { NotificationService } from '../notification.service';
import { TokenStorageService } from '../token-storage.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-formular',
  templateUrl: './formular.component.html',
  styleUrls: ['./formular.component.css']
})
export class FormularComponent implements OnInit {

  formularForm !: FormGroup
  currentUser !: any
  loggedInUser !: any
  existingForm !: Formular
  submitted = false
  afectiuniData = ['Infarct miocardic' ,'Tensiune arteriala crescuta' ,'Tulburari de ritm cardiac' ,'Hepatita' ,'Tuberculoza' , 'Ulcer/gastrita' ,'Boli renale' ,'Diabet zaharat' ,'Astm' ,'HIV/SIDA/alte afectiuni care scad imunitatea' ,
    'Afectiuni psihice' ,'Epilepsie/convulsii' ,'Anemie/alte boli ale sangelui' , 'Cancer' , 'Niciuna' ];
  alergiiData = ['Antibiotice', 'Antiinflamatoare', 'Anestezice', 'Niciuna'];
  optionsChecked = "";
  optionsAlergiiChecked = "";
  constructor(private notifyService:NotificationService, private token:TokenStorageService, private userService:UserService, private formularService:FormularService) { }

  showToasterSuccess(){
    this.notifyService.showSuccess("Formular trimis cu succes !!")
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.formularForm = new FormGroup({
      email: new FormControl(''),
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      data_nasterii: new FormControl(''),
      afectiuni: new FormArray([]),
      sangerari: new FormControl('', Validators.required),
      alergii: new FormArray([]),
      alcool: new FormControl('', Validators.required),
      fumator: new FormControl('', Validators.required),
      droguri: new FormControl('', Validators.required),
      alte_probleme: new FormControl('', Validators.required),
      id_doctor: new FormControl('')
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
  }


  async onSubmit(formularForm:FormGroup){
    this.submitted = true;
    if(formularForm.valid){
      this.formularForm.value['email'] = this.currentUser.email;
      this.formularForm.value['first_name'] = this.loggedInUser.first_name;
      this.formularForm.value['last_name'] = this.loggedInUser.last_name;
      this.formularForm.value['id_doctor'] = this.loggedInUser.id_doctor;
      
      for ( let afectiune of this.afectiuniData){
        var id_af = "input_" + afectiune;
        var a = document.getElementById(id_af) as HTMLInputElement;
        if(a.checked)
        {
          this.optionsChecked += afectiune + ","; 
          
        }
      }
      this.formularForm.value['afectiuni'] = this.optionsChecked;

      for ( let alergie of this.alergiiData){
        var id_af = "input_" + alergie;
        var a = document.getElementById(id_af) as HTMLInputElement;
        if(a.checked)
        {
          this.optionsAlergiiChecked += alergie + ",";
          
        }
      }
      this.formularForm.value['alergii'] = this.optionsAlergiiChecked;
      this.formularService.findFormular(this.formularForm.value['email']).subscribe({
        next: () => {
          if(confirm("Ați completat deja un formular, trimiterea unui formular nou îl va șterge pe cel precedent! Apăsați ok pentru a îl trimite oricum.")){
            this.formularService.deleteFormular(this.currentUser.email).subscribe({
              next: () => {
                console.log("deleted")
                this.formularService.addFormular(formularForm.value).subscribe({
                  next:async (response: Formular) => {
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
            });
            
          }
          else{
            window.location.reload();
          }
        },
        error: () => {
          this.formularService.addFormular(formularForm.value).subscribe({
            next:async (response: Formular) => {
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
      });
    }
  }

}
