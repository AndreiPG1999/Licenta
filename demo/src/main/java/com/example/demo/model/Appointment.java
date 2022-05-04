package com.example.demo.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Appointment implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String email;
    private String data;
    private String ora_incepere;
    private String ora_finalizare;
    private String descriere;
    private Long id_doctor;

    public Appointment(){}

    public Appointment(Long id, String email, String data, String ora_incepere, String ora_finalizare, String descriere, Long id_doctor) {
        this.id = id;
        this.email = email;
        this.data = data;
        this.ora_incepere = ora_incepere;
        this.ora_finalizare = ora_finalizare;
        this.descriere = descriere;
        this.id_doctor = id_doctor;
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

    @Override
    public String toString() {
        return "Appointment{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", data='" + data + '\'' +
                ", ora_incepere='" + ora_incepere + '\'' +
                ", ora_finalizare='" + ora_finalizare + '\'' +
                ", descriere='" + descriere + '\'' +
                ", id_doctor=" + id_doctor +
                '}';
    }
}
