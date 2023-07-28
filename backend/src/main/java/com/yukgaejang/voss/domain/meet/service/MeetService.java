package com.yukgaejang.voss.domain.meet.service;

import com.yukgaejang.voss.domain.meet.service.dto.request.*;
import com.yukgaejang.voss.domain.meet.service.dto.response.*;
import org.springframework.data.domain.Page;

import java.util.List;

public interface MeetService {

    Page<ViewAllMeetRoomResponse> getMeetList(MeetSearchCondition condition);

    InitMeetRoomResponse initMeetRoom(CreateSessionIdRequest createSessionIdRequest, String email);

    JoinMeetRoomResponse joinMeetRoom(JoinMeetRoomRequest joinMeetRoomRequest, String email);

    GetStatusResponse leaveMeetRoom(Long meetRoomId, String email);

    GetStatusResponse selectScript(SelectScriptRequest selectScriptRequest);

    SelectCastingResponse selectCasting(List<SelectCastingRequest> selectCastingRequestList);

    GetAllMeetJoinResponse getMeetJoinList(Long meetRoomId);
}
