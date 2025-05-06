package com.lunara.api.checkin;

/**
 * Enumeration of possible mood levels for daily check-ins.
 * Used to track user's emotional state and identify potential mental health concerns.
 * Each level includes a descriptive message to help users accurately report their mood.
 */
public enum MoodLevel {
    /** Indicates severe distress or crisis - triggers immediate support notification */
    VERY_LOW("Very Low - Need immediate support"),
    
    /** Indicates significant struggle but not immediate crisis */
    LOW("Low - Struggling"),
    
    /** Indicates stable but potentially challenging state */
    NEUTRAL("Neutral - Managing"),
    
    /** Indicates positive emotional state */
    GOOD("Good - Doing well"),
    
    /** Indicates optimal emotional wellbeing */
    EXCELLENT("Excellent - Feeling great");

    private final String description;

    /**
     * Creates a new mood level with the specified description.
     * @param description Human-readable description of the mood level
     */
    MoodLevel(String description) {
        this.description = description;
    }

    /**
     * Gets the human-readable description of the mood level.
     * @return Description string explaining the mood level
     */
    public String getDescription() {
        return description;
    }
} 