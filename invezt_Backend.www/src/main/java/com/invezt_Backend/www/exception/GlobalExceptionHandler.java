package com.invezt_Backend.www.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.invezt_Backend.www.dto.response.ApiResponse;
import com.invezt_Backend.www.enums.ErrorCode;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(InveztException.class)
    public ResponseEntity<ApiResponse<Object>> handleInveztException(InveztException ex) {
        return ResponseEntity
                .status(ex.getErrorCode().getCode() >= 1000 ? 400 : ex.getErrorCode().getCode())
                .body(ApiResponse.error(ex.getErrorCode(), ex.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Object>> handleGeneralException(Exception ex) {
        return ResponseEntity
                .status(500)
                .body(ApiResponse.error(ErrorCode.INTERNAL_SERVER_ERROR, ex.getMessage()));
    }
}
