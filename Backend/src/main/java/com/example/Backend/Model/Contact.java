package com.example.Backend.Model;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Contact {

    @Id
    private String telefon;

    private String email;

    private String orar;

}
