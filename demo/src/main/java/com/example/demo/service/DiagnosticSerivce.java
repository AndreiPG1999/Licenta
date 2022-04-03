package com.example.demo.service;

import com.example.demo.model.Diagnostic;
import com.example.demo.repo.DiagnosticRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiagnosticSerivce {
    private DiagnosticRepo diagnosticRepo;

    @Autowired
    public DiagnosticSerivce(DiagnosticRepo diagnosticRepo) {this.diagnosticRepo = diagnosticRepo;}

    public List<Diagnostic> findAllDiagnostics() { return diagnosticRepo.findAll();}
}
