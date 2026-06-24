package com.jee.jee_college_predictor.model;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * FIX #9: Added Bean Validation annotations so the controller can enforce
 * constraints without manual null-checks scattered in the service layer.
 * FIX #10: jeeRank was `int` (primitive), so it defaulted to 0 when missing
 * from the JSON body — silently passing the > 0 guard. Changed to Integer so
 * a missing field produces a proper validation error.
 */
@Data
public class UserInput {

    @NotNull(message = "JEE rank is required")
    @Min(value = 1, message = "JEE rank must be at least 1")
    private Integer jeeRank;

    @NotBlank(message = "Category is required")
    private String category;

    @NotBlank(message = "Gender is required")
    private String gender;

    // Optional filters — null means "no filter"
    private String institutionTypeFilter;
    private Integer yearFilter;
    private Integer roundFilter;
    private String stateFilter;
    private String regionFilter;
}
