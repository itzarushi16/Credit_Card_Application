package com.bank.creditcard.service;

import com.bank.creditcard.dto.ApplicationRequest;
import com.bank.creditcard.dto.ApplicationResponse;
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

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;

@ExtendWith(MockitoExtension.class)
public class ApplicationServiceTest {

    @Mock
    private ApplicationRepository applicationRepository;

    @Mock
    private UserService userService;

    @Mock
    private EligibilityEngine eligibilityEngine;

    @InjectMocks
    private ApplicationServiceImpl applicationService;

    private User testUser;
    private ApplicationRequest request;
    private CreditCardApplication application;

    @BeforeEach
    public void setup() {
        testUser = User.builder()
                .id(1L)
                .username("aman")
                .email("aman@test.com")
                .build();

        request = ApplicationRequest.builder()
                .fullName("Aman Sharma")
                .email("aman@test.com")
                .phoneNumber("9876543210")
                .pan("ABCDE1234S")
                .aadhaar("123456789012")
                .address("Sector 62 Noida")
                .pincode("201301")
                .monthlyIncome(60000.0)
                .employmentDurationMonths(12)
                .employmentType("SALARIED")
                .cibilScore(800)
                .existingLoanExposure(0.0)
                .creditCardUtilization(0.0)
                .monthlyDebtObligations(0.0)
                .salaryProofProvided(true)
                .build();

        application = CreditCardApplication.builder()
                .id(100L)
                .user(testUser)
                .fullName("Aman Sharma")
                .email("aman@test.com")
                .phoneNumber("9876543210")
                .pan("ABCDE1234S")
                .aadhaar("123456789012")
                .address("Sector 62 Noida")
                .pincode("201301")
                .monthlyIncome(60000.0)
                .employmentDurationMonths(12)
                .employmentType("SALARIED")
                .cibilScore(800)
                .existingLoanExposure(0.0)
                .creditCardUtilization(0.0)
                .monthlyDebtObligations(0.0)
                .salaryProofProvided(true)
                .status(ApplicationStatus.APPROVED)
                .decisionMessage("Approved")
                .build();
    }

    @Test
    public void testApplyForCardSuccess() {
        Mockito.when(userService.getUserByUsername("aman")).thenReturn(testUser);
        Mockito.when(eligibilityEngine.evaluate(any(ApplicationRequest.class), any(User.class)))
                .thenReturn(new EligibilityResult(ApplicationStatus.APPROVED, "Approved"));
        Mockito.when(applicationRepository.save(any(CreditCardApplication.class))).thenReturn(application);

        ApplicationResponse response = applicationService.applyForCard(request, "aman");

        assertNotNull(response);
        assertEquals(100L, response.getId());
        assertEquals(ApplicationStatus.APPROVED, response.getStatus());
        assertEquals("Approved", response.getDecisionMessage());
    }

    @Test
    public void testGetApplicationsForUser() {
        Mockito.when(userService.getUserByUsername("aman")).thenReturn(testUser);
        Mockito.when(applicationRepository.findByUserIdOrderByCreatedAtDesc(1L))
                .thenReturn(Collections.singletonList(application));

        List<ApplicationResponse> list = applicationService.getApplicationsForUser("aman");

        assertNotNull(list);
        assertEquals(1, list.size());
        assertEquals(100L, list.get(0).getId());
    }

    @Test
    public void testUpdateApplicationStatusByAdmin() {
        Mockito.when(applicationRepository.findById(100L)).thenReturn(Optional.of(application));
        Mockito.when(applicationRepository.save(any(CreditCardApplication.class))).thenAnswer(i -> i.getArguments()[0]);

        ApplicationResponse response = applicationService.updateApplicationStatus(100L, ApplicationStatus.REJECTED, "Manually rejected");

        assertNotNull(response);
        assertEquals(ApplicationStatus.REJECTED, response.getStatus());
        assertEquals("Manually rejected", response.getDecisionMessage());
    }
}
