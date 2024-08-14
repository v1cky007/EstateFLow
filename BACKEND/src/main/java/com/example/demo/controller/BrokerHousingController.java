package com.example.demo.controller;

import com.example.demo.model.BrokerHousing;
import com.example.demo.service.BrokerHousingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/brokerhousings")
public class BrokerHousingController {

    @Autowired
    private BrokerHousingService brokerHousingService;

    @PostMapping("/addhousing")
    public ResponseEntity<?> addBrokerHousing(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("owner") String owner,
            @RequestParam("estimatedPrice") String estimatedPrice,
            @RequestParam("location") String location,
            @RequestParam("category") String category,
            @RequestParam("image") MultipartFile image,
            @RequestParam("username") String username) {

        String imageBase64 = "";
        if (!image.isEmpty()) {
            try {
                byte[] bytes = image.getBytes();
                imageBase64 = java.util.Base64.getEncoder().encodeToString(bytes);
            } catch (IOException e) {
                return new ResponseEntity<>("Failed to process image", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        BrokerHousing brokerHousing = new BrokerHousing(title, description, owner, estimatedPrice, location, category, imageBase64, username);
        brokerHousingService.saveHousing(brokerHousing);

        return ResponseEntity.ok("Broker housing added successfully");
    }
}
