package com.yukgaejang.voss.domain.messenger.websocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.yukgaejang.voss.domain.messenger.repository.entity.MongoChat;
import com.yukgaejang.voss.domain.messenger.repository.mongo.MongoChatRepository;
import com.yukgaejang.voss.domain.messenger.service.MessengerService;
import com.yukgaejang.voss.domain.messenger.service.dto.ChatMessageDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
@Slf4j
public class WebSocketHandler extends TextWebSocketHandler {
    private final ObjectMapper objectMapper;
    private final MessengerService messengerService;
    private final MongoChatRepository mongoChatRepository;

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        ChatMessageDto chatMessageDto = objectMapper.readValue(payload, ChatMessageDto.class);

        ChatRoom chatRoom = messengerService.findRoomById(chatMessageDto.getSessionId());
        chatRoom.handlerAction(session, chatMessageDto, messengerService);

        MongoChat mongoChat = new MongoChat(chatMessageDto.getChatId(), chatMessageDto.getSessionId(),
                chatMessageDto.getMemberId(), chatMessageDto.getContent(), LocalDateTime.now());

        mongoChatRepository.save(mongoChat);

    }
}
