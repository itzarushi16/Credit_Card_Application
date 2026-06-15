package com.bank.creditcard.service;

import com.bank.creditcard.dto.ApplicationRequest;
import com.bank.creditcard.dto.ApplicationResponse;
import com.bank.creditcard.exception.BadRequestException;
import com.bank.creditcard.exception.ResourceNotFoundException;
import com.bank.creditcard.model.ApplicationStatus;
import com.bank.creditcard.model.CreditCardApplication;
import com.bank.creditcard.model.Role;
import com.bank.creditcard.model.User;
import com.bank.creditcard.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApplicationServiceImpl implements ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private EligibilityEngine eligibilityEngine;

    @Override
    public ApplicationResponse applyForCard(ApplicationRequest request, String username) {
        User user = userService.getUserByUsername(username);

        // Run the eligibility rules engine
        EligibilityResult evaluation = eligibilityEngine.evaluate(request, user);

        CreditCardApplication application = CreditCardApplication.builder()
                .user(user)
                .fullName(request.getFullName())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .pan(request.getPan().toUpperCase())
                .aadhaar(request.getAadhaar())
                .address(request.getAddress())
                .pincode(request.getPincode())
                .monthlyIncome(request.getMonthlyIncome())
                .employmentDurationMonths(request.getEmploymentDurationMonths())
                .employmentType(request.getEmploymentType())
                .cibilScore(request.getCibilScore())
                .existingLoanExposure(request.getExistingLoanExposure())
                .creditCardUtilization(request.getCreditCardUtilization())
                .monthlyDebtObligations(request.getMonthlyDebtObligations())
                .salaryProofProvided(request.getSalaryProofProvided())
                .status(evaluation.getStatus())
                .decisionMessage(evaluation.getDecisionMessage())
                .build();

        CreditCardApplication savedApplication = applicationRepository.save(application);
        return mapToResponse(savedApplication);
    }

    @Override
    public List<ApplicationResponse> getApplicationsForUser(String username) {
        User user = userService.getUserByUsername(username);
        List<CreditCardApplication> apps = applicationRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
        return apps.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public List<ApplicationResponse> getAllApplicationsForAdmin() {
        List<CreditCardApplication> apps = applicationRepository.findAll();
        return apps.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public ApplicationResponse getApplicationDetails(Long applicationId, String username) {
        User user = userService.getUserByUsername(username);
        CreditCardApplication app = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with id: " + applicationId));

        // Security check: Must be owner or admin
        if (!app.getUser().getId().equals(user.getId()) && user.getRole() != Role.ROLE_ADMIN) {
            throw new AccessDeniedException("You are not authorized to view this application");
        }

        return mapToResponse(app);
    }

    @Override
    public ApplicationResponse updateApplicationStatus(Long applicationId, ApplicationStatus status, String decisionMessage) {
        CreditCardApplication app = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with id: " + applicationId));

        if (status == null) {
            throw new BadRequestException("Status is required");
        }

        app.setStatus(status);
        if (decisionMessage != null && !decisionMessage.trim().isEmpty()) {
            app.setDecisionMessage(decisionMessage);
        } else {
            app.setDecisionMessage("Status updated manually by Administrator to: " + status);
        }

        CreditCardApplication updatedApp = applicationRepository.save(app);
        return mapToResponse(updatedApp);
    }

    private ApplicationResponse mapToResponse(CreditCardApplication app) {
        return ApplicationResponse.builder()
                .id(app.getId())
                .userId(app.getUser().getId())
                .fullName(app.getFullName())
                .email(app.getEmail())
                .phoneNumber(app.getPhoneNumber())
                .pan(app.getPan())
                .aadhaar(app.getAadhaar())
                .address(app.getAddress())
                .pincode(app.getPincode())
                .monthlyIncome(app.getMonthlyIncome())
                .employmentDurationMonths(app.getEmploymentDurationMonths())
                .employmentType(app.getEmploymentType())
                .cibilScore(app.getCibilScore())
                .existingLoanExposure(app.getExistingLoanExposure())
                .creditCardUtilization(app.getCreditCardUtilization())
                .monthlyDebtObligations(app.getMonthlyDebtObligations())
                .salaryProofProvided(app.getSalaryProofProvided())
                .status(app.getStatus())
                .decisionMessage(app.getDecisionMessage())
                .createdAt(app.getCreatedAt())
                .updatedAt(app.getUpdatedAt())
                .build();
    }
}
