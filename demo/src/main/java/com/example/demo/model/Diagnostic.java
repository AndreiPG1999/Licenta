package com.example.demo.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Diagnostic implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String diagnostic;

    public Diagnostic(){}

    public Diagnostic(Long id, String diagnostic) {
        this.id = id;
        this.diagnostic = diagnostic;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDiagnostic() {
        return diagnostic;
    }

    public void setDiagnostic(String diagnostic) {
        this.diagnostic = diagnostic;
    }

    @Override
    public String toString() {
        return "Diagnostic{" +
                "id=" + id +
                ", diagnostic='" + diagnostic + '\'' +
                '}';
    }
}
