package com.bank.creditcard.controller;

import com.bank.creditcard.dto.AuthRequest;
import com.bank.creditcard.dto.AuthResponse;
import com.bank.creditcard.dto.RegisterRequest;
import com.bank.creditcard.model.User;
import com.bank.creditcard.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication Module", description = "Endpoints for user registration and JWT login")
@CrossOrigin
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    @Operation(summary = "Register a new user", description = "Creates a new user account with role ROLE_USER or ROLE_ADMIN")
    @ApiResponse(responseCode = "201", description = "User successfully registered",
            content = @Content(schema = @Schema(implementation = User.class)))
    @ApiResponse(responseCode = "400", description = "Username or Email already exists")
    public ResponseEntity<User> register(@Valid @RequestBody RegisterRequest request) {
        User registeredUser = userService.registerUser(request);
        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    @Operation(summary = "Authenticate user and get JWT", description = "Verifies credentials and returns a JWT token")
    @ApiResponse(responseCode = "200", description = "Successfully authenticated and token generated",
            content = @Content(schema = @Schema(implementation = AuthResponse.class)))
    @ApiResponse(responseCode = "401", description = "Invalid username or password")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
        AuthResponse authResponse = userService.authenticateUser(request);
        return ResponseEntity.ok(authResponse);
    }
}
