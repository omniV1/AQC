package com.lunara.api.user;

/**
 * Enumeration of infant feeding methods.
 * Used to track and support different feeding choices.
 * Multiple values can apply to a single feeding journey.
 */
public enum FeedingStyle {
    /** Direct breastfeeding/nursing */
    BREASTFEEDING,
    
    /** Exclusively formula feeding */
    FORMULA,
    
    /** Combination of breast milk and formula */
    MIXED,
    
    /** Expressing breast milk via pump */
    PUMPING,
    
    /** Supplemental nursing system */
    SNS,
    
    /** Medical feeding tube system */
    TUBE_FEEDING
} 