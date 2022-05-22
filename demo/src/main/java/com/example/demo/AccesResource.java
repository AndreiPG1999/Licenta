package com.example.demo;

import com.example.demo.model.Acces;
import com.example.demo.service.AccesService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
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

    @Transactional
    @DeleteMapping("/delete/{email}")
    public ResponseEntity<?> deleteAcces(@PathVariable("email") String email){
        accesService.deleteAcces(email);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
