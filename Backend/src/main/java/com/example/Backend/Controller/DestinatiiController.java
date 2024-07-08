package com.example.Backend.Controller;


import com.example.Backend.Model.Destinatie;
import com.example.Backend.Service.DestinatieServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/Destinatii")
@CrossOrigin
public class DestinatiiController {

    @Autowired
    private DestinatieServiceImplementation destinatieServiceImplementation;


    @PostMapping("/Insert")
    public void insert(@RequestBody Destinatie destinatie){
        destinatieServiceImplementation.insert(destinatie);
    }

    @PostMapping("/Delete")
    public void delete(@RequestBody Long id){
        destinatieServiceImplementation.delete(id);
    }

    @PostMapping("/Update")
    public void update(@RequestBody Destinatie destinatie){
        destinatieServiceImplementation.update(destinatie);
    }

    @GetMapping("/getAll")
    public List<Destinatie> getAll() {
        return destinatieServiceImplementation.getAllDestinatii();
    }

    @GetMapping("/{titluDestinatie}")
    public Optional<Destinatie> getDestinatieByTitlu(@PathVariable String titluDestinatie) {
        return destinatieServiceImplementation.findByTitluDestinatie(titluDestinatie);
    }

}
