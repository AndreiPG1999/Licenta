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

    public Treatment(){}

    public Treatment(Long id, String treatments) {
        this.id = id;
        this.treatments = treatments;
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

    @Override
    public String toString() {
        return "Treatment{" +
                "id=" + id +
                ", treatments='" + treatments + '\'' +
                '}';
    }
}
