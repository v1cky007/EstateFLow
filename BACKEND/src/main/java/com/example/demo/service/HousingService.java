package com.example.demo.service;

import com.example.demo.model.Housing;
import com.example.demo.repository.HousingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HousingService {

    @Autowired
    private HousingRepository housingRepository;

    public Housing saveHousing(Housing housing) {
        return housingRepository.save(housing);
    }

    public List<Housing> getAllHousings() {
        return housingRepository.findAll();
    }

    public Optional<Housing> getHousingById(Long id) {
        return housingRepository.findById(id);
    }

    public void deleteHousing(Long id) {
        housingRepository.deleteById(id);
    }

    public List<Housing> filterHousings(String category, String location, Integer minPrice, Integer maxPrice) {
        return housingRepository.findByFilters(category, location, minPrice, maxPrice);
    }
}
