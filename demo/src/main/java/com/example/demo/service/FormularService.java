package com.example.demo.service;

import com.example.demo.model.Formular;
import com.example.demo.repo.FormularRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class FormularService {
    private final FormularRepo formularRepo;

    @Autowired
    public FormularService(FormularRepo formularRepo) {
        this.formularRepo = formularRepo;
    }

    public Formular addFormular(Formular formular){
        Date currentDate = Calendar.getInstance().getTime();
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        String strDate = formatter.format(currentDate);
        formular.setData(strDate);
        return formularRepo.save(formular);
    }

    public List<Formular> findAllFormulars(){return formularRepo.findAll();}
}
