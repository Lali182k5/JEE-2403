package com.jee.jee_college_predictor.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * FIX #17: Added missing fields `seatType`, `quota`, and `gender` so the
 *          front-end receives the complete CSV row data and can display /
 *          filter on those values.  Their absence meant compare and detail
 *          views showed "N/A" for category and gender.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class College {

    private String id;               // URL-safe slug (institute + branch)
    private String instituteName;
    private String branch;
    private String institutionType;
    private String state;
    private String region;

    // Cutoff data
    private int openingRank;
    private int closingRank;
    private int year;
    private int round;

    // FIX #17: These were missing — frontend Compare page shows "N/A" without them
    private String seatType;
    private String quota;
    private String gender;

    // Derived prediction fields
    private double matchPercentage;
    private int appliedCutoff;
    private String eligibilityStatus;
    private String admissionChance;
}
