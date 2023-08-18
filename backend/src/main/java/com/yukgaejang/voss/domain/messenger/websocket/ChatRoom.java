package com.yukgaejang.voss.domain.messenger.websocket;

import com.yukgaejang.voss.domain.messenger.service.MessengerService;
import com.yukgaejang.voss.domain.messenger.service.dto.ChatMessageDto;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.socket.WebSocketSession;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
public class ChatRoom {
    private String sessionId; // 방 번호
    private Set<WebSocketSession> sessions = new HashSet<>();


    @Builder
    public ChatRoom(String sessionId) {
        this.sessionId = sessionId;
    }

    public void handlerAction(WebSocketSession session, ChatMessageDto chatMessageDto, MessengerService messengerService) {
//        if(chatMessageDto.getType().equals(ChatMessageDto.MessageType.ENTER)) {
//            sessions.add(session);
//            chatMessageDto.setContent(chatMessageDto.getMemberId() + "님이 입장했습니다.");
//        }
        if (chatMessageDto.getContent().equals("leave")) {
            messengerService.updateLeaveTime(chatMessageDto.getChatId(), chatMessageDto.getMemberId());
            sessions.remove(session);
        } else if (chatMessageDto.getContent().equals("enter")) {
            sessions.add(session);
        }
        else {
            sessions.add(session);
            sendMessage(chatMessageDto, messengerService);
        }
    }

    private <T> void sendMessage(T message, MessengerService messengerService) {
        List<WebSocketSession> deleteSessionList = new ArrayList<>();
        for (WebSocketSession session : sessions) {
            if (session == null) {
                continue;
            }
            if (!session.isOpen()) {
                ChatMessageDto chatMessageDto = (ChatMessageDto) message;
                messengerService.updateLeaveTime(chatMessageDto.getChatId(), chatMessageDto.getMemberId());
                deleteSessionList.add(session);
            }
            else {
                messengerService.sendMessage(session, message);
            }
        }
        for (WebSocketSession deleteSession :
                deleteSessionList) {
            sessions.remove(deleteSession);
        }
//        sessions.parallelStream()
//                .forEach(session -> messengerService.sendMessage(session, message));
    }
}
