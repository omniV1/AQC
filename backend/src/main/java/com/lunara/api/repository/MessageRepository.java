package com.lunara.api.repository;

import com.lunara.api.message.Message;
import com.lunara.api.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface MessageRepository extends JpaRepository<Message, UUID> {
    List<Message> findBySender(User sender);
    List<Message> findByRecipient(User recipient);
    List<Message> findByRecipientAndRead(User recipient, boolean read);
    List<Message> findBySenderOrRecipientOrderByCreatedAtDesc(User sender, User recipient);
    List<Message> findByRecipientAndReadFalseOrderByCreatedAtDesc(User recipient);
    long countByRecipientAndReadFalse(User recipient);
} 