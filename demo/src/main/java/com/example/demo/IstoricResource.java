package com.example.demo;

import com.example.demo.model.Istoric;
import com.example.demo.service.IstoricService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/istoric")
public class IstoricResource {
    private final IstoricService istoricService;
    public IstoricResource(IstoricService istoricService){ this.istoricService = istoricService; }

    @GetMapping("/all")
    public ResponseEntity<List<Istoric>> getAllIstorics(){
        List<Istoric> istorics = istoricService.findAllIstorics();
        return new ResponseEntity<>(istorics, HttpStatus.OK);
    }

    @GetMapping("/find/{email}")
    public ResponseEntity<Istoric> getUserByEmail(@PathVariable("email") String email){
        List<Istoric> istorics = istoricService.findAllIstorics();
        for(Istoric istoricLog : istorics)
        {
            if(istoricLog.getEmail().equals(email))
            {
                return new ResponseEntity<>(istoricLog, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/updateIdDoctor/{email}/{id}")
    public ResponseEntity<Istoric> updateIdDoctor(@PathVariable("email") String email, @PathVariable("id") Long id){
        List<Istoric> istorics = istoricService.findAllIstorics();
        for(Istoric istoricLog : istorics)
        {
            if(istoricLog.getEmail().equals(email))
            {
                Istoric updateIstoric = istoricService.updateIdDoctor(istoricLog, id);
                return new ResponseEntity<>(updateIstoric, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/all/{id}")
    public ResponseEntity<List<Istoric>> getAllIstoricsById(@PathVariable("id") Long id) {
        List<Istoric> istorics = istoricService.findAllIstorics();
        List<Istoric> istoricCopy = new ArrayList<>(istorics);
        for(Istoric istoric:istoricCopy){
            if(!istoric.getId_doctor().equals(id)){
                istorics.remove(istoric);
            }
        }
        return new ResponseEntity<>(istorics, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Istoric> addIstoric(@RequestBody Istoric istoric){
        Istoric newIstoric = istoricService.addIstoric(istoric);
        return new ResponseEntity<>(newIstoric, HttpStatus.CREATED);
    }

    @Transactional
    @DeleteMapping("/delete/{email}")
    public ResponseEntity<?> deleteIstoric(@PathVariable("email") String email){
        istoricService.deleteIstoric(email);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
