package com.example.Backend.Service;


import com.example.Backend.Model.Contact;
import com.example.Backend.Repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;


    public List<Contact> getAllContacts(){
        return (List<Contact>) contactRepository.findAll();
    }
}
