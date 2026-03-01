package com.moroccantour.controller;

import com.moroccantour.dto.request.LoginRequest;
import com.moroccantour.dto.request.RegisterGuideRequest;
import com.moroccantour.dto.request.RegisterTouristRequest;
import com.moroccantour.dto.response.AuthResponse;
import com.moroccantour.service.AuthService;
import com.moroccantour.service.ImageStorageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final ImageStorageService imageStorageService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody @Valid LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/register/tourist")
    public ResponseEntity<AuthResponse> registerTourist(@RequestBody @Valid RegisterTouristRequest request) {
        return ResponseEntity.ok(authService.registerTourist(request));
    }

    @PostMapping("/register/guide")
    public ResponseEntity<AuthResponse> registerGuide(@RequestBody @Valid RegisterGuideRequest request) {
        return ResponseEntity.ok(authService.registerGuide(request));
    }

    @GetMapping("/me")
    public ResponseEntity<AuthResponse> me() {
        return ResponseEntity.ok(authService.currentUser());
    }

    @PostMapping("/upload-profile")
    public ResponseEntity<?> uploadProfile(@RequestParam("file") MultipartFile file) {
        String path = imageStorageService.store(file);
        return ResponseEntity.ok(java.util.Map.of("path", path));
    }
}
