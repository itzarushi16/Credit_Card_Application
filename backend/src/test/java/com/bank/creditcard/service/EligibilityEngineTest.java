package com.bank.creditcard.service;

import com.bank.creditcard.dto.ApplicationRequest;
import com.bank.creditcard.model.ApplicationStatus;
import com.bank.creditcard.model.CreditCardApplication;
import com.bank.creditcard.model.User;
import com.bank.creditcard.repository.ApplicationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;

@ExtendWith(MockitoExtension.class)
public class EligibilityEngineTest {

    @Mock
    private ApplicationRepository applicationRepository;

    @InjectMocks
    private EligibilityEngineImpl eligibilityEngine;

    private User testUser;
    private ApplicationRequest.ApplicationRequestBuilder baseRequestBuilder;

    @BeforeEach
    public void setup() {
        testUser = User.builder()
                .id(1L)
                .username("testuser")
                .email("test@bank.com")
                .build();

        baseRequestBuilder = ApplicationRequest.builder()
                .fullName("Aman Sharma")
                .email("aman.sharma@example.com")
                .phoneNumber("9876543210")
                .pan("ABCDS1234S") // Fifth char 'S' matches surname 'Sharma'
                .aadhaar("123456789012")
                .address("Sector 62, Noida, UP")
                .pincode("201301")
                .monthlyIncome(50000.0)
                .employmentDurationMonths(12)
                .employmentType("SALARIED")
                .cibilScore(800)
                .existingLoanExposure(100000.0)
                .creditCardUtilization(30.0)
                .monthlyDebtObligations(5000.0)
                .salaryProofProvided(true);
    }

    @Test
    public void testApprovalForValidData() {
        Mockito.when(applicationRepository.countByUserAndCreatedAtAfter(eq(testUser), any(LocalDateTime.class)))
                .thenReturn(0L);
        Mockito.when(applicationRepository.findByPanAndCreatedAtAfter(eq("ABCDS1234S"), any(LocalDateTime.class)))
                .thenReturn(Collections.emptyList());

        ApplicationRequest request = baseRequestBuilder.build();
        EligibilityResult result = eligibilityEngine.evaluate(request, testUser);

        assertEquals(ApplicationStatus.APPROVED, result.getStatus());
        assertEquals("Approved: Application meets all eligibility criteria.", result.getDecisionMessage());
    }

    @Test
    public void testRejectForLowCibilScore() {
        ApplicationRequest request = baseRequestBuilder.cibilScore(600).build();
        EligibilityResult result = eligibilityEngine.evaluate(request, testUser);

        assertEquals(ApplicationStatus.REJECTED, result.getStatus());
        assertEquals("Rejected due to low CIBIL score (< 650).", result.getDecisionMessage());
    }

    @Test
    public void testManualReviewForBorderlineCibilScore() {
        ApplicationRequest request = baseRequestBuilder.cibilScore(700).build();
        EligibilityResult result = eligibilityEngine.evaluate(request, testUser);

        assertEquals(ApplicationStatus.MANUAL_REVIEW, result.getStatus());
        assertEquals("Under review due to borderline CIBIL score (650-749).", result.getDecisionMessage());
    }

    @Test
    public void testRejectForLowIncome() {
        ApplicationRequest request = baseRequestBuilder.monthlyIncome(20000.0).build();
        EligibilityResult result = eligibilityEngine.evaluate(request, testUser);

        assertEquals(ApplicationStatus.REJECTED, result.getStatus());
        assertEquals("Rejected due to insufficient monthly income. Minimum required is ₹25,000.", result.getDecisionMessage());
    }

    @Test
    public void testRejectForShortEmploymentDuration() {
        ApplicationRequest request = baseRequestBuilder.employmentDurationMonths(4).build();
        EligibilityResult result = eligibilityEngine.evaluate(request, testUser);

        assertEquals(ApplicationStatus.REJECTED, result.getStatus());
        assertEquals("Rejected due to employment duration less than 6 months.", result.getDecisionMessage());
    }

    @Test
    public void testPendingForSalariedMissingSalaryProof() {
        ApplicationRequest request = baseRequestBuilder.salaryProofProvided(false).build();
        EligibilityResult result = eligibilityEngine.evaluate(request, testUser);

        assertEquals(ApplicationStatus.PENDING, result.getStatus());
        assertEquals("Pending due to missing documents: Salary proof required for salaried employees.", result.getDecisionMessage());
    }

