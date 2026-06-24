package com.jee.jee_college_predictor.model;

import com.opencsv.bean.AbstractBeanField;
import com.opencsv.exceptions.CsvConstraintViolationException;
import com.opencsv.exceptions.CsvDataTypeMismatchException;

/**
 * Converts rank values from CSV. Handles:
 * - Empty / null  → 0
 * - Prepended 'P' (preparatory rank like P123) → strips P
 * - Comma-separated numbers (e.g. "1,234") → removes commas
 */
public class RankConverter extends AbstractBeanField<Integer, String> {

    @Override
    protected Integer convert(String value) throws CsvDataTypeMismatchException, CsvConstraintViolationException {
        if (value == null || value.trim().isEmpty()) {
            return 0;
        }
        // FIX #18: Also strip commas (some CSV exports use "1,234" formatting)
        String cleaned = value.trim().toUpperCase().replace("P", "").replace(",", "");
        try {
            return Integer.parseInt(cleaned);
        } catch (NumberFormatException e) {
            // Return 0 instead of throwing — bad rows are silently skipped by
            // the service's `closingRank > 0` filter rather than crashing load.
            return 0;
        }
    }
}
