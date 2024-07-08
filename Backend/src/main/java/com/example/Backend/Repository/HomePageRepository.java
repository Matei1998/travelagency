package com.example.Backend.Repository;

import com.example.Backend.Model.HomePage;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HomePageRepository extends CrudRepository<HomePage, Long> {

    List<HomePage> findAll();
}
