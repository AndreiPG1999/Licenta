package com.example.demo.repo;

import com.example.demo.model.Acces;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccesRepo extends JpaRepository<Acces, Long> {

    void deleteAccesByEmail(String email);
}
