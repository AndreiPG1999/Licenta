package com.example.demo.service;


import com.example.demo.exception.UserNotFoundException;
import com.example.demo.model.User;
import com.example.demo.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepo userRepo;

    @Autowired
    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public User addUser(User user){
        user.setType("pacient");
        user.setId_doctor(0L);
        return userRepo.save(user);
    }
    public List<User> findAllUsers(){
        return userRepo.findAll();
    }
    public User updatePacient(User user, Long id_doctor_upd){
        user.setId_doctor(id_doctor_upd);
        return userRepo.save(user);
    }
    public User updatePassword(User user, String pass){
        user.setPassword(pass);
        return userRepo.save(user);
    }
//    public User updateIstoric(User user, String treatment, String diagnostic, double pret, String dinte){
//        user.setTreatments(treatment);
//        user.setDiagnostic(diagnostic);
//        user.setDinte(dinte);
//        user.setPret(pret);
//        return userRepo.save(user);
//    }
    public User findUserByEmail(String email){
        return userRepo.findUserByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
    }
    public void deleteUser(String email){
        userRepo.deleteUserByEmail(email);
    }
}
