package com.example.demo.resource;

import com.example.demo.model.Diagnostic;
import com.example.demo.service.DiagnosticSerivce;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/diagnostic")
public class DiagnosticResource {
    private DiagnosticSerivce diagnosticSerivce;

    public DiagnosticResource(DiagnosticSerivce diagnosticSerivce) {
        this.diagnosticSerivce = diagnosticSerivce;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Diagnostic>> getAllDiagnostics(){
        List<Diagnostic> diagnostics = diagnosticSerivce.findAllDiagnostics();
        return new ResponseEntity<>(diagnostics, HttpStatus.OK);
    }
}
