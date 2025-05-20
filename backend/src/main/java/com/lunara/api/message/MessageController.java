package com.lunara.api.message;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import com.lunara.api.repository.MessageRepository;
import com.lunara.api.user.User;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/messages")
@RequiredArgsConstructor
@Tag(name = "Messages", description = "Message management APIs")
@SecurityRequirement(name = "Bearer Authentication")
public class MessageController {

    private final MessageRepository messageRepository;

    @Operation(summary = "Send a new message")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Message sent successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid input"),
        @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @PostMapping
    public ResponseEntity<Message> sendMessage(
            @AuthenticationPrincipal User sender,
            @RequestBody Message message) {
        message.setSender(sender);
        return ResponseEntity.ok(messageRepository.save(message));
    }

    @Operation(summary = "Get all messages for the authenticated user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "List of messages retrieved"),
        @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @GetMapping
    public ResponseEntity<List<Message>> getMyMessages(
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(
            messageRepository.findBySenderOrRecipientOrderByCreatedAtDesc(user, user)
        );
    }

    @Operation(summary = "Get unread messages")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "List of unread messages retrieved"),
        @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @GetMapping("/unread")
    public ResponseEntity<List<Message>> getUnreadMessages(
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(
            messageRepository.findByRecipientAndReadFalseOrderByCreatedAtDesc(user)
        );
    }

    @Operation(summary = "Mark message as read")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Message marked as read"),
        @ApiResponse(responseCode = "404", description = "Message not found"),
        @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @PutMapping("/{id}/read")
    public ResponseEntity<Message> markAsRead(
            @Parameter(description = "Message ID") @PathVariable UUID id) {
        Message message = messageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Message not found"));
        message.setRead(true);
        return ResponseEntity.ok(messageRepository.save(message));
    }

    @Operation(summary = "Get unread message count")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Unread message count retrieved"),
        @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @GetMapping("/unread/count")
    public ResponseEntity<Long> getUnreadCount(
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(messageRepository.countByRecipientAndReadFalse(user));
    }
} 