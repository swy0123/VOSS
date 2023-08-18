package com.yukgaejang.voss.domain.meet.controller;

import com.yukgaejang.voss.domain.meet.service.MeetService;
import com.yukgaejang.voss.domain.meet.service.dto.request.*;
import com.yukgaejang.voss.domain.meet.service.dto.response.*;
import com.yukgaejang.voss.domain.practice.serivce.dto.response.ViewScriptLineResponse;
import lombok.RequiredArgsConstructor;
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
    public ResponseEntity<List<ViewAllMeetRoomResponse>> getMeetList(MeetSearchCondition condition) {
        return ResponseEntity.ok(meetService.getMeetList(condition));
    }

    @GetMapping("/{meetRoomId}")
    public ResponseEntity<List<GetAllMeetJoinResponse>> getMeetJoinList(@PathVariable Long meetRoomId) {
        return ResponseEntity.ok(meetService.getMeetJoinList(meetRoomId));
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
    public ResponseEntity<GetStatusResponse> leaveMeetRoom(@PathVariable Long meetRoomId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return ResponseEntity.ok(meetService.leaveMeetRoom(meetRoomId, email));
    }

    @PostMapping("/script")
    public ResponseEntity<GetStatusResponse> selectScript(@RequestBody SelectScriptRequest selectScriptRequest) {
        return ResponseEntity.ok(meetService.selectScript(selectScriptRequest));
    }

    @PostMapping("/select-casting")
    public ResponseEntity<List<ViewScriptLineResponse>> selectCasting(@RequestBody List<SelectCastingRequest> selectCastingRequestList) {
        return ResponseEntity.ok(meetService.selectCasting(selectCastingRequestList));
    }

    @PostMapping("/group-recording")
    public ResponseEntity<GroupRecordResponse> meetRoomRecord(@RequestBody GroupRecordRequest groupRecordRequest) {
        return ResponseEntity.ok(meetService.meetRoomRecord(groupRecordRequest));
    }
}
