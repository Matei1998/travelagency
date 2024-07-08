package com.example.Backend.Service;


import com.example.Backend.Model.DestinatiiPages;
import com.example.Backend.Repository.DestinatiiPagesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DestinatiiPagesServiceImplementation {

    @Autowired
    private DestinatiiPagesRepository destinatiiPagesRepository;

    public List<DestinatiiPages> getAllDestinatiiPages(){
        return destinatiiPagesRepository.findAll();
    }


}
