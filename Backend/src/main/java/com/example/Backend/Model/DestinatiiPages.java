package com.example.Backend.Model;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import org.springframework.data.relational.core.mapping.Column;

@Data
@Entity
public class DestinatiiPages {

    @Id
    private Long id;

    @Column("adresa_grecia")
    private String adresaGrecia;

    @Column("adresa_tailanda")
    private String adresaTailanda;

    @Column("adresa_turcia")
    private String adresaTurcia;

    @Column("adresa_republicadominicana")
    private String adresaRepublicadominicana;

    @Column("adresa_maldive")
    private String adresaMaldive;

    @Column("adresa_indonezia")
    private String adresaIndonezia;


}
