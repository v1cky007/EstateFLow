package com.example.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Planning {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String numberOfRooms;
    private String acres;
    private String squareFootage;

    @Lob
    @Column(name = "image", columnDefinition = "LONGTEXT")
    private String image; // Base64 encoded image string

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNumberOfRooms() { return numberOfRooms; }
    public void setNumberOfRooms(String numberOfRooms) { this.numberOfRooms = numberOfRooms; }
    public String getAcres() { return acres; }
    public void setAcres(String acres) { this.acres = acres; }
    public String getSquareFootage() { return squareFootage; }
    public void setSquareFootage(String squareFootage) { this.squareFootage = squareFootage; }
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
}
