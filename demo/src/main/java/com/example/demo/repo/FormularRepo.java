package com.example.demo.repo;

import com.example.demo.model.Formular;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FormularRepo extends JpaRepository<Formular, Long> {
    void deleteFormularById(Long id);

    Optional<Formular> findFormularByEmail(String email);
}
