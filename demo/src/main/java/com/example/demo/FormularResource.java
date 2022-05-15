package com.example.demo;

import com.example.demo.model.Formular;
import com.example.demo.service.FormularService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/formular")
public class FormularResource {
    private final FormularService formularService;

    public FormularResource(FormularService formularService) {
        this.formularService = formularService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Formular>> getAllFormulars(){
        List<Formular> formulars = formularService.findAllFormulars();
        return new ResponseEntity<>(formulars, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Formular> addFormular(@RequestBody Formular formular){
        Formular newFormular = formularService.addFormular(formular);
        return new ResponseEntity<>(newFormular, HttpStatus.CREATED);
    }
}
