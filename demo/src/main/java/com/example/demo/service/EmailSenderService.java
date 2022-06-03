package com.example.demo.service;

import com.example.demo.model.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

import java.util.Properties;

@Service
public class EmailSenderService {

    private JavaMailSenderImpl ms ;

    public EmailSenderService(JavaMailSenderImpl ms) {
        this.ms = ms;
    }

    public void sendEmail(Email email) throws MailException{
        Properties mailProperties = new Properties();
        mailProperties.put("mail.smtp.starttls.enable", true);
        mailProperties.put("mail.smtp.ssl.trust", "smtp.gmail.com");
        ms.setHost("smtp.gmail.com");
        ms.setPort(587);
        ms.setUsername("andreipopescu052@gmail.com");
        ms.setPassword("pckxpjpncdzojkvl");
        ms.setJavaMailProperties(mailProperties);

        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo("andreipopescu052@gmail.com");
        mail.setFrom(email.getEmail());
        mail.setSubject("Contact:"+email.getName());
        mail.setText(email.getMessage());

        ms.send(mail);
    }
}
