import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Formular } from '../formular';
import { FormularService } from '../formular.service';
import { TokenStorageService } from '../token-storage.service';
import { UserService } from '../user.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { trigger } from '@angular/animations';
@Component({
  selector: 'app-afisare-formular-pacient',
  templateUrl: './afisare-formular-pacient.component.html',
  styleUrls: ['./afisare-formular-pacient.component.css']
})
export class AfisareFormularPacientComponent implements OnInit {

  currentUser !: any
  currentFormular !: any
  afectiuniSplitted !: any
  alergiiSplitted !: any
  constructor(private userService:UserService, private formularService:FormularService, private token:TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser()
    this.formularService.findFormular(this.currentUser.email).subscribe({
      next:(response: Formular) => {
        this.currentFormular = response;
        console.log(this.currentFormular);
        this.afectiuniSplitted = this.currentFormular.afectiuni.split(",");
        this.afectiuniSplitted.pop();
        console.log(this.afectiuniSplitted);
        this.alergiiSplitted = this.currentFormular.alergii.split(",");
        this.alergiiSplitted.pop();
        console.log(this.alergiiSplitted);
      },
      error: () => {
      }
    })
  }
  @ViewChild('formularPDF', {static: false}) htmlData!:ElementRef;
  public SavePDF(): void{
    let DATA = this.htmlData.nativeElement;
    let doc = new jsPDF('p','pt','a4');
    doc.setFontSize(15);
    let handleElement = {
      '#editor': function (){
        return true;
      }
    };
    doc.html(DATA.innerHTML, {
      callback: function(doc) {
        doc.save('formular.pdf');
      }
    });
  }

  public OpenPDF(): void{
    let DATA = this.htmlData.nativeElement;
    let doc = new jsPDF('p','pt','a4');
    
    doc.html(DATA.innerHTML, {
      callback: function(doc) {
        doc.setFontSize(15);
        window.open(URL.createObjectURL(doc.output("blob")));
      }
    });
  }

}
