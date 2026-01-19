package com.invezt_Backend.www.enums;

public enum ErrorCode {
    SUCCESS(200, "Operation successful"),
    CREATED(201, "Resource created successfully"),
    BAD_REQUEST(400, "Bad request"),
    UNAUTHORIZED(401, "Unauthorized access"),
    FORBIDDEN(403, "Access forbidden"),
    NOT_FOUND(404, "Resource not found"),
    INTERNAL_SERVER_ERROR(500, "Internal server error"),
    USER_ALREADY_EXISTS(1001, "User already exists"),
    INVALID_CREDENTIALS(1002, "Invalid email or password"),
    TOKEN_EXPIRED(1003, "Token has expired"),
    TOKEN_INVALID(1004, "Invalid token");

    private final int code;
    private final String message;

    ErrorCode(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
