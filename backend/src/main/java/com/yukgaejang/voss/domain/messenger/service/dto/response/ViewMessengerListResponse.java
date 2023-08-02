package com.yukgaejang.voss.domain.messenger.service.dto.response;

import com.yukgaejang.voss.domain.messenger.repository.entity.Attend;
import lombok.Data;

@Data
public class ViewMessengerListResponse {
    private String name;
    private Long chatId;
    private String sessionId;

    public ViewMessengerListResponse(Attend attend) {
        this.name = attend.getMember().getNickname();
        this.chatId = attend.getChat().getId();
        this.sessionId = attend.getChat().getSession();
    }
}
