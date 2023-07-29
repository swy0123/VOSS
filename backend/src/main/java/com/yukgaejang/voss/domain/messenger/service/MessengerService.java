package com.yukgaejang.voss.domain.messenger.service;

import com.yukgaejang.voss.domain.messenger.websocket.ChatRoom;
import org.springframework.web.socket.WebSocketSession;

import java.util.List;

public interface MessengerService {

    List<ChatRoom> findAllRoom();

    ChatRoom findRoomById(String chatId);

    ChatRoom createRoom(String memberId);

    <T> void sendMessage(WebSocketSession session, T message);
}
