package com.example.Backend.Controller;


import com.example.Backend.Model.Contact;
import com.example.Backend.Service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController()
@RequestMapping("/Contact")
public class ContactController {

    @Autowired
    private ContactService contactService;


    @GetMapping("/getAll")
    public List<Contact> getAllContacts(){
        return contactService.getAllContacts();
    }


}
