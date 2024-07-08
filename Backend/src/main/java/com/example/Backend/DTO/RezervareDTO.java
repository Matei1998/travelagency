package com.example.Backend.DTO;

import lombok.Data;

import java.time.LocalDate;

@Data
public class RezervareDTO {

    private String locatie;
    private LocalDate startDate;
    private LocalDate endDate;

}
