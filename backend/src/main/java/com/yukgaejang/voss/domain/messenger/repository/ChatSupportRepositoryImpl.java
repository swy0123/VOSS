package com.yukgaejang.voss.domain.messenger.repository;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.yukgaejang.voss.domain.messenger.repository.entity.Chat;
import com.yukgaejang.voss.domain.messenger.service.dto.FirebaseDto;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

import static com.yukgaejang.voss.domain.messenger.repository.entity.QChat.*;

@Repository
public class ChatSupportRepositoryImpl implements ChatSupportRepository{
    private final JPAQueryFactory queryFactory;
    private static final String COLLECTION_NAME = "chat";

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
    public List<FirebaseDto> viewChatList(Long chatId, int offset, int limit) {
        List<FirebaseDto> list = new ArrayList<>();
        Firestore firestore = FirestoreClient.getFirestore();
        Query query = firestore.collection(COLLECTION_NAME)
                .whereEqualTo("chatId", chatId)
                .orderBy("timestamp", Query.Direction.DESCENDING)
                .offset(offset*limit)
                .limit(limit);
        try {
            ApiFuture<QuerySnapshot> future = query.get();
            List<QueryDocumentSnapshot> documents = future.get().getDocuments();
            for (QueryDocumentSnapshot document : documents) {
                list.add(document.toObject(FirebaseDto.class));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
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
