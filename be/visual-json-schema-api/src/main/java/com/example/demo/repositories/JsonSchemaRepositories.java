package com.example.demo.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.example.demo.model.JsonSchema;

@Repository
public interface JsonSchemaRepositories extends JpaRepository<JsonSchema, Long>, JpaSpecificationExecutor<JsonSchema> {

    Optional<JsonSchema> findById(final Long id);
    Optional<JsonSchema> findByIdAndGeneratedSchema(final Long id,final String generatedSchema);

}
