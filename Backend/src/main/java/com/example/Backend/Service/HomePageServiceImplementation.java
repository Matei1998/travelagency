package com.example.Backend.Service;


import com.example.Backend.Model.HomePage;
import com.example.Backend.Repository.HomePageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HomePageServiceImplementation {

    @Autowired
    HomePageRepository homePageRepository;

    public List<HomePage> getAllHomePages(){
        return homePageRepository.findAll();
    }


}
