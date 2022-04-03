package com.example.demo.service;

import com.example.demo.model.Treatment;
import com.example.demo.repo.TreatmentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TreatmentService {
    private TreatmentRepo treatmentRepo;

    @Autowired
    public TreatmentService(TreatmentRepo pricesRepo){
        this.treatmentRepo = pricesRepo;
    }

    public List<Treatment> findAllTreatments(){
        return treatmentRepo.findAll();
    }
}
