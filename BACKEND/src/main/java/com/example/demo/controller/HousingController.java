package com.example.demo.controller;

import com.example.demo.model.Housing;
import com.example.demo.service.HousingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/housings")
@CrossOrigin(origins = "http://localhost:3000")
public class HousingController {

    @Autowired
    private HousingService housingService;

    @PostMapping("/addhousing")
    public ResponseEntity<?> addNewHousing(@RequestBody Housing housing) {
        try {
            Housing newHousing = housingService.saveHousing(housing);
            return ResponseEntity.ok(newHousing);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getall")
    public ResponseEntity<?> getAllHousings() {
        try {
            List<Housing> housingList = housingService.getAllHousings();
            return ResponseEntity.ok(housingList);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/filter")
    public ResponseEntity<?> filterHousings(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) Integer minPrice,
            @RequestParam(required = false) Integer maxPrice) {

        try {
            List<Housing> filteredList = housingService.filterHousings(category, location, minPrice, maxPrice);
            return ResponseEntity.ok(filteredList);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateHousing(@PathVariable Long id, @RequestBody Housing housing) {
        try {
            Optional<Housing> existingHousing = housingService.getHousingById(id);
            if (existingHousing.isPresent()) {
                housing.setId(id);
                Housing updatedHousing = housingService.saveHousing(housing);
                return ResponseEntity.ok(updatedHousing);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteHousing(@PathVariable Long id) {
        try {
            housingService.deleteHousing(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/statistics")
    public ResponseEntity<?> getHousingStatistics() {
        try {
            List<Housing> housingList = housingService.getAllHousings();
            Map<String, Integer> stats = new HashMap<>();
            int totalHousings = housingList.size();

            for (Housing housing : housingList) {
                stats.put(housing.getCategory(), stats.getOrDefault(housing.getCategory(), 0) + 1);
            }

            stats.put("totalHousings", totalHousings);

            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
