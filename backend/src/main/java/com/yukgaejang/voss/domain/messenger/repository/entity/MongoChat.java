package com.yukgaejang.voss.domain.messenger.repository.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "chat")
@Getter @Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MongoChat {
    @Id
    private Long  chatId;
    private Long sessionId;
    private Long memberId;
    private String content;

    public MongoChat(Long chatId, Long sessionId, Long memberId, String content) {
        this.chatId = chatId;
        this.sessionId = sessionId;
        this.memberId = memberId;
        this.content = content;
    }
}
