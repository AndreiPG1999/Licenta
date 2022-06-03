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
    public User updateNrTel(User user, String nr_telefon){
        user.setNr_telefon(nr_telefon);
        return userRepo.save(user);
    }
    public User updateFirstName(User user, String firstName){
        user.setFirst_name(firstName);
        return userRepo.save(user);
    }
    public User updateLastName(User user, String lastName){
        user.setLast_name(lastName);
        return userRepo.save(user);
    }
    public User updatePassword(User user, String pass){
        user.setPassword(pass);
        return userRepo.save(user);
    }

    public void deleteUser(String email){
        userRepo.deleteUserByEmail(email);
    }
}
