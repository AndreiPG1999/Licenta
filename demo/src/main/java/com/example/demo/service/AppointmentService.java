package com.example.demo.service;

import com.example.demo.model.Appointment;
import com.example.demo.model.Istoric;
import com.example.demo.repo.AppointmentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class AppointmentService {
    private AppointmentRepo appointmentRepo;

    @Autowired
    public AppointmentService(AppointmentRepo appointmentRepo) {
        this.appointmentRepo = appointmentRepo;
    }

    public Appointment addAppointment(Appointment appointment){
        return appointmentRepo.save(appointment);
    }

    public List<Appointment> findAllAppointments(){ return appointmentRepo.findAll(); }
}
