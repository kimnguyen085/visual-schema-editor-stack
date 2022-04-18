package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.constants.Constants;
import com.example.demo.services.ApiServices;

@RestController
@RequestMapping(Constants.REST_JSON_ROOT)
public class ApiController {
    
    @Autowired
    private ApiServices apiServices;

    @PostMapping(value = Constants.REST_JSON_POST_SAVE)
    public ResponseEntity<?> create(@RequestBody String data) throws Exception {
        
        apiServices.saveSchema(data);
        return ResponseEntity.ok("Saved schema successfully");
    }

}
