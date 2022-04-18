package com.example.demo.services;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import com.example.demo.exception.CustomException;
import com.example.demo.model.JsonSchema;
import com.example.demo.repositories.JsonSchemaRepositories;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class ApiServices {
    
    @Autowired
    private JsonSchemaRepositories jsonSchemaRepositories;
    
    private ObjectMapper objectMapper = new ObjectMapper();

    public void saveSchema(String data) throws CustomException {
        try {
            Map<String, Object> parsedJson = objectMapper.readValue(data, Map.class);
//            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR).message("eeeeee");
            JsonSchema newSchema = new JsonSchema(objectMapper.writeValueAsString(parsedJson));
            jsonSchemaRepositories.save(newSchema);
        } catch (JsonProcessingException e) {
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR).message(e.getMessage());
        }
    }

}
