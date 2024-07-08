package com.example.Backend.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import org.springframework.data.relational.core.mapping.Column;

@Data
@Entity
public class Destinatie {

    @Id
    private Long id;

    @Column("adresa_imagine")
    private String adresaImagine;

    @Column("titlu_destinatie")
    private String titluDestinatie;

    private String descriere;

    private Integer pretPerZi;

}