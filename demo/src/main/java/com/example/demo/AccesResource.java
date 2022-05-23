package com.example.demo;

import com.example.demo.model.Acces;
import com.example.demo.service.AccesService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/acces")
public class AccesResource {
    private final AccesService accesService;

    public AccesResource(AccesService accesService) {
        this.accesService = accesService;
    }

    @PostMapping("/add")
    public ResponseEntity<Acces> addFormular(@RequestBody Acces acces){
        Acces newAcces = accesService.addAcces(acces);
        return new ResponseEntity<>(newAcces, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Acces>> getAllFormulars(){
        List<Acces> accesList = accesService.findAllAcces();
        return new ResponseEntity<>(accesList, HttpStatus.OK);
    }

    @GetMapping("/find/{email}")
    public ResponseEntity<Acces> getAccesByEmail(@PathVariable("email") String email){
        List<Acces> accesList = accesService.findAllAcces();
        for(Acces accesLog : accesList)
        {
            if(accesLog.getEmail().equals(email))
            {
                return new ResponseEntity<>(accesLog, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/updateIdDoctor/{email}/{id}")
    public ResponseEntity<Acces> updateId_doctor(@PathVariable("email") String email, @PathVariable("id") Long id){
        List<Acces> accesList = accesService.findAllAcces();
        for(Acces accesLog : accesList)
        {
            if(accesLog.getEmail().equals(email))
            {
                Acces updateAcces = accesService.updateId_doctor(accesLog, id);
                return new ResponseEntity<>(updateAcces, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/all/{id}")
    public ResponseEntity<List<Acces>> getAllFormularsById(@PathVariable("id") Long id) {
        List<Acces> accesList = accesService.findAllAcces();
        List<Acces> accesCopy = new ArrayList<>(accesList);
        for(Acces acces:accesCopy){
            if(!acces.getId_doctor().equals(id)){
                accesList.remove(acces);
            }
        }
        return new ResponseEntity<>(accesList, HttpStatus.OK);
    }

    @Transactional
    @DeleteMapping("/delete/{email}")
    public ResponseEntity<?> deleteAcces(@PathVariable("email") String email){
        accesService.deleteAcces(email);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
