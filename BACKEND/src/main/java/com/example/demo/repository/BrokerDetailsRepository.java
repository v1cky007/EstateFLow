package com.example.demo.repository;

import com.example.demo.model.BrokerDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BrokerDetailsRepository extends JpaRepository<BrokerDetails, Long> {
    // Method to find broker by email and password
    BrokerDetails findByEmailAndPassword(String email, String password);
}
