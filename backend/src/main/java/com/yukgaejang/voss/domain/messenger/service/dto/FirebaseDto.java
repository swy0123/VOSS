package com.yukgaejang.voss.domain.messenger.service.dto;

import lombok.Data;

import java.util.Date;

@Data
public class FirebaseDto {
    private Long chatId;
    private Long memberId;
    private String content;
    private Date date;

    public FirebaseDto(Long chatId, Long memberId, String content, Date date) {
        this.chatId = chatId;
        this.memberId = memberId;
        this.content = content;
        this.date = date;
    }
}
