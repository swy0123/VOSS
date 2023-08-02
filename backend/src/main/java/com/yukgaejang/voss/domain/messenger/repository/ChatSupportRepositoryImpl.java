package com.yukgaejang.voss.domain.messenger.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.yukgaejang.voss.domain.messenger.repository.entity.Chat;
import org.springframework.stereotype.Repository;


import static com.yukgaejang.voss.domain.messenger.repository.entity.QChat.*;

@Repository
public class ChatSupportRepositoryImpl implements ChatSupportRepository{
    private final JPAQueryFactory queryFactory;

    public ChatSupportRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    @Override
    public Chat findBySessionId(String sessionId) {
        return queryFactory
                .selectFrom(chat)
                .where(chat.session.eq(sessionId))
                .fetchOne();
    }

    @Override
    public Chat findByChatId(Long chatId) {
        return queryFactory
                .selectDistinct(chat)
                .from(chat)
                .where(chat.id.eq(chatId))
                .fetchOne();
    }
}
