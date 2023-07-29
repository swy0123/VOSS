package com.yukgaejang.voss.domain.messenger.websocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import com.yukgaejang.voss.domain.messenger.service.MessengerService;
import com.yukgaejang.voss.domain.messenger.service.dto.ChatMessageDto;
import com.yukgaejang.voss.domain.messenger.service.dto.FirebaseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
@RequiredArgsConstructor
@Slf4j
public class WebSocketHandler extends TextWebSocketHandler {
    private final ObjectMapper objectMapper;
    private final MessengerService messengerService;

    private static final String COLLECTION_NAME = "chat";

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        log.info("{}", payload);
        ChatMessageDto chatMessageDto = objectMapper.readValue(payload, ChatMessageDto.class);

        ChatRoom chatRoom = messengerService.findRoomById(chatMessageDto.getSessionId());
        chatRoom.handlerAction(session, chatMessageDto, messengerService);

        FirebaseDto firebaseDto = new FirebaseDto(chatMessageDto.getChatId(), chatMessageDto.getMemberId(), chatMessageDto.getContent());
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<DocumentReference> add = firestore.collection(COLLECTION_NAME).add(firebaseDto);
        System.out.println(add.get().toString());
    }
}
