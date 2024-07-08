package com.example.Backend.Controller;

import com.example.Backend.DTO.RezervareDTO;
import com.example.Backend.Model.Rezervare;
import com.example.Backend.Service.RezervareServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rezervari")
@CrossOrigin
public class RezervareController {

    @Autowired
    private RezervareServiceImplementation rezervareService;

    @PostMapping("/efectuare")
    public Rezervare efectueazaRezervare(@RequestBody Rezervare rezervare) {
        return rezervareService.efectueazaRezervare(rezervare);
    }
    @PostMapping("/verificaDisponibilitate")
    public ResponseEntity<Boolean> verificaDisponibilitate(@RequestBody RezervareDTO rezervareDTO) {

        boolean disponibilitate = rezervareService.verificaDisponibilitate(rezervareDTO.getLocatie(),rezervareDTO.getStartDate(),rezervareDTO.getEndDate());
        return ResponseEntity.ok(disponibilitate);
    }
}
