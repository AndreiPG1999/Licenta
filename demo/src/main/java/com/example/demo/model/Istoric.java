package com.example.demo.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

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
    private Date date;
    private String dinte;
    @Column(nullable = false, updatable = false)
    private String email_pacient;

    public Istoric(){}

    public Istoric(Long id, String treatment, double pret, String diagnostic, Date date, String dinte, String email_pacient) {
        this.id = id;
        this.treatment = treatment;
        this.pret = pret;
        this.diagnostic = diagnostic;
        this.date = date;
        this.dinte = dinte;
        this.email_pacient = email_pacient;
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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getDinte() {
        return dinte;
    }

    public void setDinte(String dinte) {
        this.dinte = dinte;
    }

    public String getEmail_pacient() {
        return email_pacient;
    }

    public void setEmail_pacient(String email_pacient) {
        this.email_pacient = email_pacient;
    }


}
