package com.example.demo.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Appointment implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String email_pacient;
    private String data;
    private String ora_incepere;
    private String ora_finalizare;
    private String descriere;

    public Appointment(){}

    public Appointment(Long id, String email_pacient, String data, String ora_incepere, String ora_finalizare, String descriere) {
        this.id = id;
        this.email_pacient = email_pacient;
        this.data = data;
        this.ora_incepere = ora_incepere;
        this.ora_finalizare = ora_finalizare;
        this.descriere = descriere;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getOra_incepere() {
        return ora_incepere;
    }

    public void setOra_incepere(String ora_incepere) {
        this.ora_incepere = ora_incepere;
    }

    public String getOra_finalizare() {
        return ora_finalizare;
    }

    public void setOra_finalizare(String ora_finalizare) {
        this.ora_finalizare = ora_finalizare;
    }

    public String getDescriere() {
        return descriere;
    }

    public void setDescriere(String descriere) {
        this.descriere = descriere;
    }

    public String getEmail_pacient() {
        return email_pacient;
    }

    public void setEmail_pacient(String email_pacient) {
        this.email_pacient = email_pacient;
    }

    @Override
    public String toString() {
        return "Appointment{" +
                "id=" + id +
                ", email_pacient='" + email_pacient + '\'' +
                ", data='" + data + '\'' +
                ", ora_incepere='" + ora_incepere + '\'' +
                ", ora_finalizare='" + ora_finalizare + '\'' +
                ", descriere='" + descriere + '\'' +
                '}';
    }
}
