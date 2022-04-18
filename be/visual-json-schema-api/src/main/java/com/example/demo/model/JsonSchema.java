package com.example.demo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "json_schema_jpa")
public class JsonSchema{

    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @Column(name = "generated_schema", nullable = true, columnDefinition = "text")
    private String generatedSchema;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGeneratedSchema() {
        return generatedSchema;
    }

    public void setGeneratedSchema(String generatedSchema) {
        this.generatedSchema = generatedSchema;
    }

    public JsonSchema(String generatedSchema) {
        super();
        this.generatedSchema = generatedSchema;
    }

    public JsonSchema() {}
}


