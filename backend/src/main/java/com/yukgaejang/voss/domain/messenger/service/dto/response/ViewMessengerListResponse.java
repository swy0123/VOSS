package com.yukgaejang.voss.domain.messenger.service.dto.response;

import com.yukgaejang.voss.domain.messenger.repository.entity.Attend;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ViewMessengerListResponse {
    private String name;
    private Long chatId;
    private Long memberId;
    private String sessionId;
    private LocalDateTime lastLeaveTime;
    private LocalDateTime lastReceiveMessageTime;

    public ViewMessengerListResponse(Attend attend) {
        this.name = attend.getMember().getNickname();
        this.chatId = attend.getChat().getId();
        this.memberId = attend.getMember().getId();
        this.sessionId = attend.getChat().getSession();
        this.lastLeaveTime = attend.getLeaveTime();
        this.lastReceiveMessageTime = attend.getReceiveMessageTime();
    }
}
