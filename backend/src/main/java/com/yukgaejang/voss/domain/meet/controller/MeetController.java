package com.yukgaejang.voss.domain.meet.controller;

import com.yukgaejang.voss.domain.meet.service.MeetJoinService;
import com.yukgaejang.voss.domain.meet.service.MeetService;
import com.yukgaejang.voss.domain.meet.service.dto.request.CreateSessionIdRequest;
import com.yukgaejang.voss.domain.meet.service.dto.response.ViewAllMeetRoomResponse;
import com.yukgaejang.voss.infra.openvidu.OpenViduConnection;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/meet")
@RequiredArgsConstructor
public class MeetController {
    private final MeetService meetService;



    @GetMapping("")
    public ResponseEntity<Page<ViewAllMeetRoomResponse>> getMeetList(@Param(value = "page") int page,
                                                                     @Param(value = "limit") int limit) {
        return ResponseEntity.ok(meetService.getMeetList(page, limit));
    }

    @PostMapping("")
    public ResponseEntity<String> getSessionId(@RequestBody CreateSessionIdRequest createSessionIdRequest) {
        System.out.println("createSessionIdRequest = " + createSessionIdRequest);
        OpenViduConnection openViduConnection = new OpenViduConnection();
        String sessionId = openViduConnection.session();
        meetService.initMeetRoom(createSessionIdRequest, sessionId);
        return ResponseEntity.ok(sessionId);
    }
}
