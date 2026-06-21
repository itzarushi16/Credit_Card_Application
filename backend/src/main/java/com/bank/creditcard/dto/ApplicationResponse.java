package com.bank.creditcard.dto;

import com.bank.creditcard.model.ApplicationStatus;
import java.time.LocalDateTime;

public class ApplicationResponse {
    private Long id;
    private Long userId;
    private String fullName;
    private String email;
    private String phoneNumber;
    private String pan;
    private String aadhaar;
    private String address;
    private String pincode;
    private Double monthlyIncome;
    private Integer employmentDurationMonths;
    private String employmentType;
    private Integer cibilScore;
    private Double existingLoanExposure;
    private Double creditCardUtilization;
    private Double monthlyDebtObligations;
    private Boolean salaryProofProvided;
    private ApplicationStatus status;
    private String decisionMessage;
    private String cardNumber;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public ApplicationResponse() {}

    public ApplicationResponse(Long id, Long userId, String fullName, String email, String phoneNumber, String pan,
                               String aadhaar, String address, String pincode, Double monthlyIncome,
                               Integer employmentDurationMonths, String employmentType, Integer cibilScore,
                               Double existingLoanExposure, Double creditCardUtilization, Double monthlyDebtObligations,
                               Boolean salaryProofProvided, ApplicationStatus status, String decisionMessage,
                               String cardNumber, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.userId = userId;
        this.fullName = fullName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.pan = pan;
        this.aadhaar = aadhaar;
        this.address = address;
        this.pincode = pincode;
        this.monthlyIncome = monthlyIncome;
        this.employmentDurationMonths = employmentDurationMonths;
        this.employmentType = employmentType;
        this.cibilScore = cibilScore;
        this.existingLoanExposure = existingLoanExposure;
        this.creditCardUtilization = creditCardUtilization;
        this.monthlyDebtObligations = monthlyDebtObligations;
        this.salaryProofProvided = salaryProofProvided;
        this.status = status;
        this.decisionMessage = decisionMessage;
        this.cardNumber = cardNumber;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getPan() { return pan; }
    public void setPan(String pan) { this.pan = pan; }

    public String getAadhaar() { return aadhaar; }
    public void setAadhaar(String aadhaar) { this.aadhaar = aadhaar; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getPincode() { return pincode; }
    public void setPincode(String pincode) { this.pincode = pincode; }

    public Double getMonthlyIncome() { return monthlyIncome; }
    public void setMonthlyIncome(Double monthlyIncome) { this.monthlyIncome = monthlyIncome; }

    public Integer getEmploymentDurationMonths() { return employmentDurationMonths; }
    public void setEmploymentDurationMonths(Integer employmentDurationMonths) { this.employmentDurationMonths = employmentDurationMonths; }

    public String getEmploymentType() { return employmentType; }
    public void setEmploymentType(String employmentType) { this.employmentType = employmentType; }

    public Integer getCibilScore() { return cibilScore; }
    public void setCibilScore(Integer cibilScore) { this.cibilScore = cibilScore; }

    public Double getExistingLoanExposure() { return existingLoanExposure; }
    public void setExistingLoanExposure(Double existingLoanExposure) { this.existingLoanExposure = existingLoanExposure; }

    public Double getCreditCardUtilization() { return creditCardUtilization; }
    public void setCreditCardUtilization(Double creditCardUtilization) { this.creditCardUtilization = creditCardUtilization; }

    public Double getMonthlyDebtObligations() { return monthlyDebtObligations; }
    public void setMonthlyDebtObligations(Double monthlyDebtObligations) { this.monthlyDebtObligations = monthlyDebtObligations; }

    public Boolean getSalaryProofProvided() { return salaryProofProvided; }
    public void setSalaryProofProvided(Boolean salaryProofProvided) { this.salaryProofProvided = salaryProofProvided; }

    public ApplicationStatus getStatus() { return status; }
    public void setStatus(ApplicationStatus status) { this.status = status; }

    public String getDecisionMessage() { return decisionMessage; }
    public void setDecisionMessage(String decisionMessage) { this.decisionMessage = decisionMessage; }

    public String getCardNumber() { return cardNumber; }
    public void setCardNumber(String cardNumber) { this.cardNumber = cardNumber; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    // Builder
    public static ApplicationResponseBuilder builder() {
        return new ApplicationResponseBuilder();
    }

    public static class ApplicationResponseBuilder {
        private Long id;
        private Long userId;
        private String fullName;
        private String email;
        private String phoneNumber;
        private String pan;
        private String aadhaar;
        private String address;
        private String pincode;
        private Double monthlyIncome;
        private Integer employmentDurationMonths;
        private String employmentType;
        private Integer cibilScore;
        private Double existingLoanExposure;
        private Double creditCardUtilization;
        private Double monthlyDebtObligations;
        private Boolean salaryProofProvided;
        private ApplicationStatus status;
        private String decisionMessage;
        private String cardNumber;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public ApplicationResponseBuilder id(Long id) { this.id = id; return this; }
        public ApplicationResponseBuilder userId(Long userId) { this.userId = userId; return this; }
        public ApplicationResponseBuilder fullName(String fullName) { this.fullName = fullName; return this; }
        public ApplicationResponseBuilder email(String email) { this.email = email; return this; }
        public ApplicationResponseBuilder phoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; return this; }
        public ApplicationResponseBuilder pan(String pan) { this.pan = pan; return this; }
        public ApplicationResponseBuilder aadhaar(String aadhaar) { this.aadhaar = aadhaar; return this; }
        public ApplicationResponseBuilder address(String address) { this.address = address; return this; }
        public ApplicationResponseBuilder pincode(String pincode) { this.pincode = pincode; return this; }
        public ApplicationResponseBuilder monthlyIncome(Double monthlyIncome) { this.monthlyIncome = monthlyIncome; return this; }
        public ApplicationResponseBuilder employmentDurationMonths(Integer employmentDurationMonths) { this.employmentDurationMonths = employmentDurationMonths; return this; }
        public ApplicationResponseBuilder employmentType(String employmentType) { this.employmentType = employmentType; return this; }
        public ApplicationResponseBuilder cibilScore(Integer cibilScore) { this.cibilScore = cibilScore; return this; }
        public ApplicationResponseBuilder existingLoanExposure(Double existingLoanExposure) { this.existingLoanExposure = existingLoanExposure; return this; }
        public ApplicationResponseBuilder creditCardUtilization(Double creditCardUtilization) { this.creditCardUtilization = creditCardUtilization; return this; }
        public ApplicationResponseBuilder monthlyDebtObligations(Double monthlyDebtObligations) { this.monthlyDebtObligations = monthlyDebtObligations; return this; }
        public ApplicationResponseBuilder salaryProofProvided(Boolean salaryProofProvided) { this.salaryProofProvided = salaryProofProvided; return this; }
        public ApplicationResponseBuilder status(ApplicationStatus status) { this.status = status; return this; }
        public ApplicationResponseBuilder decisionMessage(String decisionMessage) { this.decisionMessage = decisionMessage; return this; }
        public ApplicationResponseBuilder cardNumber(String cardNumber) { this.cardNumber = cardNumber; return this; }
        public ApplicationResponseBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public ApplicationResponseBuilder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public ApplicationResponse build() {
            return new ApplicationResponse(id, userId, fullName, email, phoneNumber, pan, aadhaar, address, pincode,
                    monthlyIncome, employmentDurationMonths, employmentType, cibilScore, existingLoanExposure,
                    creditCardUtilization, monthlyDebtObligations, salaryProofProvided, status, decisionMessage,
                    cardNumber, createdAt, updatedAt);
        }
    }
}
