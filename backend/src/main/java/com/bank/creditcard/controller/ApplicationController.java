package com.bank.creditcard.controller;

import com.bank.creditcard.dto.ApplicationRequest;
import com.bank.creditcard.dto.ApplicationResponse;
import com.bank.creditcard.model.ApplicationStatus;
import com.bank.creditcard.service.ApplicationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/applications")
@Tag(name = "Credit Card Applications Module", description = "Endpoints for creating and managing credit card applications")
@CrossOrigin
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @PostMapping("/apply")
    @Operation(summary = "Submit a credit card application", description = "Submits applicant details, runs the eligibility engine, and persists the result")
    @ApiResponse(responseCode = "201", description = "Application successfully submitted and processed")
    @ApiResponse(responseCode = "400", description = "Invalid form details submitted")
    @ApiResponse(responseCode = "401", description = "Unauthorized")
    public ResponseEntity<ApplicationResponse> apply(@Valid @RequestBody ApplicationRequest request, Principal principal) {
        ApplicationResponse response = applicationService.applyForCard(request, principal.getName());
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/my")
    @Operation(summary = "Get current user's applications", description = "Retrieves a list of all credit card applications submitted by the logged-in user")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved applications")
    @ApiResponse(responseCode = "401", description = "Unauthorized")
    public ResponseEntity<List<ApplicationResponse>> getMyApplications(Principal principal) {
        List<ApplicationResponse> response = applicationService.getApplicationsForUser(principal.getName());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get specific application details", description = "Retrieves full details of an application. Access limited to owner or Admin.")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved application details")
    @ApiResponse(responseCode = "403", description = "Access denied")
    @ApiResponse(responseCode = "404", description = "Application not found")
    public ResponseEntity<ApplicationResponse> getApplicationDetails(@PathVariable Long id, Principal principal) {
        ApplicationResponse response = applicationService.getApplicationDetails(id, principal.getName());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/admin/all")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Operation(summary = "Get all applications (Admin)", description = "Retrieves all credit card applications across the entire system. Restricted to users with ADMIN role.")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved all applications")
    @ApiResponse(responseCode = "403", description = "Access denied")
    public ResponseEntity<List<ApplicationResponse>> getAllApplications() {
        List<ApplicationResponse> response = applicationService.getAllApplicationsForAdmin();
        return ResponseEntity.ok(response);
    }

    @PutMapping("/admin/update-status/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Operation(summary = "Update application status (Admin)", description = "Allows an Admin to manually approve, reject, or update the status of an application.")
    @ApiResponse(responseCode = "200", description = "Successfully updated application status")
    @ApiResponse(responseCode = "400", description = "Invalid status or missing parameters")
    @ApiResponse(responseCode = "403", description = "Access denied")
    @ApiResponse(responseCode = "404", description = "Application not found")
    public ResponseEntity<ApplicationResponse> updateStatus(
            @PathVariable Long id,
            @RequestParam ApplicationStatus status,
            @RequestParam(required = false) String decisionMessage) {
        ApplicationResponse response = applicationService.updateApplicationStatus(id, status, decisionMessage);
        return ResponseEntity.ok(response);
    }
}
