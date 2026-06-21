package com.bank.creditcard.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "credit_card_applications")
public class CreditCardApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String email;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private String pan;

    @Column(nullable = false)
    private String aadhaar;

    @Column(nullable = false, length = 500)
    private String address;

    @Column(nullable = false, length = 10)
    private String pincode;

    @Column(name = "monthly_income", nullable = false)
    private Double monthlyIncome;

    @Column(name = "employment_duration_months", nullable = false)
    private Integer employmentDurationMonths;

    @Column(name = "employment_type", nullable = false)
    private String employmentType; // SALARIED, SELF_EMPLOYED

    @Column(name = "cibil_score", nullable = false)
    private Integer cibilScore;

    @Column(name = "existing_loan_exposure", nullable = false)
    private Double existingLoanExposure;

    @Column(name = "credit_card_utilization", nullable = false)
    private Double creditCardUtilization; // in percentage, e.g. 45.0

    @Column(name = "monthly_debt_obligations", nullable = false)
    private Double monthlyDebtObligations; // for DTI calculation

    @Column(name = "salary_proof_provided", nullable = false)
    private Boolean salaryProofProvided;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApplicationStatus status;

    @Column(name = "decision_message", length = 500)
    private String decisionMessage;

    @Column(name = "card_number", length = 20)
    private String cardNumber;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Default Constructor
    public CreditCardApplication() {
    }

    // All Arguments Constructor
    public CreditCardApplication(Long id, User user, String fullName, String email, String phoneNumber, String pan,
                                 String aadhaar, String address, String pincode, Double monthlyIncome,
                                 Integer employmentDurationMonths, String employmentType, Integer cibilScore,
                                 Double existingLoanExposure, Double creditCardUtilization, Double monthlyDebtObligations,
                                 Boolean salaryProofProvided, ApplicationStatus status, String decisionMessage,
                                 String cardNumber, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.user = user;
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

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

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
    public static CreditCardApplicationBuilder builder() {
        return new CreditCardApplicationBuilder();
    }

    public static class CreditCardApplicationBuilder {
        private Long id;
        private User user;
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

        public CreditCardApplicationBuilder id(Long id) { this.id = id; return this; }
        public CreditCardApplicationBuilder user(User user) { this.user = user; return this; }
        public CreditCardApplicationBuilder fullName(String fullName) { this.fullName = fullName; return this; }
        public CreditCardApplicationBuilder email(String email) { this.email = email; return this; }
        public CreditCardApplicationBuilder phoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; return this; }
        public CreditCardApplicationBuilder pan(String pan) { this.pan = pan; return this; }
        public CreditCardApplicationBuilder aadhaar(String aadhaar) { this.aadhaar = aadhaar; return this; }
        public CreditCardApplicationBuilder address(String address) { this.address = address; return this; }
        public CreditCardApplicationBuilder pincode(String pincode) { this.pincode = pincode; return this; }
        public CreditCardApplicationBuilder monthlyIncome(Double monthlyIncome) { this.monthlyIncome = monthlyIncome; return this; }
        public CreditCardApplicationBuilder employmentDurationMonths(Integer employmentDurationMonths) { this.employmentDurationMonths = employmentDurationMonths; return this; }
        public CreditCardApplicationBuilder employmentType(String employmentType) { this.employmentType = employmentType; return this; }
        public CreditCardApplicationBuilder cibilScore(Integer cibilScore) { this.cibilScore = cibilScore; return this; }
        public CreditCardApplicationBuilder existingLoanExposure(Double existingLoanExposure) { this.existingLoanExposure = existingLoanExposure; return this; }
        public CreditCardApplicationBuilder creditCardUtilization(Double creditCardUtilization) { this.creditCardUtilization = creditCardUtilization; return this; }
        public CreditCardApplicationBuilder monthlyDebtObligations(Double monthlyDebtObligations) { this.monthlyDebtObligations = monthlyDebtObligations; return this; }
        public CreditCardApplicationBuilder salaryProofProvided(Boolean salaryProofProvided) { this.salaryProofProvided = salaryProofProvided; return this; }
        public CreditCardApplicationBuilder status(ApplicationStatus status) { this.status = status; return this; }
        public CreditCardApplicationBuilder decisionMessage(String decisionMessage) { this.decisionMessage = decisionMessage; return this; }
        public CreditCardApplicationBuilder cardNumber(String cardNumber) { this.cardNumber = cardNumber; return this; }
        public CreditCardApplicationBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public CreditCardApplicationBuilder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public CreditCardApplication build() {
            return new CreditCardApplication(id, user, fullName, email, phoneNumber, pan, aadhaar, address, pincode,
                    monthlyIncome, employmentDurationMonths, employmentType, cibilScore, existingLoanExposure,
                    creditCardUtilization, monthlyDebtObligations, salaryProofProvided, status, decisionMessage,
                    cardNumber, createdAt, updatedAt);
        }
    }
}
