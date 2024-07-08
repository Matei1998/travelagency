package com.example.Backend.Controller;


import com.example.Backend.Model.DestinatiiPages;
import com.example.Backend.Service.DestinatiiPagesServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/DestinatiiPages")
@CrossOrigin
public class DestinatiiPagesController {

    @Autowired
    DestinatiiPagesServiceImplementation destinatiiPagesServiceImplementation;

    @PostMapping("/getAll")
    public List<DestinatiiPages> findAll(){
        return destinatiiPagesServiceImplementation.getAllDestinatiiPages();
    }

}
