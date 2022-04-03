package com.example.demo.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Treatment implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String treatments;
    private double pret;

    public Treatment(){}

    public Treatment(Long id, String treatments, double pret) {
        this.id = id;
        this.treatments = treatments;
        this.pret = pret;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTreatments() {
        return treatments;
    }

    public void setTreatments(String treatments) {
        this.treatments = treatments;
    }

    public double getPret() {
        return pret;
    }

    public void setPret(double pret) {
        this.pret = pret;
    }

    @Override
    public String toString() {
        return "Treatment{" +
                "id=" + id +
                ", treatments='" + treatments + '\'' +
                ", pret=" + pret +
                '}';
    }
}
