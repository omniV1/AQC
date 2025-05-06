package com.lunara.api.repository;

import com.lunara.api.appointment.Appointment;
import com.lunara.api.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByClient(User client);
    List<Appointment> findByProvider(User provider);
    List<Appointment> findByStartTimeBetween(LocalDateTime start, LocalDateTime end);
    List<Appointment> findByStatus(String status);
} 