package com.example.demo;

import com.example.demo.model.Istoric;
import com.example.demo.service.IstoricService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/add")
    public ResponseEntity<Istoric> addIstoric(@RequestBody Istoric istoric){
        Istoric newIstoric = istoricService.addIstoric(istoric);
        return new ResponseEntity<>(newIstoric, HttpStatus.CREATED);
    }
}
