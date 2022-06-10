package com.example.demo.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Istoric implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String treatment;
    private double pret;
    private String diagnostic;
    @Column(nullable = false, updatable = false)
    private String date;
    private String dinte;
    @Column(nullable = false, updatable = false)
    private String email;
    private Long id_doctor;
    private String descriere;

    public Istoric(){}

    public Istoric(Long id, String treatment, double pret, String diagnostic, String date, String dinte,
                   String email_pacient, Long id_doctor, String descriere) {
        this.id = id;
        this.treatment = treatment;
        this.pret = pret;
        this.diagnostic = diagnostic;
        this.date = date;
        this.dinte = dinte;
        this.email = email_pacient;
        this.id_doctor = id_doctor;
        this.descriere = descriere;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTreatment() {
        return treatment;
    }

    public void setTreatment(String treatment) {
        this.treatment = treatment;
    }

    public double getPret() {
        return pret;
    }

    public void setPret(double pret) {
        this.pret = pret;
    }

    public String getDiagnostic() {
        return diagnostic;
    }

    public void setDiagnostic(String diagnostic) {
        this.diagnostic = diagnostic;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDinte() {
        return dinte;
    }

    public void setDinte(String dinte) {
        this.dinte = dinte;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getId_doctor() {
        return id_doctor;
    }

    public void setId_doctor(Long id_doctor) {
        this.id_doctor = id_doctor;
    }

    public String getDescriere() {
        return descriere;
    }

    public void setDescriere(String descriere) {
        this.descriere = descriere;
    }

    @Override
    public String toString() {
        return "Istoric{" +
                "id=" + id +
                ", treatment='" + treatment + '\'' +
                ", pret=" + pret +
                ", diagnostic='" + diagnostic + '\'' +
                ", date='" + date + '\'' +
                ", dinte='" + dinte + '\'' +
                ", email='" + email + '\'' +
                ", id_doctor=" + id_doctor +
                ", descriere='" + descriere + '\'' +
                '}';
    }
}
