package com.example.demo.controller;

import com.example.demo.model.Planning;
import com.example.demo.service.PlanningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/planning")
@CrossOrigin(origins = "http://localhost:3000")
public class PlanningController {

    @Autowired
    private PlanningService planningService;

    @PostMapping("/addplanning")
    public ResponseEntity<?> addNewPlanning(@RequestBody Planning planning) {
        try {
            Planning newPlanning = planningService.savePlanning(planning);
            return ResponseEntity.ok(newPlanning);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getall")
    public ResponseEntity<?> getAllPlannings() {
        try {
            List<Planning> planningList = planningService.getAllPlannings();
            return ResponseEntity.ok(planningList);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPlanningById(@PathVariable Long id) {
        try {
            Planning planning = planningService.getPlanningById(id);
            return planning != null ? ResponseEntity.ok(planning) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePlanning(@PathVariable Long id, @RequestBody Planning planning) {
        try {
            planning.setId(id);
            Planning updatedPlanning = planningService.savePlanning(planning);
            return ResponseEntity.ok(updatedPlanning);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePlanning(@PathVariable Long id) {
        try {
            planningService.deletePlanning(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/filter")
    public ResponseEntity<?> filterPlannings(
            @RequestParam(required = false) String numberOfRooms,
            @RequestParam(required = false) String acres,
            @RequestParam(required = false) String squareFootage) {
        try {
            List<Planning> filteredPlannings = planningService.filterPlannings(numberOfRooms, acres, squareFootage);
            return ResponseEntity.ok(filteredPlannings);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
