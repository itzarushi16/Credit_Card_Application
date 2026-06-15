package com.bank.creditcard.dto;

import jakarta.validation.constraints.*;

public class ApplicationRequest {

    @NotBlank(message = "Full Name is required")
    private String fullName;

    @NotBlank(message = "Email is required")
    @Email(message = "Please provide a valid email address")
    private String email;

    @NotBlank(message = "Phone Number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone Number must be a valid 10-digit mobile number")
    private String phoneNumber;

    @NotBlank(message = "PAN is required")
    @Pattern(regexp = "^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$", message = "PAN must be in standard format (e.g. ABCDE1234F)")
    private String pan;

    @NotBlank(message = "Aadhaar is required")
    @Pattern(regexp = "^[0-9]{12}$", message = "Aadhaar must be a valid 12-digit number")
    private String aadhaar;

    @NotBlank(message = "Address is required")
    @Size(min = 10, message = "Address must be at least 10 characters long")
    private String address;

    @NotBlank(message = "Pincode is required")
    @Pattern(regexp = "^[0-9]{6}$", message = "Pincode must be a valid 6-digit number")
    private String pincode;

    @NotNull(message = "Monthly Income is required")
    @Min(value = 0, message = "Monthly Income cannot be negative")
    private Double monthlyIncome;

    @NotNull(message = "Employment Duration is required")
    @Min(value = 0, message = "Employment Duration cannot be negative")
    private Integer employmentDurationMonths;

    @NotBlank(message = "Employment Type is required")
    @Pattern(regexp = "^(SALARIED|SELF_EMPLOYED)$", message = "Employment Type must be SALARIED or SELF_EMPLOYED")
    private String employmentType;

    @NotNull(message = "CIBIL Score is required")
    @Min(value = 300, message = "CIBIL Score cannot be less than 300")
    @Max(value = 900, message = "CIBIL Score cannot be greater than 900")
    private Integer cibilScore;

    @NotNull(message = "Existing Loan Exposure is required")
    @Min(value = 0, message = "Existing Loan Exposure cannot be negative")
    private Double existingLoanExposure;

    @NotNull(message = "Credit Card Utilization is required")
    @Min(value = 0, message = "Credit Card Utilization cannot be negative")
    @Max(value = 100, message = "Credit Card Utilization cannot exceed 100%")
    private Double creditCardUtilization;

    @NotNull(message = "Monthly Debt Obligations are required")
    @Min(value = 0, message = "Monthly Debt Obligations cannot be negative")
    private Double monthlyDebtObligations;

    @NotNull(message = "Salary Proof flag is required")
    private Boolean salaryProofProvided;

    public ApplicationRequest() {}

    public ApplicationRequest(String fullName, String email, String phoneNumber, String pan, String aadhaar,
                              String address, String pincode, Double monthlyIncome, Integer employmentDurationMonths,
                              String employmentType, Integer cibilScore, Double existingLoanExposure,
                              Double creditCardUtilization, Double monthlyDebtObligations, Boolean salaryProofProvided) {
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
    }

    // Getters and Setters
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

    // Builder Pattern
    public static ApplicationRequestBuilder builder() {
        return new ApplicationRequestBuilder();
    }

    public static class ApplicationRequestBuilder {
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

        public ApplicationRequestBuilder fullName(String fullName) { this.fullName = fullName; return this; }
        public ApplicationRequestBuilder email(String email) { this.email = email; return this; }
        public ApplicationRequestBuilder phoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; return this; }
        public ApplicationRequestBuilder pan(String pan) { this.pan = pan; return this; }
        public ApplicationRequestBuilder aadhaar(String aadhaar) { this.aadhaar = aadhaar; return this; }
        public ApplicationRequestBuilder address(String address) { this.address = address; return this; }
        public ApplicationRequestBuilder pincode(String pincode) { this.pincode = pincode; return this; }
        public ApplicationRequestBuilder monthlyIncome(Double monthlyIncome) { this.monthlyIncome = monthlyIncome; return this; }
        public ApplicationRequestBuilder employmentDurationMonths(Integer employmentDurationMonths) { this.employmentDurationMonths = employmentDurationMonths; return this; }
        public ApplicationRequestBuilder employmentType(String employmentType) { this.employmentType = employmentType; return this; }
        public ApplicationRequestBuilder cibilScore(Integer cibilScore) { this.cibilScore = cibilScore; return this; }
        public ApplicationRequestBuilder existingLoanExposure(Double existingLoanExposure) { this.existingLoanExposure = existingLoanExposure; return this; }
        public ApplicationRequestBuilder creditCardUtilization(Double creditCardUtilization) { this.creditCardUtilization = creditCardUtilization; return this; }
        public ApplicationRequestBuilder monthlyDebtObligations(Double monthlyDebtObligations) { this.monthlyDebtObligations = monthlyDebtObligations; return this; }
        public ApplicationRequestBuilder salaryProofProvided(Boolean salaryProofProvided) { this.salaryProofProvided = salaryProofProvided; return this; }

        public ApplicationRequest build() {
            return new ApplicationRequest(fullName, email, phoneNumber, pan, aadhaar, address, pincode,
                    monthlyIncome, employmentDurationMonths, employmentType, cibilScore, existingLoanExposure,
                    creditCardUtilization, monthlyDebtObligations, salaryProofProvided);
        }
    }
}
