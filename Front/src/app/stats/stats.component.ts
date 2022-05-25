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
  nrAbces !: number;
  nrAmeloblastom !: number;
  nrAngina !: number;
  nrDiastema !: number;
  nrGingivita !: number;
  nrCarie !: number;
  nrCheilita !: number;
  nrFluoroza !: number;
  nrFractura !: number;
  nrHiperplazia !: number;
  nrParodontoza !: number;
  nrRetractie !: number;
  nrSangerare !: number;
  constructor(private userService:UserService, private token:TokenStorageService, private istoricService: IstoricService) { }

  ngOnInit(): void {
    // this.getChartLabels();
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
    });
  }

  chartType = 'bar';

  chartDatasets = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset' }
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
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
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
  // public getChartLabels(){

  //   if(this.chartLabels.length === 0){
  //      // @ts-ignore: Object is possibly 'null'.
  //     for(let i=0; i<this.vehicles.length; i++){
  //       // @ts-ignore: Object is possibly 'null'.
  //       this.chartLabels.push(this.vehicles[i].denumire);
  //     }
  //   }
  // } 

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
    }
    

    const  array2 = new Array<Number>();
    // array2.push(this.pretCombustibil);
    // array2.push(this.pretRCA);
    // array2.push(this.pretCasco);
    // array2.push(this.pretITP);
    // array2.push(this.pretService);
    // array2.push(this.pretAltceva);

    this.array = array2;
  }
}
