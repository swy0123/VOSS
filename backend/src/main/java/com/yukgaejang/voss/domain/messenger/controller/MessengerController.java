package com.yukgaejang.voss.domain.messenger.controller;

import com.yukgaejang.voss.domain.messenger.service.MessengerService;
import com.yukgaejang.voss.domain.messenger.service.dto.request.CreateMessengerRequest;
import com.yukgaejang.voss.domain.messenger.service.dto.response.CreateMessengerResponse;
import com.yukgaejang.voss.domain.messenger.service.dto.response.ViewChatListResponse;
import com.yukgaejang.voss.domain.messenger.service.dto.response.ViewMessengerResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/messenger")
public class MessengerController {
    private final MessengerService messengerService;

    @PostMapping("")
    public ResponseEntity<CreateMessengerResponse> createRoom(@RequestBody CreateMessengerRequest createMessengerRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        createMessengerRequest.setMyMemberEmail(email);
        return ResponseEntity.ok(messengerService.createRoom(createMessengerRequest));
    }

    @GetMapping
    public ResponseEntity<ViewMessengerResponse> viewMessengerList() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return ResponseEntity.ok(messengerService.viewMessenger(email));
    }

    @GetMapping("/{chatId}")
    public ResponseEntity<ViewChatListResponse> viewChatList(@PathVariable Long chatId, int offset, int limit) {
        messengerService.JoinChatSession(chatId);
        return ResponseEntity.ok(messengerService.viewChatList(chatId, offset, limit));
    }
}
