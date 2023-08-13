package com.yukgaejang.voss.domain.messenger.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.yukgaejang.voss.domain.member.exception.NoMemberException;
import com.yukgaejang.voss.domain.member.repository.MemberRepository;
import com.yukgaejang.voss.domain.member.repository.entity.Member;
import com.yukgaejang.voss.domain.messenger.repository.AttendRepository;
import com.yukgaejang.voss.domain.messenger.repository.ChatRepository;
import com.yukgaejang.voss.domain.messenger.repository.entity.Attend;
import com.yukgaejang.voss.domain.messenger.repository.entity.Chat;
import com.yukgaejang.voss.domain.messenger.repository.entity.DirectChat;
import com.yukgaejang.voss.domain.messenger.repository.mongo.DirectChatRepository;
import com.yukgaejang.voss.domain.messenger.service.dto.ChatMessageDto;
import com.yukgaejang.voss.domain.messenger.service.dto.response.ViewMessengerListResponse;
import com.yukgaejang.voss.domain.messenger.service.dto.request.CreateMessengerRequest;
import com.yukgaejang.voss.domain.messenger.service.dto.response.CreateMessengerResponse;
import com.yukgaejang.voss.domain.messenger.websocket.ChatRoom;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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
    private final DirectChatRepository directChatRepository;

    @PostConstruct
    private void init() {
        chatRooms = new LinkedHashMap<>();
        ChatRoom chatRoom = ChatRoom.builder()
                .sessionId("init")
                .build();
        chatRooms.put("init", chatRoom);

    }

    @Override
    public List<ChatRoom> findAllRoom() {
        return new ArrayList<>(chatRooms.values());
    }

    @Override
    public ChatRoom findRoomById(String sessionId) {
        return chatRooms.get(sessionId);
    }

    @Override
    public CreateMessengerResponse createRoom(CreateMessengerRequest createMessengerRequest) {
        String email = createMessengerRequest.getMyMemberEmail();
        Member myMember = memberRepository.findByEmail(email)
                .orElseThrow(() -> new NoMemberException("회원이 없습니다"));
        Long myMemberId = myMember.getId();
        String myId = myMemberId.toString()+" to ";
        String yourId = createMessengerRequest.getYourMemberId().toString();
        Member yourMember = memberRepository.findById(createMessengerRequest.getYourMemberId())
                .orElseThrow(() -> new NoMemberException("회원이 없습니다."));
        String sessionId = myId + yourId;
        ChatRoom chatRoom = ChatRoom.builder()
                .sessionId(sessionId)
                .build();
        chatRooms.put(sessionId, chatRoom);
        Chat chat = new Chat(sessionId);

        chatRepository.save(chat);
        Chat findChat = chatRepository.findBySessionId(sessionId);
        attendRepository.save(new Attend(myMember, findChat));
        attendRepository.save(new Attend(yourMember, findChat));

        return new CreateMessengerResponse("생성 성공", findChat.getId(), sessionId);
    }

    @Override
    public <T> void sendMessage(WebSocketSession session, T message) {
        try {
            if (session.isOpen()) {
                session.sendMessage(new TextMessage(objectMapper.writeValueAsString(message)));
            } else {
                ChatRoom roomById = findRoomById(((ChatMessageDto) message).getSessionId());
                session.close();
                chatRooms.remove(roomById);
            }
        } catch (IOException e) {
            log.error(e.getMessage(), e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<ViewMessengerListResponse> viewMessenger(String email) {
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new NoMemberException("회원이 아닙니다."));
        List<Long> chatIdList = attendRepository.findByMemberId(member.getId());
        List<ViewMessengerListResponse> viewMessengerList = new ArrayList<>();
        List<Attend> getAttendListByChatId = attendRepository.findByChatId(chatIdList, member.getId());
        for (Attend attend : getAttendListByChatId) {
            ViewMessengerListResponse viewMessenger = new ViewMessengerListResponse(attend.getMember().getNickname(), attend.getChat().getId(),
                    attend.getMember().getId(), attend.getChat().getSession(), attend.getLeaveTime());
            viewMessenger.setUnReadMessage(attend.getLeaveTime().compareTo(attend.getReceiveMessageTime()) < 0 ?true:false);
            viewMessengerList.add(viewMessenger);
        }
        return viewMessengerList;
    }

    @Override
    public Page<DirectChat> viewChatList(Long chatId, int page, int limit) {
        PageRequest pageRequest = PageRequest.of(page, limit, Sort.by(Sort.Direction.DESC, "time"));
        return directChatRepository.findByChatId(chatId, pageRequest);
    }

    @Override
    public void JoinChatSession(Long chatId) {
        Chat chat = chatRepository.findByChatId(chatId);
        ChatRoom findChatRoom = chatRooms.get(chat.getSession());
        if (findChatRoom == null) {
            ChatRoom chatRoom = ChatRoom.builder()
                .sessionId(chat.getSession())
                .build();
            chatRooms.put(chat.getSession(), chatRoom);
        }
    }

    @Override
    public Boolean hasUnreadMessage(String email) {
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new NoMemberException("없는 사용자입니다."));
        return attendRepository.hasUnreadMessage(member.getId());
    }

    @Override
    public void updateLeaveTime(Long chatId, Long memberId) {
        attendRepository.updateLeaveTime(chatId, memberId);
    }
}
