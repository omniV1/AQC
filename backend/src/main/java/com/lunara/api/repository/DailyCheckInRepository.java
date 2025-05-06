package com.lunara.api.repository;

import com.lunara.api.checkin.DailyCheckIn;
import com.lunara.api.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface DailyCheckInRepository extends JpaRepository<DailyCheckIn, Long> {
    List<DailyCheckIn> findByUserOrderByCreatedAtDesc(User user);
    List<DailyCheckIn> findByUserAndCreatedAtBetweenOrderByCreatedAtDesc(
        User user, LocalDateTime start, LocalDateTime end);
} 