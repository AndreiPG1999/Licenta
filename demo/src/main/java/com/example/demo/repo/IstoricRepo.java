package com.example.demo.repo;

import com.example.demo.model.Istoric;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IstoricRepo extends JpaRepository<Istoric, Long> {

}
