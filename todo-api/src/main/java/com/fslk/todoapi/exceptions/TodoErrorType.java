package com.fslk.todoapi.exceptions;


public class TodoErrorType {

    private String errorMessage;

    public TodoErrorType(String errorMessage){
        this.errorMessage = errorMessage;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

}
