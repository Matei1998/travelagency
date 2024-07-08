package com.example.Backend.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;


@Data
@Entity
public class HomePage {

    @Id
    private String title;

    private String para1;

    private String para2;


}
