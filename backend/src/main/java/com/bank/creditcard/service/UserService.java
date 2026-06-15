package com.bank.creditcard.service;

import com.bank.creditcard.dto.AuthRequest;
import com.bank.creditcard.dto.AuthResponse;
import com.bank.creditcard.dto.RegisterRequest;
import com.bank.creditcard.model.User;

public interface UserService {
    User registerUser(RegisterRequest request);
    AuthResponse authenticateUser(AuthRequest request);
    User getUserById(Long id);
    User getUserByUsername(String username);
}
