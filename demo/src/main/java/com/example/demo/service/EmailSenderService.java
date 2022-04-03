package com.example.demo.service;

import com.example.demo.model.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderService {

    private JavaMailSender mailSender;

    @Autowired
    public EmailSenderService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendEmail(Email email) throws MailException{
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo("andreipopescu052@gmail.com");
        mail.setFrom(email.getEmail());
        mail.setSubject("Contact:"+email.getName());
        mail.setText(email.getMessage());

        mailSender.send(mail);
    }
}
