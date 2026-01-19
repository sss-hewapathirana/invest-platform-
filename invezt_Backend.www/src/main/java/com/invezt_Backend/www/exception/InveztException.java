package com.invezt_Backend.www.exception;

import com.invezt_Backend.www.enums.ErrorCode;

public class InveztException extends RuntimeException {
    private final ErrorCode errorCode;

    public InveztException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

    public InveztException(ErrorCode errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }

    public ErrorCode getErrorCode() {
        return errorCode;
    }
}
