package com.mycompany.balseskin.request;

public class RequestError {

    public static final RequestError userNotFound = new RequestError("user not found");

    String error;

    private RequestError(String error) {
        this.error = error;
    }
}
