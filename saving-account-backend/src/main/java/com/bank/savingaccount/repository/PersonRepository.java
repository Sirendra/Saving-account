package com.bank.savingaccount.repository;

import com.bank.savingaccount.dto.PersonSummary;
import com.bank.savingaccount.model.Person;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface PersonRepository extends MongoRepository<Person, String> {
    Optional<Person> findByEmail(String email);
    Optional<Person> findByCitizenId(String citizenId);
    List<PersonSummary> findAllBy();
}
