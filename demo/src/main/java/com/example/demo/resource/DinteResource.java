package com.example.demo.resource;

import com.example.demo.model.Dinte;
import com.example.demo.service.DinteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/dinte")
public class DinteResource {
    private DinteService dinteService;

    public DinteResource(DinteService dinteService) {
        this.dinteService = dinteService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Dinte>> getAllDinti(){
        List<Dinte> dinti = dinteService.findAllDinti();
        return new ResponseEntity<>(dinti, HttpStatus.OK);
    }
}
