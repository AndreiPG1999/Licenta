package com.example.demo.repo;

import com.example.demo.model.Radiografie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RadiografieRepo extends JpaRepository<Radiografie,Long> {
    Optional<Radiografie> findRadiografieByName(String name);

    void deleteRadiografieById(Long id);
}
