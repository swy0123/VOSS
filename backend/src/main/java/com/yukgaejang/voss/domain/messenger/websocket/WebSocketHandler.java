package com.yukgaejang.voss.domain.messenger.websocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.yukgaejang.voss.domain.messenger.repository.AttendRepository;
import com.yukgaejang.voss.domain.messenger.repository.entity.DirectChat;
import com.yukgaejang.voss.domain.messenger.repository.mongo.DirectChatRepository;
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
    private final DirectChatRepository directChatRepository;
    private final AttendRepository attendRepository;

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        ChatMessageDto chatMessageDto = objectMapper.readValue(payload, ChatMessageDto.class);
        chatMessageDto.setTime(LocalDateTime.now());

        ChatRoom chatRoom = messengerService.findRoomById(chatMessageDto.getSessionId());
        chatRoom.handlerAction(session, chatMessageDto, messengerService);

        if (
                !chatMessageDto.getContent().equals("leave") &&
                !chatMessageDto.getSessionId().equals("init") &&
                !chatMessageDto.getContent().equals("enter")
        ) {
            DirectChat directChat = new DirectChat(chatMessageDto.getChatId(), chatMessageDto.getSessionId(),
                    chatMessageDto.getMemberId(), chatMessageDto.getContent(), LocalDateTime.now());
            directChatRepository.save(directChat);
            attendRepository.updateLastMessageTime(chatMessageDto.getChatId(), chatMessageDto.getMemberId());
        }
    }
}
