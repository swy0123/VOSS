package com.yukgaejang.voss.domain.messenger.controller;

import com.yukgaejang.voss.domain.messenger.service.MessengerService;
import com.yukgaejang.voss.domain.messenger.websocket.ChatRoom;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/messenger")
public class MessengerController {
    private final MessengerService messengerService;

    @PostMapping("")
    public ChatRoom createRoom(@RequestBody String name) {
        return messengerService.createRoom(name);
    }

    @GetMapping("")
    public List<ChatRoom> findAllRoom() {
        return messengerService.findAllRoom();
    }
}
