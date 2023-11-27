package com.ABC.Electronics.repository;

import com.ABC.Electronics.model.AdditionalInfo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AdditionalInfoRepository extends MongoRepository<AdditionalInfo, String> {

}
