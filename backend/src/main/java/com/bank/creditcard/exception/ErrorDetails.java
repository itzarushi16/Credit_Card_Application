package com.bank.creditcard.exception;

import java.time.LocalDateTime;
import java.util.Map;

public class ErrorDetails {
    private LocalDateTime timestamp;
    private int status;
    private String error;
    private String message;
    private Map<String, String> validationErrors;

    public ErrorDetails() {}

    public ErrorDetails(LocalDateTime timestamp, int status, String error, String message, Map<String, String> validationErrors) {
        this.timestamp = timestamp;
        this.status = status;
        this.error = error;
        this.message = message;
        this.validationErrors = validationErrors;
    }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    public int getStatus() { return status; }
    public void setStatus(int status) { this.status = status; }

    public String getError() { return error; }
    public void setError(String error) { this.error = error; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public Map<String, String> getValidationErrors() { return validationErrors; }
    public void setValidationErrors(Map<String, String> validationErrors) { this.validationErrors = validationErrors; }

    // Builder
    public static ErrorDetailsBuilder builder() {
        return new ErrorDetailsBuilder();
    }

    public static class ErrorDetailsBuilder {
        private LocalDateTime timestamp;
        private int status;
        private String error;
        private String message;
        private Map<String, String> validationErrors;

        public ErrorDetailsBuilder timestamp(LocalDateTime timestamp) { this.timestamp = timestamp; return this; }
        public ErrorDetailsBuilder status(int status) { this.status = status; return this; }
        public ErrorDetailsBuilder error(String error) { this.error = error; return this; }
        public ErrorDetailsBuilder message(String message) { this.message = message; return this; }
        public ErrorDetailsBuilder validationErrors(Map<String, String> validationErrors) { this.validationErrors = validationErrors; return this; }

        public ErrorDetails build() {
            return new ErrorDetails(timestamp, status, error, message, validationErrors);
        }
    }
}
