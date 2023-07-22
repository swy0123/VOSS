package com.yukgaejang.voss.domain.badge.service.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GiveBadgeRequest {
    private String senderId;
    private String receiverId;

    public GiveBadgeRequest(String receiverId) {
        this.receiverId = receiverId;
    }

    public GiveBadgeRequest(String senderId, String receiverId) {
        this.senderId = senderId;
        this.receiverId = receiverId;
    }
}
