package com.jee.jee_college_predictor.service;

import com.jee.jee_college_predictor.model.College;
import com.jee.jee_college_predictor.model.CutoffData;
import com.jee.jee_college_predictor.model.UserInput;
import com.jee.jee_college_predictor.util.CsvReaderUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

/**
 * FIX #12: Institution type filter now uses data.getInstitutionType() (the
 *          actual CSV column "Institute Type") instead of parsing the name
 *          via mapInstituteToType(). The old approach misclassified colleges
 *          whose names didn't contain the expected substring.
 *
 * FIX #17: College object now also sets seatType, quota, gender so the
 *          frontend receives the full row data.
 *
 * FIX #19: Rank broadening multiplier changed from 5× to 2× to avoid
 *          returning tens of thousands of irrelevant rows for low ranks,
 *          which caused UI slowness.  Top 100 limit is preserved.
 */
@Service
public class PredictionService {

    @Autowired
    private CsvReaderUtil csvReaderUtil;

    public List<College> getPredictedColleges(UserInput userInput) {
        List<CutoffData> allCutoffData = csvReaderUtil.getCutoffData();

        final int userRank = userInput.getJeeRank();
        final String userCategory = StringUtils.hasText(userInput.getCategory())
                ? userInput.getCategory().trim().toUpperCase(Locale.ROOT) : "OPEN";
        final String userGender    = normalizeGender(userInput.getGender());
        final String stateFilter   = userInput.getStateFilter()   != null ? userInput.getStateFilter().trim()   : "";
        final String regionFilter  = userInput.getRegionFilter()  != null ? userInput.getRegionFilter().trim()  : "";
        final String typeFilter    = StringUtils.hasText(userInput.getInstitutionTypeFilter())
                ? userInput.getInstitutionTypeFilter().trim() : "";

        List<College> results = allCutoffData.stream()

                // Skip rows with invalid closing rank
                .filter(data -> data.getClosingRank() > 0)

                // FIX #19: Broaden to 2× instead of 5× — reduces noise, keeps stretch colleges
                .filter(data -> userRank <= data.getClosingRank() * 2)

                // Optional filters
                .filter(data -> !StringUtils.hasText(stateFilter)
                        || stateFilter.equalsIgnoreCase(data.getState()))
                .filter(data -> !StringUtils.hasText(regionFilter)
                        || regionFilter.equalsIgnoreCase(data.getRegion()))
                .filter(data -> userInput.getYearFilter()  == null
                        || data.getYear()  == userInput.getYearFilter())
                .filter(data -> userInput.getRoundFilter() == null
                        || data.getRound() == userInput.getRoundFilter())

                // Category (Seat Type) match
                .filter(data -> {
                    String seat = data.getSeatType() == null ? ""
                            : data.getSeatType().trim().toUpperCase();
                    return seat.isEmpty()
                            || seat.equals(userCategory)
                            || userCategory.equals("OPEN")
                            || seat.contains(userCategory);
                })

                // Gender match
                .filter(data -> {
                    String rowGender = data.getGender() == null ? "" : data.getGender().trim();
                    return rowGender.equalsIgnoreCase("Gender-Neutral")
                            || rowGender.equalsIgnoreCase(userGender)
                            || (rowGender.toLowerCase().contains("female")
                                && userGender.equalsIgnoreCase("Female-only (including Supernumerary)"))
                            || userGender.isEmpty();
                })

                // FIX #12: Institution type filter uses the CSV column directly
                .filter(data -> {
                    if (!StringUtils.hasText(typeFilter)) return true;
                    String csvType = data.getInstitutionType() == null ? "" : data.getInstitutionType().trim();
                    return csvType.equalsIgnoreCase(typeFilter);
                })

                .map(data -> {
                    int cutoff = data.getClosingRank();

                    // Compute match percentage
                    double match;
                    if (userRank <= cutoff * 0.8)      match = 92 + Math.random() * 7;
                    else if (userRank <= cutoff)        match = 75 + Math.random() * 12;
                    else if (userRank <= cutoff * 1.2)  match = 55 + Math.random() * 12;
                    else if (userRank <= cutoff * 1.5)  match = 35 + Math.random() * 15;
                    else                                match = 10 + Math.random() * 25;

                    // Boost for matched filters
                    if (StringUtils.hasText(regionFilter)
                            && regionFilter.equalsIgnoreCase(data.getRegion()))  match += 4;
                    if (StringUtils.hasText(stateFilter)
                            && stateFilter.equalsIgnoreCase(data.getState()))    match += 3;
                    if (StringUtils.hasText(typeFilter)
                            && typeFilter.equalsIgnoreCase(data.getInstitutionType())) match += 4;

                    match = Math.max(0, Math.min(100, Math.round(match)));

                    String eligibility    = userRank <= cutoff ? "Eligible" : "Not Eligible";
                    String admissionChance = match > 75 ? "High" : match > 45 ? "Medium" : "Low";

                    College c = new College();

                    // FIX #17: Populate all fields including seatType / quota / gender
                    c.setInstituteName(data.getInstitute());
                    c.setBranch(data.getAcademicProgram());
                    c.setInstitutionType(data.getInstitutionType()); // FIX #12
                    c.setOpeningRank(data.getOpeningRank());
                    c.setClosingRank(data.getClosingRank());
                    c.setYear(data.getYear());
                    c.setRound(data.getRound());
                    c.setState(data.getState());
                    c.setRegion(data.getRegion());
                    c.setSeatType(data.getSeatType());   // FIX #17
                    c.setQuota(data.getQuota());         // FIX #17
                    c.setGender(data.getGender());       // FIX #17
                    c.setAppliedCutoff(cutoff);
                    c.setMatchPercentage(match);
                    c.setEligibilityStatus(eligibility);
                    c.setAdmissionChance(admissionChance);

                    String slug = (data.getInstitute() + "-" + data.getAcademicProgram())
                            .toLowerCase().replaceAll("[^a-z0-9]+", "-");
                    c.setId(slug);

                    return c;
                })
                .sorted((a, b) -> Double.compare(b.getMatchPercentage(), a.getMatchPercentage()))
                .limit(100)
                .collect(Collectors.toList());

        return results;
    }

    private String normalizeGender(String gender) {
        if (gender == null || gender.isEmpty()) return "Gender-Neutral";
        String lower = gender.toLowerCase().trim();
        if (lower.contains("neutral") || lower.equals("all")) return "Gender-Neutral";
        if (lower.contains("female") || lower.equals("f"))    return "Female-only (including Supernumerary)";
        if (lower.contains("male")   || lower.equals("m"))    return "Male";
        return gender;
    }
}
