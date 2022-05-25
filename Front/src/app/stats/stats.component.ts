import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Istoric } from '../istoric';
import { IstoricService } from '../istoric.service';
import { TokenStorageService } from '../token-storage.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  array !: any;
  currentUser !: any;
  loggedInUser !: any;
  istorics !: Istoric[];
  nrAbces = 0;
  nrAmeloblastom = 0;
  nrAngina = 0;
  nrDiastema = 0;
  nrGingivita = 0;
  nrCarie = 0;
  nrCheilita = 0;
  nrFluoroza = 0;
  nrFractura = 0;
  nrHiperplazia = 0;
  nrParodontoza = 0;
  nrRetractie = 0;
  nrSangerare = 0;
  constructor(private userService:UserService, private token:TokenStorageService, private istoricService: IstoricService) { }

  ngOnInit(): void {
    
    this.currentUser = this.token.getUser();
    this.userService.findUser(this.currentUser.email).subscribe({
      next:(response: User) => {
        this.loggedInUser = response;
        console.log(this.loggedInUser);
        this.getIstoric();
        
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }
  chartType = 'bar';

  chartDatasets = [
    { data: [this.nrAbces, this.nrAmeloblastom, this.nrAngina, this.nrDiastema, this.nrGingivita, this.nrCarie, this.nrCheilita, this.nrFluoroza, this.nrFractura, this.nrHiperplazia, this.nrParodontoza, this.nrRetractie, this.nrSangerare], label: 'Diagnostice' }
  ];

  chartLabels = ['Abces dentar', 'Ameloblastom', 'Angina Ludwig', 'Diastema', 'Gingivita', 'Caria dentara', 'Cheilita angulara', 'Fluoroza dentara', 'Fractura mandibulara', 'Hiperplazia gingivala', 'Parodontoza', 'Retractie gingivala', 'Sangerare gingivala'];

  chartColors = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(153, 102, 255, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)'
      ],
      borderWidth: 2,
    }
  ];

  chartOptions: any = {
    responsive: true
  };

  chartClicked(event: any): void {
    console.log(event);
  }

  chartHovered(event: any): void {
    console.log(event);
  }
  getChartData(): Array<{data:Array<Number>, label:string}> {

    const aux = new  Array<{data:Array<Number>, label:string}>();
    aux.push({data: this.array, label: 'Diagnostice'});
    return aux;
  }

  public getIstoric(): void {
    this.istoricService.findIstoricById(this.loggedInUser.id).subscribe({
      next:(response: Istoric[]) => {
        this.istorics = response;
        console.log(this.istorics);
      }
    })
  }

  public getData(): void{
    for(let istoric of this.istorics){
      if(istoric.diagnostic === "Abces dentar")
        this.nrAbces ++;
      if(istoric.diagnostic === "Ameloblastom")
        this.nrAmeloblastom ++;
      if(istoric.diagnostic === "Angina Ludwig")
        this.nrAngina ++;
      if(istoric.diagnostic === "Diastema")
        this.nrDiastema ++;
      if(istoric.diagnostic === "Gingivita")
        this.nrGingivita ++;
      if(istoric.diagnostic === "Caria dentara")
        this.nrCarie ++;
      if(istoric.diagnostic === "Cheilita angulara")
        this.nrCheilita ++;
      if(istoric.diagnostic === "Fluoroza dentara")
        this.nrFluoroza ++;
      if(istoric.diagnostic === "Fractura mandibulara")
        this.nrFractura ++;
      if(istoric.diagnostic === "Hiperplazia gingivala")
        this.nrHiperplazia ++;
      if(istoric.diagnostic === "Parodontoza")
        this.nrParodontoza ++;
      if(istoric.diagnostic === "Retractie gingivala")
        this.nrRetractie ++;
      if(istoric.diagnostic === "Sangerare gingivala")
        this.nrSangerare ++;
    }
    const  array2 = new Array<Number>();
    array2.push(this.nrAbces);
    array2.push(this.nrAmeloblastom);
    array2.push(this.nrAngina);
    array2.push(this.nrDiastema);
    array2.push(this.nrGingivita);
    array2.push(this.nrCarie);
    array2.push(this.nrCheilita);
    array2.push(this.nrFluoroza);
    array2.push(this.nrFractura);
    array2.push(this.nrHiperplazia);
    array2.push(this.nrParodontoza);
    array2.push(this.nrRetractie);
    array2.push(this.nrSangerare);

    this.array = array2;

  }
}
