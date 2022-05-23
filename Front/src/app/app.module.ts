import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomePacientComponent } from './home-pacient/home-pacient.component';
import { DespreComponent } from './despre/despre.component';
import { ContactComponent } from './contact/contact.component';
import { ProfilComponent } from './profil/profil.component';
import { NavbarPacientComponent } from './navbar/navbar.component';
import { PassChangeComponent } from './pass-change/pass-change.component';
import { HomeDoctorComponent } from './home-doctor/home-doctor.component';
import { NavbarDoctorComponent } from './navbar-doctor/navbar-doctor.component';
import { ContactDoctorComponent } from './contact-doctor/contact-doctor.component';
import { DespreDoctorComponent } from './despre-doctor/despre-doctor.component';
import { ProfilDoctorComponent } from './profil-doctor/profil-doctor.component';
import { PassChangeDoctorComponent } from './pass-change-doctor/pass-change-doctor.component';
import { AddTreatmentComponent } from './add-treatment/add-treatment.component';
import { AddPacientComponent } from './add-pacient/add-pacient.component';
import { PacientiComponent } from './pacienti/pacienti.component';
import { IstoricComponent } from './istoric/istoric.component';
import { AddProgramareComponent } from './add-programare/add-programare.component';
import { ProgramariDoctorComponent } from './programari-doctor/programari-doctor.component';
import { ProgramariPacientComponent } from './programari-pacient/programari-pacient.component';
import { AddTreatmentPacientComponent } from './add-treatment-pacient/add-treatment-pacient.component';
import { IstoricDoctorComponent } from './istoric-doctor/istoric-doctor.component';
import { FormularComponent } from './formular/formular.component';
import { AfisareFormularPacientComponent } from './afisare-formular-pacient/afisare-formular-pacient.component';
import { AfisareFormularDoctorComponent } from './afisare-formular-doctor/afisare-formular-doctor.component';
import { RadiografiiComponent } from './radiografii/radiografii.component';
import { AccesComponent } from './acces/acces.component';
import { InfoAccesComponent } from './info-acces/info-acces.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomePacientComponent,
    DespreComponent,
    ContactComponent,
    ProfilComponent,
    NavbarPacientComponent,
    PassChangeComponent,
    HomeDoctorComponent,
    NavbarDoctorComponent,
    ContactDoctorComponent,
    DespreDoctorComponent,
    ProfilDoctorComponent,
    PassChangeDoctorComponent,
    AddTreatmentComponent,
    AddPacientComponent,
    PacientiComponent,
    IstoricComponent,
    AddProgramareComponent,
    ProgramariDoctorComponent,
    ProgramariPacientComponent,
    AddTreatmentPacientComponent,
    IstoricDoctorComponent,
    FormularComponent,
    AfisareFormularPacientComponent,
    AfisareFormularDoctorComponent,
    RadiografiiComponent,
    AccesComponent,
    InfoAccesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
