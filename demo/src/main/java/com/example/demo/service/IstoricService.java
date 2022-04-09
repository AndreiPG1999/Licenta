package com.example.demo.service;

import com.example.demo.model.Istoric;
import com.example.demo.repo.IstoricRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class IstoricService {
    private final IstoricRepo istoricRepo;

    @Autowired
    public IstoricService(IstoricRepo istoricRepo) {
        this.istoricRepo = istoricRepo;
    }

    public Istoric addIstoric(Istoric istoric){
        Date currentDate = Calendar.getInstance().getTime();
        istoric.setDate(currentDate);
        return istoricRepo.save(istoric);
    }

    public List<Istoric> findAllIstorics(){return istoricRepo.findAll();}
}
