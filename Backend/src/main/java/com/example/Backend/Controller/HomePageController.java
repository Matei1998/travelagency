package com.example.Backend.Controller;

import com.example.Backend.Model.HomePage;
import com.example.Backend.Service.HomePageServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/HomePage")
@CrossOrigin
public class HomePageController {

    @Autowired
    private HomePageServiceImplementation homePageServiceImplementation;


    @GetMapping("/getAll")
    public List<HomePage> getAll() {
        return homePageServiceImplementation.getAllHomePages();
    }


}
