package com.yukgaejang.voss.domain.messenger.service.dto.response;

import lombok.Data;

@Data
public class CreateMessengerResponse {
    private String status;

    public CreateMessengerResponse(String status) {
        this.status = status;
    }
}
