package com.moroccantour.controller;

import com.moroccantour.dto.request.CreateLanguageRequest;
import com.moroccantour.dto.response.LanguageResponse;
import com.moroccantour.service.LanguageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/languages")
@RequiredArgsConstructor
public class LanguageController {

    private final LanguageService languageService;

    @GetMapping
    public ResponseEntity<List<LanguageResponse>> all() {
        return ResponseEntity.ok(languageService.findAll());
    }

    @PostMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<LanguageResponse> create(@RequestBody @Valid CreateLanguageRequest request) {
        return ResponseEntity.ok(languageService.create(request));
    }

    @PutMapping("/admin/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<LanguageResponse> update(@PathVariable Long id,
                                                   @RequestBody @Valid CreateLanguageRequest request) {
        return ResponseEntity.ok(languageService.update(id, request));
    }

    @DeleteMapping("/admin/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        languageService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
