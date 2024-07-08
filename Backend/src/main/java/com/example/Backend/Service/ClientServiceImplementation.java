package com.example.Backend.Service;


import com.example.Backend.Model.Client;
import com.example.Backend.Repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientServiceImplementation {

    @Autowired
    private ClientRepository clientRepository;

    public void register(Client client){
        clientRepository.save(client);
    }

    public void delete(Long id){
        clientRepository.deleteById(id);
    }

    public void update(Client client){
        clientRepository.save(client);
    }

    public List<Client> findByPhoneNumber(String phoneNumber){
      return  clientRepository.findByPhoneNumber(phoneNumber);
    }

    public List<Client> findByEmailAddress(String emailAddress) {
        return clientRepository.findByEmailAddress(emailAddress);
    }

    public boolean authenticateClient(String emailAddress, String password) {
        List<Client> users = findByEmailAddress(emailAddress);
        if (!users.isEmpty()) {
            Client user = users.get(0);
            return user.getPassword().equals(password);
        }
        return false;
    }

}
