package com.bank.creditcard.service;

import com.bank.creditcard.model.ApplicationStatus;

public class EligibilityResult {
    private final ApplicationStatus status;
    private final String decisionMessage;

    public EligibilityResult(ApplicationStatus status, String decisionMessage) {
        this.status = status;
        this.decisionMessage = decisionMessage;
    }

    public ApplicationStatus getStatus() {
        return status;
    }

    public String getDecisionMessage() {
        return decisionMessage;
    }
}
