package com.example.demo.service;

import com.example.demo.model.BrokerHousing;
import com.example.demo.repository.BrokerHousingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BrokerHousingService {

    @Autowired
    private BrokerHousingRepository brokerHousingRepository;

    public void saveHousing(BrokerHousing brokerHousing) {
        brokerHousingRepository.save(brokerHousing);
    }
}
