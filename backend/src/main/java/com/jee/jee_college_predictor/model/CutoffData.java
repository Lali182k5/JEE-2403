package com.jee.jee_college_predictor.model;

import com.opencsv.bean.CsvBindByName;
import com.opencsv.bean.CsvCustomBindByName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Maps directly to the CSV columns:
 * Year, Round, Institute, Academic Program Name, Quota,
 * Seat Type, Gender, Opening Rank, Closing Rank, State, Region, Institute Type
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CutoffData {

    @CsvBindByName(column = "Year")
    private int year;

    @CsvBindByName(column = "Round")
    private int round;

    @CsvBindByName(column = "Institute")
    private String institute;

    @CsvBindByName(column = "Academic Program Name")
    private String academicProgram;

    @CsvBindByName(column = "Quota")
    private String quota;

    @CsvBindByName(column = "Seat Type")
    private String seatType;

    @CsvBindByName(column = "Gender")
    private String gender;

    @CsvBindByName(column = "State")
    private String state;

    @CsvBindByName(column = "Region")
    private String region;

    @CsvBindByName(column = "Institute Type")
    private String institutionType;

    @CsvCustomBindByName(column = "Opening Rank", converter = RankConverter.class)
    private int openingRank;

    @CsvCustomBindByName(column = "Closing Rank", converter = RankConverter.class)
    private int closingRank;
}
