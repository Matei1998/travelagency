package com.example.Backend.Model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
public class Rezervare {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String locatie;

    private LocalDate dataInceput;

    private LocalDate dataFinal;

    private LocalDate dataRezervare;

    private Integer costTotal;


}
