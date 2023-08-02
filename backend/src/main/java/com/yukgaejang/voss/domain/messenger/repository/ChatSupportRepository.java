package com.yukgaejang.voss.domain.messenger.repository;

import com.yukgaejang.voss.domain.messenger.repository.entity.Chat;

public interface ChatSupportRepository {
    Chat findBySessionId(String sessionId);

    Chat findByChatId(Long chatId);
}
