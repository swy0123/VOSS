package com.yukgaejang.voss.domain.messenger.service.dto.response;

import lombok.Data;

@Data
public class CreateMessengerResponse {
    private String status;
    private Long chatId;

    public CreateMessengerResponse(String status, Long chatId) {
        this.status = status;
        this.chatId = chatId;
    }
}
