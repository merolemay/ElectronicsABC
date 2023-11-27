package com.ABC.Electronics.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@AllArgsConstructor
@Builder
@Data
@NoArgsConstructor
@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class AdditionalInfo {
    @jakarta.persistence.Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;

    private String childName;
    private String birthDate;
    private String gender;
    private boolean studying;
    private boolean playsVideoGames;

    @ElementCollection
    private Set<String> videoGamePlatforms = new HashSet<>();

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


    @OneToMany(mappedBy = "additionalInfo", cascade = CascadeType.ALL)
    @JsonIdentityReference(alwaysAsId = true)
    private Set<Customer> customers = new HashSet<>();

}
