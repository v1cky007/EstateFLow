package com.example.demo.service;

import com.example.demo.model.Broker;
import com.example.demo.repository.BrokerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BrokerService {

    @Autowired
    private BrokerRepository brokerRepository;

    public List<Broker> getAllBrokers() {
        return brokerRepository.findAll();
    }

    public Broker getBrokerById(Long id) {
        return brokerRepository.findById(id).orElse(null);
    }

    public Broker saveBroker(Broker broker) {
        return brokerRepository.save(broker);
    }

    public void deleteBroker(Long id) {
        brokerRepository.deleteById(id);
    }
}
