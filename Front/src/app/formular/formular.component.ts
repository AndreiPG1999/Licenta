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
  submitted = false
  afectiuniData = ['Infarct miocardic' ,'Tensiune arteriala crescuta' ,'Tulburari de ritm cardiac' ,'Hepatita' ,'Tuberculoza' , 'Ulcer/gastrita' ,'Boli renale' ,'Diabet zaharat' ,'Astm' ,'HIV/SIDA/alte afectiuni care scad imunitatea' ,
    'Afectiuni psihice' ,'Epilepsie/convulsii' ,'Anemie/alte boli ale sangelui' , 'Cancer' , 'Niciuna' ];
    optionsMap = {
      infarct_miocardic: false,
      tensiune_arteriala_crescuta:false,
      tulburari_de_ritm_cardiac:false,
      hepatita:false,
      tuberculoza:false,
      ulcer_gastrita:false,
      boli_renale:false,
      diabet_zaharat:false,
      astm:false,
      hiv_sida:false,
      afectiuni_psihice:false,
      epilepsie_convulsii:false,
      anemie_alte_boli:false,
      cancer:false,
      nici_una:false
    };
    optionsChecked = "";
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
      alergii: new FormControl(''),
      alcool: new FormControl('', Validators.required),
      fumator: new FormControl('', Validators.required),
      droguri: new FormControl('', Validators.required),
      alte_probleme: new FormControl('', Validators.required)
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

  // initOptionsMap(){
  //   for ( let afectiuni of this.afectiuniData)
  //     this.optionsMap[afectiuni] = true;
  //   }
  // }

  async onSubmit(formularForm:FormGroup){
    this.submitted = true;
    if(formularForm.valid){
      this.formularForm.value['email'] = this.currentUser.email;
      this.formularForm.value['first_name'] = this.loggedInUser.first_name;
      this.formularForm.value['last_name'] = this.loggedInUser.last_name;
      
      for ( let afectiune of this.afectiuniData){
        var id_af = "input_" + afectiune;
        var a = document.getElementById(id_af) as HTMLInputElement;
        if(a.checked)
        {
          this.optionsChecked += afectiune + ","; 
          
        }
      }
      this.formularForm.value['afectiuni'] = this.optionsChecked;
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
  }

}
