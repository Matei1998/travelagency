package com.example.Backend.Repository;

import com.example.Backend.Model.Client;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientRepository extends CrudRepository<Client,Long> {

        List<Client> findByPhoneNumber(String phoneNumber);

        List<Client> findByEmailAddress(String emailAddress);

}
