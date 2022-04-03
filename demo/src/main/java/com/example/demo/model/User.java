package com.example.demo.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String first_name;
    private String last_name;
    @Column(nullable = false, updatable = false)
    private String email;
    private String password;
    private String type;
    private String treatments;
    private Date appointment;
    private Long id_doctor;
    private String nr_telefon;
    private String diagnostic;
    private double pret;
    private String dinte;

    public User(){}

    public User(Long id, String first_name, String last_name, String email, String password, String type,
                String treatments, Date appointment, Long id_doctor,
                String nr_telefon, String diagnostic, double pret, String dinte) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        this.type = type;
        this.treatments = treatments;
        this.appointment = appointment;
        this.id_doctor = id_doctor;
        this.nr_telefon = nr_telefon;
        this.diagnostic = diagnostic;
        this.pret = pret;
        this.dinte = dinte;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTreatments() {
        return treatments;
    }

    public void setTreatments(String treatments) {
        this.treatments = treatments;
    }

    public Date getAppointment() {
        return appointment;
    }

    public void setAppointment(Date appointment) {
        this.appointment = appointment;
    }

    public Long getId_doctor() {
        return id_doctor;
    }

    public void setId_doctor(Long id_doctor) {
        this.id_doctor = id_doctor;
    }

    public String getNr_telefon() {
        return nr_telefon;
    }

    public void setNr_telefon(String nr_telefon) {
        this.nr_telefon = nr_telefon;
    }

    public String getDiagnostic() {
        return diagnostic;
    }

    public void setDiagnostic(String diagnostic) {
        this.diagnostic = diagnostic;
    }

    public double getPret() {
        return pret;
    }

    public void setPret(double pret) {
        this.pret = pret;
    }

    public String getDinte() {
        return dinte;
    }

    public void setDinte(String dinte) {
        this.dinte = dinte;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", first_name='" + first_name + '\'' +
                ", last_name='" + last_name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", type='" + type + '\'' +
                ", treatments='" + treatments + '\'' +
                ", appointment=" + appointment +
                ", id_doctor=" + id_doctor +
                ", nr_telefon='" + nr_telefon + '\'' +
                ", diagnostic='" + diagnostic + '\'' +
                ", pret=" + pret +
                ", dinte='" + dinte + '\'' +
                '}';
    }
}
