package com.bank.creditcard.service;

import com.bank.creditcard.dto.ApplicationRequest;
import com.bank.creditcard.dto.ApplicationResponse;
import com.bank.creditcard.model.ApplicationStatus;

import java.util.List;

public interface ApplicationService {
    ApplicationResponse applyForCard(ApplicationRequest request, String username);
    List<ApplicationResponse> getApplicationsForUser(String username);
    List<ApplicationResponse> getAllApplicationsForAdmin();
    ApplicationResponse getApplicationDetails(Long applicationId, String username);
    ApplicationResponse updateApplicationStatus(Long applicationId, ApplicationStatus status, String decisionMessage);
}
