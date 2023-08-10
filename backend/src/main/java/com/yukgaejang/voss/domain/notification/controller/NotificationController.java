package com.yukgaejang.voss.domain.notification.controller;

import com.yukgaejang.voss.domain.notification.service.NotificationService;
import com.yukgaejang.voss.domain.notification.service.dto.response.ViewNotificationResponse;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/notification")
public class NotificationController {
    private final NotificationService notificationService;

    @GetMapping
    public ResponseEntity<List<ViewNotificationResponse>> getNotis() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return ResponseEntity.ok(notificationService.getMyNotifications(authentication.getName()));
    }

}
