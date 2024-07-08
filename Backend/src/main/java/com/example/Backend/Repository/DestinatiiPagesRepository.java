package com.example.Backend.Repository;

import com.example.Backend.Model.DestinatiiPages;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DestinatiiPagesRepository extends CrudRepository<DestinatiiPages, Long> {

    List<DestinatiiPages> findAll();

}
