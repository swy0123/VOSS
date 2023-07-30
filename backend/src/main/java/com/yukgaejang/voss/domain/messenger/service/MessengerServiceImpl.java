package com.yukgaejang.voss.domain.messenger.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.yukgaejang.voss.domain.member.exception.NoMemberException;
import com.yukgaejang.voss.domain.member.repository.MemberRepository;
import com.yukgaejang.voss.domain.member.repository.entity.Member;
import com.yukgaejang.voss.domain.messenger.repository.AttendRepository;
import com.yukgaejang.voss.domain.messenger.repository.ChatRepository;
import com.yukgaejang.voss.domain.messenger.repository.entity.Attend;
import com.yukgaejang.voss.domain.messenger.repository.entity.Chat;
import com.yukgaejang.voss.domain.messenger.service.dto.request.CreateMessengerRequest;
import com.yukgaejang.voss.domain.messenger.service.dto.response.CreateMessengerResponse;
import com.yukgaejang.voss.domain.messenger.websocket.ChatRoom;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class MessengerServiceImpl implements MessengerService{
    private final ObjectMapper objectMapper;
    private Map<String, ChatRoom> chatRooms;

    private final ChatRepository chatRepository;
    private final MemberRepository memberRepository;
    private final AttendRepository attendRepository;

    @PostConstruct
    private void init() {
        chatRooms = new LinkedHashMap<>();
    }

    @Override
    public List<ChatRoom> findAllRoom() {
        return new ArrayList<>(chatRooms.values());
    }

    @Override
    public ChatRoom findRoomById(String chatId) {
        return chatRooms.get(chatId);
    }

    @Override
    public CreateMessengerResponse createRoom(CreateMessengerRequest createMessengerRequest) {
        String email = createMessengerRequest.getMyMemberEmail();
        Member myMember = memberRepository.findByEmail(email)
                .orElseThrow(() -> new NoMemberException("회원이 없습니다"));
        Long myMemberId = myMember.getId();
        String myId = myMemberId.toString();
        String yourId = createMessengerRequest.getYourMemberId().toString();
        Member yourMember = memberRepository.findById(createMessengerRequest.getYourMemberId())
                .orElseThrow(() -> new NoMemberException("회원이 없습니다."));
        String sessionId = myId + yourId;
        ChatRoom chatRoom = ChatRoom.builder()
                .chatId(sessionId)
                .build();
        chatRooms.put(sessionId, chatRoom);
        Chat chat = new Chat(sessionId);

        chatRepository.save(chat);
        Chat findChat = chatRepository.findBySessionId(sessionId);
        attendRepository.save(new Attend(myMember, findChat));
        attendRepository.save(new Attend(yourMember, findChat));

        return new CreateMessengerResponse("생성 성공", findChat.getId());
    }

    @Override
    public <T> void sendMessage(WebSocketSession session, T message) {
        try {
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(message)));
        } catch (IOException e) {
            log.error(e.getMessage(), e);
            throw new RuntimeException(e);
        }
    }
}
