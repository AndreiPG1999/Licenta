package com.example.demo.service;

import com.example.demo.model.Radiografie;
import com.example.demo.repo.RadiografieRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RadiografieService {
    @Autowired
    private RadiografieRepo radiografieRepo;

    public Map<String, Set<byte[]>> getRadiografieByID(Long id){
        List<Radiografie> radiografieList = new ArrayList<>();
        Set<byte[]> images = new HashSet<>();

        Map<String, Set<byte[]>> radiografieMap = new HashMap<String, Set<byte[]>>();
        List<Radiografie> radiografii = radiografieRepo.findAll();
        List<Radiografie> radiografieCopy = new ArrayList<>(radiografii);
        for(Radiografie radiografie:radiografieCopy){
            if(!radiografie.getId_doctor().equals(id)){
                radiografii.remove(radiografie);
            }
        }
        for(Radiografie radiografie:radiografii)
        {
            images.clear();
            radiografieList = radiografieRepo.findRadiografieByEmail(radiografie.getEmail());
            for(Radiografie rad:radiografieList)
            {
                images.add(rad.getPicByte());
            }
            Set<byte[]> imagesCopy = new HashSet<>(images);
            radiografieMap.put(radiografie.getEmail(), imagesCopy);

        }
        return radiografieMap;
    }
}
