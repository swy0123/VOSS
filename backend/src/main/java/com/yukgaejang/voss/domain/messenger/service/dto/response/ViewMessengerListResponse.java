package com.yukgaejang.voss.domain.messenger.service.dto.response;

import lombok.Data;

@Data
public class ViewMessengerListResponse {
    private String name;
    private Long chatId;
    private Long memberId;
    private String sessionId;
    private boolean isUnReadMessage;

    public ViewMessengerListResponse(String name, Long chatId, Long memberId, String sessionId) {
        this.name = name;
        this.chatId = chatId;
        this.memberId = memberId;
        this.sessionId = sessionId;
    }
}
