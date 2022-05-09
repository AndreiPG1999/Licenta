package com.example.demo;


import com.example.demo.model.Email;
import com.example.demo.model.User;
import com.example.demo.service.EmailSenderService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/user")
public class UserResource {
    private final UserService userService;
    public UserResource(UserService userService) {
        this.userService = userService;
    }

    @Autowired
    private EmailSenderService emailSenderService;

    @PostMapping("/email")
    public ResponseEntity<Email> sendEmail(@RequestBody Email email){
        emailSenderService.sendEmail(email);
        return new ResponseEntity<>(email, HttpStatus.OK);
    }

    @RequestMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {
        List<User> users = userService.findAllUsers();
        for (User userLog : users) {
            if (userLog.getEmail().equals(user.getEmail()) && userLog.getPassword().equals(user.getPassword()))
                return new ResponseEntity<>(user, HttpStatus.OK);
            else
                continue;
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> users = userService.findAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/find/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable("email") String email){
        List<User> users = userService.findAllUsers();
        for(User userLog : users)
        {
            if(userLog.getEmail().equals(email))
            {
                return new ResponseEntity<>(userLog, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/add")
    public ResponseEntity<User> addUser(@RequestBody User user){
        User newUser = userService.addUser(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PutMapping("/updatePacient/{email}/{doctor_id_upd}")
    public ResponseEntity<User> updatePacient(@PathVariable("email") String email,@PathVariable("doctor_id_upd") Long doctor_id_upd){
        List<User> users = userService.findAllUsers();
        for(User userLog : users)
        {
            if(userLog.getEmail().equals(email))
            {
                User updateUser = userService.updatePacient(userLog, doctor_id_upd);
                return new ResponseEntity<>(updateUser, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/updateNrTel/{email}/{nr_telefon}")
    public ResponseEntity<User> updateNrTel(@PathVariable("email") String email,@PathVariable("nr_telefon") String nr_telefon){
        List<User> users = userService.findAllUsers();
        for(User userLog : users)
        {
            if(userLog.getEmail().equals(email))
            {
                User updateUser = userService.updateNrTel(userLog, nr_telefon);
                return new ResponseEntity<>(updateUser, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @PutMapping("/updateFirstName/{email}/{first_name}")
    public ResponseEntity<User> updateFirstName(@PathVariable("email") String email,@PathVariable("first_name") String first_name){
        List<User> users = userService.findAllUsers();
        for(User userLog : users)
        {
            if(userLog.getEmail().equals(email))
            {
                User updateUser = userService.updateFirstName(userLog, first_name);
                return new ResponseEntity<>(updateUser, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @PutMapping("/updateLastName/{email}/{last_name}")
    public ResponseEntity<User> updateLastName(@PathVariable("email") String email,@PathVariable("last_name") String last_name){
        List<User> users = userService.findAllUsers();
        for(User userLog : users)
        {
            if(userLog.getEmail().equals(email))
            {
                User updateUser = userService.updateLastName(userLog, last_name);
                return new ResponseEntity<>(updateUser, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @PutMapping("/updatePassword/{email}/{pass}")
    public ResponseEntity<User> updatePassword(@PathVariable("email") String email,@PathVariable("pass") String pass){
        List<User> users = userService.findAllUsers();
        for(User userLog : users)
        {
            if(userLog.getEmail().equals(email))
            {
                User updateUser = userService.updatePassword(userLog, pass);
                return new ResponseEntity<>(updateUser, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @Transactional
    @DeleteMapping("/delete/{email}")
    public ResponseEntity<?> deleteUser(@PathVariable("email") String email){
        userService.deleteUser(email);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
