package com.jee.jee_college_predictor.util;

import com.jee.jee_college_predictor.model.CutoffData;
import com.opencsv.bean.CsvToBeanBuilder;
import jakarta.annotation.PostConstruct;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * FIX #20: Reader now explicitly uses UTF-8 charset. Without this, on some
 *          Windows / Docker environments the JVM default charset (e.g. Cp1252)
 *          garbles non-ASCII characters in college names.
 *
 * FIX #21: withIgnoreEmptyLine(true) added so blank lines at end of CSV don't
 *          cause a CsvException that aborts the entire file load.
 *
 * FIX #22: withThrowExceptions(false) + withFilter added so individual bad rows
 *          are skipped rather than aborting the entire CSV parse.
 */
@Component
public class CsvReaderUtil {

    private List<CutoffData> cutoffDataList = Collections.emptyList();
    private static final String CSV_PATTERN = "classpath:data/*_with_state_region_aligned.csv";

    @PostConstruct
    public void init() {
        List<CutoffData> allData = new ArrayList<>();
        PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();

        try {
            Resource[] resources = resolver.getResources(CSV_PATTERN);
            System.out.println("[CsvReaderUtil] Found " + resources.length + " CSV file(s).");

            for (Resource resource : resources) {
                String filename = resource.getFilename();
                System.out.println("[CsvReaderUtil] Loading: " + filename);

                try (InputStream inputStream = resource.getInputStream();
                     // FIX #20: Explicit UTF-8 charset
                     Reader reader = new InputStreamReader(inputStream, StandardCharsets.UTF_8)) {

                    List<CutoffData> fileData = new CsvToBeanBuilder<CutoffData>(reader)
                            .withType(CutoffData.class)
                            .withIgnoreLeadingWhiteSpace(true)
                            // FIX #21: Skip blank lines
                            .withIgnoreEmptyLine(true)
                            // FIX #22: Don't abort on a single bad row; collect exceptions silently
                            .withThrowExceptions(false)
                            .build()
                            .parse();

                    long validRows = fileData.stream()
                            .filter(d -> d.getClosingRank() > 0)
                            .count();
                    System.out.println("[CsvReaderUtil] " + filename
                            + " → " + fileData.size() + " rows parsed, "
                            + validRows + " with valid closing rank.");
                    allData.addAll(fileData);

                } catch (Exception e) {
                    System.err.println("[CsvReaderUtil] ERROR loading " + filename + ": " + e.getMessage());
                    e.printStackTrace();
                }
            }

            cutoffDataList = Collections.unmodifiableList(allData);
            System.out.println("[CsvReaderUtil] Total entries loaded: " + cutoffDataList.size());

            if (!cutoffDataList.isEmpty()) {
                CutoffData sample = cutoffDataList.get(0);
                System.out.println("[CsvReaderUtil] Sample → Institute: " + sample.getInstitute()
                        + ", Program: " + sample.getAcademicProgram()
                        + ", Year: " + sample.getYear());
            }

        } catch (Exception e) {
            System.err.println("[CsvReaderUtil] FATAL: Could not resolve CSV files — " + e.getMessage());
            e.printStackTrace();
        }
    }

    public List<CutoffData> getCutoffData() {
        return cutoffDataList;   // already unmodifiable; service wraps in stream()
    }
}
