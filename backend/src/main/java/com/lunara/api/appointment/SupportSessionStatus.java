package com.lunara.api.appointment;

/**
 * Represents the possible states of a support session.
 * - SCHEDULED: The support session is confirmed and upcoming
 * - COMPLETED: The support session has been conducted
 * - CANCELLED: The support session was cancelled by either party
 */
public enum SupportSessionStatus {
    SCHEDULED,
    COMPLETED,
    CANCELLED
} 