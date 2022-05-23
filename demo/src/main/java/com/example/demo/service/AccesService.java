package com.example.demo.service;

import com.example.demo.model.Acces;
import com.example.demo.repo.AccesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccesService {
    private final AccesRepo accesRepo;

    @Autowired
    public AccesService(AccesRepo accesRepo) {
        this.accesRepo = accesRepo;
    }

    public Acces addAcces(Acces acces){
        return accesRepo.save(acces);
    }

    public List<Acces> findAllAcces(){
        return accesRepo.findAll();
    }

    public Acces updateId_doctor(Acces acces, Long id){
        acces.setId_doctor(id);
        return accesRepo.save(acces);
    }

    public void deleteAcces(String email){
        accesRepo.deleteAccesByEmail(email);
    }
}
