package com.bank.creditcard.controller;

import com.bank.creditcard.model.User;
import com.bank.creditcard.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/users")
@Tag(name = "User Profile Module", description = "Endpoints for user profile operations")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/me")
    @Operation(summary = "Get current user profile details", description = "Fetches metadata of the currently logged-in user")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved profile details")
    @ApiResponse(responseCode = "401", description = "Unauthorized")
    public ResponseEntity<User> getCurrentUser(Principal principal) {
        User user = userService.getUserByUsername(principal.getName());
        return ResponseEntity.ok(user);
    }
}
