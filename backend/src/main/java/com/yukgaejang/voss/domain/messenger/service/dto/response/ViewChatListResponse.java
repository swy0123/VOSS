package com.yukgaejang.voss.domain.messenger.service.dto.response;

import com.yukgaejang.voss.domain.messenger.service.dto.FirebaseDto;
import lombok.Data;

import java.util.List;

@Data
public class ViewChatListResponse {
    List<FirebaseDto> chat;

    public ViewChatListResponse(List<FirebaseDto> chat) {
        this.chat = chat;
    }
}
