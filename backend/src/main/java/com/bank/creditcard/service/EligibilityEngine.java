package com.bank.creditcard.service;

import com.bank.creditcard.dto.ApplicationRequest;
import com.bank.creditcard.model.User;

public interface EligibilityEngine {
    EligibilityResult evaluate(ApplicationRequest request, User user);
}
