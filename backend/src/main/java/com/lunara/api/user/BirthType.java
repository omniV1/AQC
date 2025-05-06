package com.lunara.api.user;

/**
 * Enumeration of possible birth types.
 * Used to track and categorize different birth experiences.
 * Multiple values can apply to a single birth experience.
 */
public enum BirthType {
    /** Traditional vaginal delivery */
    VAGINAL,
    
    /** Cesarean section delivery */
    C_SECTION,
    
    /** Vaginal birth after previous cesarean */
    VBAC,
    
    /** Birth without pain medication */
    UNMEDICATED,
    
    /** Birth with pain medication (e.g., epidural) */
    MEDICATED,
    
    /** Birth that took place at home */
    HOME_BIRTH,
    
    /** Birth at a dedicated birth center */
    BIRTH_CENTER,
    
    /** Birth at a hospital facility */
    HOSPITAL
} 