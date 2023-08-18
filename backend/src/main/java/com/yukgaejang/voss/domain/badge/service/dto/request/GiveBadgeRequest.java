package com.yukgaejang.voss.domain.badge.service.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GiveBadgeRequest {
    private Long receiverId;
    private Long badgeId;

    public GiveBadgeRequest(Long receiverId, Long badgeId) {
        this.receiverId = receiverId;
        this.badgeId = badgeId;
    }

    public GiveBadgeRequest() {
    }
}
