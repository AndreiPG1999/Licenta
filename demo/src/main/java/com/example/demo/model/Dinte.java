package com.example.demo.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Dinte implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String dinte;

    public Dinte(){}

    public Dinte(Long id, String dinte) {
        this.id = id;
        this.dinte = dinte;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDinte() {
        return dinte;
    }

    public void setDinte(String dinte) {
        this.dinte = dinte;
    }

    @Override
    public String toString() {
        return "Dinte{" +
                "id=" + id +
                ", dinte='" + dinte + '\'' +
                '}';
    }
}
