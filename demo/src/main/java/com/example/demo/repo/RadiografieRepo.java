package com.example.demo.repo;

import com.example.demo.model.Radiografie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RadiografieRepo extends JpaRepository<Radiografie,Long> {
    List<Radiografie> findRadiografieByEmail(String email);

    void deleteRadiografieById(Long id);
}
