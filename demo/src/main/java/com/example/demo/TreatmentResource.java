package com.example.demo;

import com.example.demo.model.Treatment;
import com.example.demo.service.TreatmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/treatments")
public class TreatmentResource {
    private TreatmentService treatmentService;

    public TreatmentResource(TreatmentService treatmentService) {
        this.treatmentService = treatmentService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Treatment>> getAllTreatments(){
        List<Treatment> treatments = treatmentService.findAllTreatments();
        return new ResponseEntity<>(treatments, HttpStatus.OK);
    }
}
