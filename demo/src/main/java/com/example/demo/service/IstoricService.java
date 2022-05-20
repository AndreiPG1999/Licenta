package com.example.demo.service;

import com.example.demo.model.Istoric;
import com.example.demo.repo.IstoricRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
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
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        String strDate = formatter.format(currentDate);
        istoric.setDate(strDate);
        return istoricRepo.save(istoric);
    }

    public Istoric updateIdDoctor(Istoric istoric, Long id){
        istoric.setId_doctor(id);
        return istoricRepo.save(istoric);
    }

    public List<Istoric> findAllIstorics(){return istoricRepo.findAll();}

    public void deleteIstoric(String email){
        istoricRepo.deleteIstoricByEmail(email);
    }
}
