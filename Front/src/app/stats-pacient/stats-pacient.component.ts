import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Istoric } from '../istoric';
import { IstoricService } from '../istoric.service';
import { TokenStorageService } from '../token-storage.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-stats-pacient',
  templateUrl: './stats-pacient.component.html',
  styleUrls: ['./stats-pacient.component.css']
})
export class StatsPacientComponent implements OnInit {

  array !: any;
  currentUser !: any;
  loggedInUser !: any;
  istorics !: Istoric[];
  pretAbces = 0;
  pretAmeloblastom = 0;
  pretAngina = 0;
  pretDiastema = 0;
  pretGingivita = 0;
  pretCarie = 0;
  pretCheilita = 0;
  pretFluoroza = 0;
  pretFractura = 0;
  pretHiperplazia = 0;
  pretParodontoza = 0;
  pretRetractie = 0;
  pretSangerare = 0;
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
    this.istoricService.getIstoricsByEmail(this.currentUser.email).subscribe({
      next:(response: Istoric[]) => {
        this.istorics = response;
        console.log(this.istorics);
        for(let istoric of this.istorics){
          if(istoric.diagnostic === "Abces dentar")
            this.pretAbces += istoric.pret;
          if(istoric.diagnostic === "Ameloblastom")
            this.pretAmeloblastom += istoric.pret;
          if(istoric.diagnostic === "Angina Ludwig")
            this.pretAngina += istoric.pret;
          if(istoric.diagnostic === "Diastema")
            this.pretDiastema += istoric.pret;
          if(istoric.diagnostic === "Gingivita")
            this.pretGingivita += istoric.pret;
          if(istoric.diagnostic === "Caria dentara")
            this.pretCarie += istoric.pret;
          if(istoric.diagnostic === "Cheilita angulara")
            this.pretCheilita += istoric.pret;
          if(istoric.diagnostic === "Fluoroza dentara")
            this.pretFluoroza += istoric.pret;
          if(istoric.diagnostic === "Fractura mandibulara")
            this.pretFractura += istoric.pret;
          if(istoric.diagnostic === "Hiperplazia gingivala")
            this.pretHiperplazia += istoric.pret;
          if(istoric.diagnostic === "Parodontoza")
            this.pretParodontoza += istoric.pret;
          if(istoric.diagnostic === "Retractie gingivala")
            this.pretRetractie += istoric.pret;
          if(istoric.diagnostic === "Sangerare gingivala")
            this.pretSangerare += istoric.pret;
        }
        const  array2 = new Array<Number>();
        array2.push(this.pretAbces);
        array2.push(this.pretAmeloblastom);
        array2.push(this.pretAngina);
        array2.push(this.pretDiastema);
        array2.push(this.pretGingivita);
        array2.push(this.pretCarie);
        array2.push(this.pretCheilita);
        array2.push(this.pretFluoroza);
        array2.push(this.pretFractura);
        array2.push(this.pretHiperplazia);
        array2.push(this.pretParodontoza);
        array2.push(this.pretRetractie);
        array2.push(this.pretSangerare);
    
        this.array = array2;
        console.log(this.array);
        this.getChartData();
      }
    })
  }
}
