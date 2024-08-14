package com.example.demo.controller;

import com.example.demo.model.Broker;
import com.example.demo.service.BrokerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/brokers")
public class BrokerController {

    @Autowired
    private BrokerService brokerService;

    @GetMapping
    public List<Broker> getAllBrokers() {
        return brokerService.getAllBrokers();
    }

    @GetMapping("/{id}")
    public Broker getBrokerById(@PathVariable Long id) {
        return brokerService.getBrokerById(id);
    }

    @PostMapping
    public Broker createBroker(@RequestBody Broker broker) {
        return brokerService.saveBroker(broker);
    }

    @PutMapping("/{id}")
    public Broker updateBroker(@PathVariable Long id, @RequestBody Broker broker) {
        broker.setId(id);
        return brokerService.saveBroker(broker);
    }

    @DeleteMapping("/{id}")
    public void deleteBroker(@PathVariable Long id) {
        brokerService.deleteBroker(id);
    }
}
