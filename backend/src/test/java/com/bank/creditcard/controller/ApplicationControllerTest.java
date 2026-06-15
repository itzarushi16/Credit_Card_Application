package com.bank.creditcard.controller;

import com.bank.creditcard.dto.ApplicationRequest;
import com.bank.creditcard.dto.ApplicationResponse;
import com.bank.creditcard.model.ApplicationStatus;
import com.bank.creditcard.service.ApplicationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.security.Principal;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;

@ExtendWith(MockitoExtension.class)
public class ApplicationControllerTest {

    @Mock
    private ApplicationService applicationService;

    @InjectMocks
    private ApplicationController applicationController;

    private Principal principal;
    private ApplicationResponse mockResponse;

    @BeforeEach
    public void setup() {
        principal = () -> "aman";
        mockResponse = ApplicationResponse.builder()
                .id(100L)
                .fullName("Aman Sharma")
                .status(ApplicationStatus.APPROVED)
                .decisionMessage("Approved")
                .build();
    }

    @Test
    public void testApplyForCard() {
        ApplicationRequest request = ApplicationRequest.builder()
                .fullName("Aman Sharma")
                .email("aman@test.com")
                .build();

        Mockito.when(applicationService.applyForCard(any(ApplicationRequest.class), eq("aman")))
                .thenReturn(mockResponse);

        ResponseEntity<ApplicationResponse> responseEntity = applicationController.apply(request, principal);

        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());
        assertEquals(100L, responseEntity.getBody().getId());
        assertEquals(ApplicationStatus.APPROVED, responseEntity.getBody().getStatus());
    }

    @Test
    public void testGetMyApplications() {
        Mockito.when(applicationService.getApplicationsForUser("aman"))
                .thenReturn(Collections.singletonList(mockResponse));

        ResponseEntity<List<ApplicationResponse>> responseEntity = applicationController.getMyApplications(principal);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());
        assertEquals(1, responseEntity.getBody().size());
        assertEquals(100L, responseEntity.getBody().get(0).getId());
    }

    @Test
    public void testGetApplicationDetails() {
        Mockito.when(applicationService.getApplicationDetails(100L, "aman"))
                .thenReturn(mockResponse);

        ResponseEntity<ApplicationResponse> responseEntity = applicationController.getApplicationDetails(100L, principal);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());
        assertEquals(100L, responseEntity.getBody().getId());
    }

    @Test
    public void testAdminGetAllApplications() {
        Mockito.when(applicationService.getAllApplicationsForAdmin())
                .thenReturn(Collections.singletonList(mockResponse));

        ResponseEntity<List<ApplicationResponse>> responseEntity = applicationController.getAllApplications();

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());
        assertEquals(1, responseEntity.getBody().size());
    }

    @Test
    public void testAdminUpdateStatus() {
        Mockito.when(applicationService.updateApplicationStatus(100L, ApplicationStatus.REJECTED, "Income check failed"))
                .thenReturn(mockResponse);

        // Update the mock response properties since we are simulating update
        mockResponse.setStatus(ApplicationStatus.REJECTED);
        mockResponse.setDecisionMessage("Income check failed");

        ResponseEntity<ApplicationResponse> responseEntity = applicationController.updateStatus(100L, ApplicationStatus.REJECTED, "Income check failed");

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());
        assertEquals(ApplicationStatus.REJECTED, responseEntity.getBody().getStatus());
        assertEquals("Income check failed", responseEntity.getBody().getDecisionMessage());
    }
}
