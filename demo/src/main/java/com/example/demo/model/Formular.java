package com.example.demo.model;

import javax.persistence.*;

@Entity
public class Formular {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable=false, updatable = false)
    private Long id;
    private String first_name;
    private String last_name;
    @Column(nullable=false, updatable = false)
    private String email;
    private String data;
    private String data_nasterii;
    private String afectiuni;
    private String sangerari;
    private String alergii;
    private String alcool;
    private String droguri;
    private String fumator;
    private String alte_probleme;

    public Formular(Long id, String first_name, String last_name, String email, String data_nasterii,
                    String afectiuni, String sangerari, String alergii, String alcool, String droguri,
                    String fumator, String alte_probleme, String data) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.data_nasterii = data_nasterii;
        this.afectiuni = afectiuni;
        this.sangerari = sangerari;
        this.alergii = alergii;
        this.alcool = alcool;
        this.droguri = droguri;
        this.fumator = fumator;
        this.alte_probleme = alte_probleme;
        this.data = data;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getData_nasterii() {
        return data_nasterii;
    }

    public void setData_nasterii(String data_nasterii) {
        this.data_nasterii = data_nasterii;
    }

    public String getAfectiuni() {
        return afectiuni;
    }

    public void setAfectiuni(String afectiuni) {
        this.afectiuni = afectiuni;
    }

    public String getSangerari() {
        return sangerari;
    }

    public void setSangerari(String sangerari) {
        this.sangerari = sangerari;
    }

    public String getAlergii() {
        return alergii;
    }

    public void setAlergii(String alergii) {
        this.alergii = alergii;
    }

    public String getAlcool() {
        return alcool;
    }

    public void setAlcool(String alcool) {
        this.alcool = alcool;
    }

    public String getDroguri() {
        return droguri;
    }

    public void setDroguri(String droguri) {
        this.droguri = droguri;
    }

    public String getFumator() {
        return fumator;
    }

    public void setFumator(String fumator) {
        this.fumator = fumator;
    }

    public String getAlte_probleme() {
        return alte_probleme;
    }

    public void setAlte_probleme(String alte_probleme) {
        this.alte_probleme = alte_probleme;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "Formular{" +
                "id=" + id +
                ", first_name='" + first_name + '\'' +
                ", last_name='" + last_name + '\'' +
                ", email='" + email + '\'' +
                ", data='" + data + '\'' +
                ", data_nasterii='" + data_nasterii + '\'' +
                ", afectiuni='" + afectiuni + '\'' +
                ", sangerari='" + sangerari + '\'' +
                ", alergii='" + alergii + '\'' +
                ", alcool='" + alcool + '\'' +
                ", droguri='" + droguri + '\'' +
                ", fumator='" + fumator + '\'' +
                ", alte_probleme='" + alte_probleme + '\'' +
                '}';
    }
}
