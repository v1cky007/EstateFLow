package com.example.demo.service;

import com.example.demo.model.BrokerDetails;
import com.example.demo.repository.BrokerDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BrokerDetailsService {

    @Autowired
    private BrokerDetailsRepository brokerDetailsRepository;

    public List<BrokerDetails> getAllBrokerDetails() {
        return brokerDetailsRepository.findAll();
    }

    public BrokerDetails getBrokerDetailsById(Long id) {
        return brokerDetailsRepository.findById(id).orElse(null);
    }

    public BrokerDetails saveBrokerDetails(BrokerDetails brokerDetails) {
        return brokerDetailsRepository.save(brokerDetails);
    }

    public void deleteBrokerDetails(Long id) {
        brokerDetailsRepository.deleteById(id);
    }

    // New method for authenticating brokers
    public BrokerDetails authenticateBroker(String email, String password) {
        return brokerDetailsRepository.findByEmailAndPassword(email, password); // Adjust this as per your repository method
    }
}
