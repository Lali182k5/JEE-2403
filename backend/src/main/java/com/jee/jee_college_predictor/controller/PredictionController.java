package com.jee.jee_college_predictor.controller;

import com.jee.jee_college_predictor.model.College;
import com.jee.jee_college_predictor.model.UserInput;
import com.jee.jee_college_predictor.service.PredictionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * FIX #11: Added @Valid on the @RequestBody parameter so that Bean Validation
 *          constraints on UserInput are actually enforced (without @Valid they
 *          are silently ignored).
 * FIX #12: Removed the manual null-check that was redundant after adding @Valid.
 * FIX #13: Added Swagger @Operation / @Tag annotations for the Swagger UI.
 * FIX #14: @CrossOrigin kept here as a belt-and-suspenders guard; the global
 *          CorsConfig bean is the primary mechanism.
 */
@RestController
@RequestMapping("/api/predict")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "http://localhost:5174"})
@Tag(name = "College Prediction", description = "JEE college prediction endpoints")
public class PredictionController {

    @Autowired
    private PredictionService predictionService;

    @PostMapping
    @Operation(summary = "Predict colleges based on JEE rank and filters")
    public ResponseEntity<List<College>> predictColleges(@Valid @RequestBody UserInput userInput) {
        List<College> predictedColleges = predictionService.getPredictedColleges(userInput);
        return ResponseEntity.ok(predictedColleges);
    }

    /**
     * FIX #15: Added a GET health/status endpoint so the frontend health()
     *          helper in api.js can call /api/predict/status instead of the
     *          actuator (which may not always be enabled).
     */
    @GetMapping("/status")
    @Operation(summary = "Check if the prediction service is ready")
    public ResponseEntity<String> status() {
        return ResponseEntity.ok("Prediction service is running");
    }
}
