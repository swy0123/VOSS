package com.yukgaejang.voss.domain.messenger.service.dto.response;

import com.yukgaejang.voss.domain.messenger.service.dto.ViewMessengerListDto;
import lombok.Data;

import java.util.List;

@Data
public class ViewMessengerResponse {
    List<ViewMessengerListDto> chat;

    public ViewMessengerResponse(List<ViewMessengerListDto> chat) {
        this.chat = chat;
    }
}
