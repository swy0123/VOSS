package com.yukgaejang.voss.domain.messenger.service;

import com.yukgaejang.voss.domain.messenger.service.dto.request.CreateMessengerRequest;
import com.yukgaejang.voss.domain.messenger.service.dto.response.CreateMessengerResponse;
import com.yukgaejang.voss.domain.messenger.service.dto.response.ViewMessengerResponse;
import com.yukgaejang.voss.domain.messenger.websocket.ChatRoom;
import org.springframework.web.socket.WebSocketSession;

import java.util.List;

public interface MessengerService {

    List<ChatRoom> findAllRoom();

    ChatRoom findRoomById(String chatId);

    CreateMessengerResponse createRoom(CreateMessengerRequest createMessengerRequest);

    <T> void sendMessage(WebSocketSession session, T message);

    ViewMessengerResponse viewMessenger(String email);
}
