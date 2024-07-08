package com.example.Backend.Controller;

import com.example.Backend.Model.Client;
import com.example.Backend.Service.ClientServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/Client")
@CrossOrigin
public class ClientController {

    @Autowired
    private ClientServiceImplementation clientServiceImplementation;

    @PostMapping("/Register")
    public void register(@RequestBody Client client){
        clientServiceImplementation.register(client);
    }

    @PostMapping("/Delete")
    public void delete(@RequestBody Long id){
        clientServiceImplementation.delete(id);
    }

    @PostMapping("/Update")
    public void update(@RequestBody Client client){
        clientServiceImplementation.update(client);
    }

    @PostMapping("/FindByPhoneNumber")
    public List<Client> findByPhoneNumber(@RequestBody String phoneNumber){
        List<Client> clientList =clientServiceImplementation.findByPhoneNumber(phoneNumber);
        return clientList;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestParam String emailAddress, @RequestParam String password) {
        Map<String, String> response = new HashMap<>();
        if (clientServiceImplementation.authenticateClient(emailAddress, password)) {
            response.put("message", "Autentificare reușită!");
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Autentificare eșuată.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }



}
