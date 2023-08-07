package com.yukgaejang.voss.domain.messenger.service;

import com.yukgaejang.voss.domain.messenger.repository.entity.DirectChat;
import com.yukgaejang.voss.domain.messenger.service.dto.response.ViewMessengerListResponse;
import com.yukgaejang.voss.domain.messenger.service.dto.request.CreateMessengerRequest;
import com.yukgaejang.voss.domain.messenger.service.dto.response.CreateMessengerResponse;
import com.yukgaejang.voss.domain.messenger.websocket.ChatRoom;
import org.springframework.data.domain.Page;
import org.springframework.web.socket.WebSocketSession;

import java.util.List;

public interface MessengerService {

    List<ChatRoom> findAllRoom();

    ChatRoom findRoomById(String chatId);

    CreateMessengerResponse createRoom(CreateMessengerRequest createMessengerRequest);

    <T> void sendMessage(WebSocketSession session, T message);

    List<ViewMessengerListResponse> viewMessenger(String email);

    Page<DirectChat> viewChatList(Long chatId, int page, int limit);

    void JoinChatSession(Long chatId);

    Boolean hasUnreadMessage(String email);

    void updateLeaveTime(Long chatId, Long memberId);
}
