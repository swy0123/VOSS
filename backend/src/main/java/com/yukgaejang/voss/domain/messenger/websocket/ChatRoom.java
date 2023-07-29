package com.yukgaejang.voss.domain.messenger.websocket;

import com.yukgaejang.voss.domain.messenger.service.MessengerService;
import com.yukgaejang.voss.domain.messenger.service.dto.ChatMessageDto;
import com.yukgaejang.voss.domain.messenger.service.dto.MessageType;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashSet;
import java.util.Set;

@Getter
public class ChatRoom {
    private String  chatId; // 방 번호
    private String  memberId;
    private Set<WebSocketSession> sessions = new HashSet<>();

    @Builder
    public ChatRoom(String  chatId, String  memberId) {
        this.chatId = chatId;
        this.memberId = memberId;
    }

    public void handlerAction(WebSocketSession session, ChatMessageDto chatMessageDto, MessengerService messengerService) {
//        if(chatMessageDto.getType().equals(MessageType.ENTER)) {
//            sessions.add(session);
//            chatMessageDto.setContent(chatMessageDto.getMemberId() + "님이 입장했습니다.");
//        }
        sessions.add(session);
        sendMessage(chatMessageDto, messengerService);
    }

    private <T> void sendMessage(T message, MessengerService messengerService) {
        sessions.parallelStream()
                .forEach(session -> messengerService.sendMessage(session, message));
    }
}
