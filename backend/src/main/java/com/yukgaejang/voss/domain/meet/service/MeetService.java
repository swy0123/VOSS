package com.yukgaejang.voss.domain.meet.service;

import com.yukgaejang.voss.domain.meet.service.dto.request.*;
import com.yukgaejang.voss.domain.meet.service.dto.response.*;
import com.yukgaejang.voss.domain.practice.serivce.dto.response.ViewScriptLineResponse;

import java.util.List;

public interface MeetService {

    List<ViewAllMeetRoomResponse> getMeetList(MeetSearchCondition condition);

    InitMeetRoomResponse initMeetRoom(CreateSessionIdRequest createSessionIdRequest, String email);

    JoinMeetRoomResponse joinMeetRoom(JoinMeetRoomRequest joinMeetRoomRequest, String email);

    GetStatusResponse leaveMeetRoom(Long meetRoomId, String email);

    GetStatusResponse selectScript(SelectScriptRequest selectScriptRequest);

    List<ViewScriptLineResponse> selectCasting(List<SelectCastingRequest> selectCastingRequestList);

    List<GetAllMeetJoinResponse> getMeetJoinList(Long meetRoomId);

    GroupRecordResponse meetRoomRecord(GroupRecordRequest groupRecordRequest);
}