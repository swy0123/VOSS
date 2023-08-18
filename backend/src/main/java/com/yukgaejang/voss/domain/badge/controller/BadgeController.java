package com.yukgaejang.voss.domain.badge.controller;

import com.yukgaejang.voss.domain.badge.service.BadgeService;
import com.yukgaejang.voss.domain.badge.service.dto.request.GiveBadgeRequest;
import com.yukgaejang.voss.domain.badge.service.dto.response.BadgeListResponse;
import com.yukgaejang.voss.domain.badge.service.dto.response.GiveBadgeResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/badge")
public class BadgeController {
    private final BadgeService badgeService;

    @PostMapping
    public ResponseEntity<GiveBadgeResponse> badge(@RequestBody GiveBadgeRequest giveBadgeRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        boolean success = badgeService.giveBadge(giveBadgeRequest, authentication.getName());

        return ResponseEntity.ok(new GiveBadgeResponse(success));
    }

    @GetMapping
    public ResponseEntity<List<BadgeListResponse>> badges() {
        return ResponseEntity.ok(badgeService.getBadgeList());
    }

}
