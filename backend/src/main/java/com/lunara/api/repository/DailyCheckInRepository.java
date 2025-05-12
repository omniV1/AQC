package com.lunara.api.repository;

import com.lunara.api.checkin.DailyCheckIn;
import com.lunara.api.user.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface DailyCheckInRepository extends JpaRepository<DailyCheckIn, UUID> {
    List<DailyCheckIn> findByClientOrderByCreatedAtDesc(Client client);
    List<DailyCheckIn> findByClientAndCreatedAtBetweenOrderByCreatedAtDesc(
        Client client, LocalDateTime start, LocalDateTime end);
} 