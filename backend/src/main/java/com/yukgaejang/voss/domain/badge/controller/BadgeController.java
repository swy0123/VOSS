package com.yukgaejang.voss.domain.badge.controller;

import com.yukgaejang.voss.domain.badge.service.BadgeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/badge")
public class BadgeController {
    private final BadgeService badgeService;

    @PostMapping
    public ResponseEntity<Void> badge() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        badgeService.giveBadge(authentication.getName());

        return ResponseEntity.ok().build();
    }

}
