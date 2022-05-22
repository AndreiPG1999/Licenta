package com.example.demo.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Acces implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    @Column(nullable = false, updatable = false)
    private String email;
    private Long id_doctor;
    private boolean adaugareTratament;
    private boolean adaugareRadiografie;
    private boolean stergereCont;
    private boolean afisareFormular;

    public Acces(){}

    public Acces(Long id, String email, Long id_doctor, boolean adaugareTratament, boolean adaugareRadiografie, boolean stergereCont, boolean afisareFormular) {
        this.id = id;
        this.email = email;
        this.id_doctor = id_doctor;
        this.adaugareTratament = adaugareTratament;
        this.adaugareRadiografie = adaugareRadiografie;
        this.stergereCont = stergereCont;
        this.afisareFormular = afisareFormular;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public boolean isAdaugareTratament() {
        return adaugareTratament;
    }

    public void setAdaugareTratament(boolean adaugareTratament) {
        this.adaugareTratament = adaugareTratament;
    }

    public boolean isAdaugareRadiografie() {
        return adaugareRadiografie;
    }

    public void setAdaugareRadiografie(boolean adaugareRadiografie) {
        this.adaugareRadiografie = adaugareRadiografie;
    }

    public boolean isStergereCont() {
        return stergereCont;
    }

    public void setStergereCont(boolean stergereCont) {
        this.stergereCont = stergereCont;
    }

    public boolean isAfisareFormular() {
        return afisareFormular;
    }

    public void setAfisareFormular(boolean afisareFormular) {
        this.afisareFormular = afisareFormular;
    }

    @Override
    public String toString() {
        return "Acces{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", id_doctor=" + id_doctor +
                ", adaugareTratament=" + adaugareTratament +
                ", adaugareRadiografie=" + adaugareRadiografie +
                ", stergereCont=" + stergereCont +
                ", afisareFormular=" + afisareFormular +
                '}';
    }
}
