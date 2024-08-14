package com.example.demo.controller;

import com.example.demo.model.BrokerDetails;
import com.example.demo.model.LoginRequest;  // Ensure this is the correct import
import com.example.demo.service.BrokerDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/broker-details")
public class BrokerDetailsController {

    @Autowired
    private BrokerDetailsService brokerDetailsService;

    @GetMapping
    public List<BrokerDetails> getAllBrokerDetails() {
        return brokerDetailsService.getAllBrokerDetails();
    }

    @GetMapping("/{id}")
    public BrokerDetails getBrokerDetailsById(@PathVariable Long id) {
        return brokerDetailsService.getBrokerDetailsById(id);
    }

    @PostMapping
    public BrokerDetails createBrokerDetails(@RequestBody BrokerDetails brokerDetails) {
        return brokerDetailsService.saveBrokerDetails(brokerDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteBrokerDetails(@PathVariable Long id) {
        brokerDetailsService.deleteBrokerDetails(id);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginBroker(@RequestBody LoginRequest loginRequest) {
        BrokerDetails broker = brokerDetailsService.authenticateBroker(loginRequest.getEmail(), loginRequest.getPassword());
        if (broker != null) {
            return ResponseEntity.ok(broker);
        } else {
            return ResponseEntity.status(401).body("Invalid email or password.");
        }
    }
}
