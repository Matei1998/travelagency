package com.example.Backend.Service;

import com.example.Backend.Model.Destinatie;
import com.example.Backend.Model.Rezervare;
import com.example.Backend.Repository.RezervareRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
public class RezervareServiceImplementation {

    @Autowired
    private RezervareRepository rezervareRepository;

    @Autowired
    private DestinatieServiceImplementation destinatieService;

    public Rezervare efectueazaRezervare(Rezervare rezervare) {
        Optional<Destinatie> destinatieOpt = destinatieService.findByTitluDestinatie(rezervare.getLocatie());
        if (destinatieOpt.isPresent()) {
            Destinatie destinatie = destinatieOpt.get();
            long zile = ChronoUnit.DAYS.between(rezervare.getDataInceput(), rezervare.getDataFinal()) + 1;
            int costTotal = (int) (zile * destinatie.getPretPerZi());
            rezervare.setCostTotal(costTotal);
            rezervare.setDataRezervare(LocalDate.now());
            return rezervareRepository.save(rezervare);
        } else {
            throw new RuntimeException("Destinatia nu a fost găsită");
        }
    }
    public boolean verificaDisponibilitate(String locatie, LocalDate dataInceput, LocalDate dataFinal) {
       List<Rezervare> rezervareList = rezervareRepository.findAllByLocatie(locatie);
        for (Rezervare rezervare : rezervareList) {
            LocalDate rezervareStart = rezervare.getDataInceput();
            LocalDate rezervareEnd = rezervare.getDataFinal();
            if (!(dataFinal.isBefore(rezervareStart) || dataInceput.isAfter(rezervareEnd))) {
                return false;
            }
        }
        return true;
    }

}
