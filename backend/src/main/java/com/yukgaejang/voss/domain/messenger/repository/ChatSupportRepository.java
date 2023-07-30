package com.yukgaejang.voss.domain.messenger.repository;

import com.yukgaejang.voss.domain.messenger.repository.entity.Chat;
import com.yukgaejang.voss.domain.messenger.service.dto.FirebaseDto;

import java.util.List;

public interface ChatSupportRepository {
    Chat findBySessionId(String sessionId);

    List<FirebaseDto> viewChatList(Long chatId, int page, int limit);

    Chat findByChatId(Long chatId);
}
