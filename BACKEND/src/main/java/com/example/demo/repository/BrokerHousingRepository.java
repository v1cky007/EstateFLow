package com.example.demo.repository;

import com.example.demo.model.BrokerHousing;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BrokerHousingRepository extends JpaRepository<BrokerHousing, Long> {
}
