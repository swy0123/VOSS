package com.yukgaejang.voss.domain.meet.controller;

import com.yukgaejang.voss.domain.auth.controller.AuthController;
import com.yukgaejang.voss.domain.meet.service.MeetService;
import com.yukgaejang.voss.domain.meet.service.dto.request.*;
import com.yukgaejang.voss.domain.meet.service.dto.response.InitMeetRoomResponse;
import com.yukgaejang.voss.domain.meet.service.dto.response.JoinMeetRoomResponse;
import com.yukgaejang.voss.domain.meet.service.dto.response.getStatusResponse;
import com.yukgaejang.voss.domain.meet.service.dto.response.ViewAllMeetRoomResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<InitMeetRoomResponse> getSessionId(@RequestBody CreateSessionIdRequest createSessionIdRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return ResponseEntity.ok(meetService.initMeetRoom(createSessionIdRequest, email));
    }

    @PostMapping("/join")
    public ResponseEntity<JoinMeetRoomResponse> joinMeetRoom(@RequestBody JoinMeetRoomRequest joinMeetRoomRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return ResponseEntity.ok(meetService.joinMeetRoom(joinMeetRoomRequest, email));
    }

    @DeleteMapping("/{meetRoomId}")
    public ResponseEntity<getStatusResponse> leaveMeetRoom(@PathVariable Long meetRoomId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return ResponseEntity.ok(meetService.leaveMeetRoom(meetRoomId, email));
    }

    @PostMapping("/script")
    public ResponseEntity<getStatusResponse> selectScript(@RequestBody SelectScriptRequest selectScriptRequest) {
        return ResponseEntity.ok(meetService.selectScript(selectScriptRequest));
    }

    @PostMapping("/select-casting")
    public ResponseEntity<getStatusResponse> selectCasting(@RequestBody List<SelectCastingRequest> selectCastingRequestList) {
        meetService.selectCasting(selectCastingRequestList);
        return ResponseEntity.ok(new getStatusResponse("역할 선정 완료"));
    }
}
