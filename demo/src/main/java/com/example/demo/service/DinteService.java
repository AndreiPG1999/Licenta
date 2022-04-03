package com.example.demo.service;

import com.example.demo.model.Dinte;
import com.example.demo.repo.DinteRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DinteService {
    private DinteRepo dinteRepo;

    @Autowired
    public DinteService(DinteRepo dinteRepo) {
        this.dinteRepo = dinteRepo;
    }

    public List<Dinte> findAllDinti() { return dinteRepo.findAll(); }
}
