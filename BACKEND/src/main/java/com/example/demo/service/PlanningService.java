package com.example.demo.service;

import com.example.demo.model.Planning;
import com.example.demo.repository.PlanningRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlanningService {

    @Autowired
    private PlanningRepository planningRepository;

    public Planning savePlanning(Planning planning) {
        return planningRepository.save(planning);
    }

    public List<Planning> getAllPlannings() {
        return planningRepository.findAll();
    }

    public Planning getPlanningById(Long id) {
        return planningRepository.findById(id).orElse(null);
    }

    public void deletePlanning(Long id) {
        planningRepository.deleteById(id);
    }

    public List<Planning> filterPlannings(String numberOfRooms, String acres, String squareFootage) {
        if ((numberOfRooms == null || numberOfRooms.isEmpty()) && 
            (acres == null || acres.isEmpty()) && 
            (squareFootage == null || squareFootage.isEmpty())) {
            return planningRepository.findAll();
        }
        return planningRepository.findByNumberOfRoomsContainingIgnoreCaseAndAcresContainingIgnoreCaseAndSquareFootageContainingIgnoreCase(
                numberOfRooms != null ? numberOfRooms : "",
                acres != null ? acres : "",
                squareFootage != null ? squareFootage : ""
        );
    }
}
