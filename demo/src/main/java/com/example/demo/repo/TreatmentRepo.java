package com.example.demo.repo;

import com.example.demo.model.Treatment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TreatmentRepo extends JpaRepository<Treatment, Long> {

}
