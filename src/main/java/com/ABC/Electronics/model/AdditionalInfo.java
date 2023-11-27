package com.ABC.Electronics.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "additional_info")
public class AdditionalInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    private String childName;
    private String birthDate;
    private String gender;
    private boolean studying;
    private boolean playsVideoGames;
    private String videoGamePlatforms;
    private String birthPlaceCity;
    private String birthPlaceState;
    private String birthPlaceCountry;
    private String locationCity;
    private String locationState;
    private String locationCountry;
    private String postalCode;
    private String hobbies;
    private String sports;
    private String maritalStatus;
    private String marriageDate;
    private String spouseInfo;
    private String productCategoriesOfInterest;

    // Getters and Setters
}
