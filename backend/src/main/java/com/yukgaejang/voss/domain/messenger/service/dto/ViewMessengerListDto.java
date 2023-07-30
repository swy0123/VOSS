package com.yukgaejang.voss.domain.messenger.service.dto;

import com.yukgaejang.voss.domain.messenger.repository.entity.Attend;
import lombok.Data;

@Data
public class ViewMessengerListDto {
    private String name;
    private Long chatId;

    public ViewMessengerListDto(Attend attend) {
        this.name = attend.getMember().getNickname();
        this.chatId = attend.getChat().getId();
    }
}
