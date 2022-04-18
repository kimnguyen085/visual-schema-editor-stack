package com.example.demo.exception;

import org.springframework.http.HttpStatus;

public class CustomException extends Exception{

    private static final long serialVersionUID = 1L;

    private String message;

    private HttpStatus status;

    public CustomException(HttpStatus httpStatus) {
      this.status = httpStatus;
    }

    @Override
    public String getMessage() {
      return message;
    }

    public CustomException message(String message) {
      this.message = message;
      return this;
    }

    public HttpStatus getHttpStatus() {
      return status;
    }

    public CustomException status() {
      this.status = status;
      return this;
    }

}