    @Test
    public void testRejectForBlacklistedPan() {
        ApplicationRequest request = baseRequestBuilder.pan("ABCDE1234F").build(); // ABCDE1234F is blacklisted
        EligibilityResult result = eligibilityEngine.evaluate(request, testUser);

        assertEquals(ApplicationStatus.REJECTED, result.getStatus());
        assertEquals("Rejected due to security/fraud check: Blacklisted PAN.", result.getDecisionMessage());
    }

    @Test
    public void testRejectForDuplicatePan() {
        Mockito.when(applicationRepository.findByPanAndCreatedAtAfter(eq("ABCDS1234S"), any(LocalDateTime.class)))
                .thenReturn(Collections.singletonList(new CreditCardApplication()));

        ApplicationRequest request = baseRequestBuilder.build();
        EligibilityResult result = eligibilityEngine.evaluate(request, testUser);

        assertEquals(ApplicationStatus.REJECTED, result.getStatus());
        assertEquals("Rejected due to duplicate application detected for this PAN within 30 days.", result.getDecisionMessage());
    }

    @Test
    public void testRejectForRateLimiting() {
        Mockito.when(applicationRepository.countByUserAndCreatedAtAfter(eq(testUser), any(LocalDateTime.class)))
                .thenReturn(3L);

        ApplicationRequest request = baseRequestBuilder.build();
        EligibilityResult result = eligibilityEngine.evaluate(request, testUser);

        assertEquals(ApplicationStatus.REJECTED, result.getStatus());
        assertEquals("Fraud detected: Too many application attempts in a short time. Please wait before applying again.", result.getDecisionMessage());
    }

    @Test
    public void testManualReviewForHighLoanExposure() {
        ApplicationRequest request = baseRequestBuilder.existingLoanExposure(2500000.0).build();
        EligibilityResult result = eligibilityEngine.evaluate(request, testUser);

        assertEquals(ApplicationStatus.MANUAL_REVIEW, result.getStatus());
        assertEquals("Under review because of high debt exposure (Existing Loan > ₹20 Lakhs).", result.getDecisionMessage());
    }

    @Test
    public void testManualReviewForHighCardUtilization() {
        ApplicationRequest request = baseRequestBuilder.creditCardUtilization(85.0).build();
        EligibilityResult result = eligibilityEngine.evaluate(request, testUser);

        assertEquals(ApplicationStatus.MANUAL_REVIEW, result.getStatus());
        assertEquals("Under review because of high credit card utilization (> 80%).", result.getDecisionMessage());
    }

    @Test
    public void testManualReviewForBorderlineDti() {
        // Debt 30,000 / Income 50,000 -> 60% DTI
        ApplicationRequest request = baseRequestBuilder.monthlyDebtObligations(30000.0).build();
        EligibilityResult result = eligibilityEngine.evaluate(request, testUser);

        assertEquals(ApplicationStatus.MANUAL_REVIEW, result.getStatus());
        assertEquals("Under review due to high debt-to-income ratio (> 50%).", result.getDecisionMessage());
    }

    @Test
    public void testRejectForExcessiveDti() {
        // Debt 40,000 / Income 50,000 -> 80% DTI
        ApplicationRequest request = baseRequestBuilder.monthlyDebtObligations(40000.0).build();
        EligibilityResult result = eligibilityEngine.evaluate(request, testUser);

        assertEquals(ApplicationStatus.REJECTED, result.getStatus());
        assertEquals("Rejected due to excessive debt-to-income ratio (> 75%).", result.getDecisionMessage());
    }

    @Test
    public void testManualReviewForPanSurnameMismatch() {
        // Surname 'Sharma' first letter 'S'. Fifth character of PAN 'K' -> Mismatch
        ApplicationRequest request = baseRequestBuilder.pan("ABCDE1234K").build();
        EligibilityResult result = eligibilityEngine.evaluate(request, testUser);

        assertEquals(ApplicationStatus.MANUAL_REVIEW, result.getStatus());
        assertEquals("Under review due to suspicious activity pattern: PAN holder surname mismatch.", result.getDecisionMessage());
    }
}
