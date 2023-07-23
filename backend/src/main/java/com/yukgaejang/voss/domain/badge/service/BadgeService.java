package com.yukgaejang.voss.domain.badge.service;

import com.yukgaejang.voss.domain.badge.service.dto.request.GiveBadgeRequest;

public interface BadgeService {
    void giveBadge(GiveBadgeRequest giveBadgeRequest, String receiver);
}
