package com.example.demo.repo;

import com.example.demo.model.Diagnostic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiagnosticRepo extends JpaRepository<Diagnostic,Long> {

}
