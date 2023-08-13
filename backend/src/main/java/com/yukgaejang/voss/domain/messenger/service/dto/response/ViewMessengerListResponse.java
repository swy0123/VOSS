package com.yukgaejang.voss.domain.messenger.service.dto.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ViewMessengerListResponse {
    private String name;
    private Long chatId;
    private Long memberId;
    private String sessionId;
    private boolean isUnReadMessage;
    private LocalDateTime lastLeaveTime;

    public ViewMessengerListResponse(String name, Long chatId, Long memberId, String sessionId, LocalDateTime lastLeaveTime) {
        this.name = name;
        this.chatId = chatId;
        this.memberId = memberId;
        this.sessionId = sessionId;
        this.lastLeaveTime = lastLeaveTime;
    }
}
