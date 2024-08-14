package com.example.demo.repository;

import com.example.demo.model.Housing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Repository
public interface HousingRepository extends JpaRepository<Housing, Long> {

    @Query("SELECT h FROM Housing h WHERE (:category IS NULL OR h.category = :category) " +
           "AND (:location IS NULL OR h.location = :location) " +
           "AND (:minPrice IS NULL OR h.estimatedPrice >= :minPrice) " +
           "AND (:maxPrice IS NULL OR h.estimatedPrice <= :maxPrice)")
    List<Housing> findByFilters(@Param("category") String category,
                                @Param("location") String location,
                                @Param("minPrice") Integer minPrice,
                                @Param("maxPrice") Integer maxPrice);
}
