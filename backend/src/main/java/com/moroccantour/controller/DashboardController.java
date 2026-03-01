package com.moroccantour.controller;

import com.moroccantour.dto.response.DashboardStatsResponse;
import com.moroccantour.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/guide")
    @PreAuthorize("hasRole('GUIDE')")
    public ResponseEntity<DashboardStatsResponse> guideStats(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(dashboardService.guideStats(userDetails.getUsername()));
    }

    @GetMapping("/guide/stats")
    @PreAuthorize("hasRole('GUIDE')")
    public ResponseEntity<DashboardStatsResponse> guideStatsAlias(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(dashboardService.guideStats(userDetails.getUsername()));
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DashboardStatsResponse> adminStats() {
        return ResponseEntity.ok(dashboardService.adminStats());
    }

    @GetMapping("/admin/stats")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DashboardStatsResponse> adminStatsAlias() {
        return ResponseEntity.ok(dashboardService.adminStats());
    }
}
