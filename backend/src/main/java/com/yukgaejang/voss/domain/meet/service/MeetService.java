package com.yukgaejang.voss.domain.meet.service;

import com.yukgaejang.voss.domain.meet.service.dto.request.*;
import com.yukgaejang.voss.domain.meet.service.dto.response.InitMeetRoomResponse;
import com.yukgaejang.voss.domain.meet.service.dto.response.JoinMeetRoomResponse;
import com.yukgaejang.voss.domain.meet.service.dto.response.getStatusResponse;
import com.yukgaejang.voss.domain.meet.service.dto.response.ViewAllMeetRoomResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface MeetService {

    Page<ViewAllMeetRoomResponse> getMeetList(int page, int limit);

    InitMeetRoomResponse initMeetRoom(CreateSessionIdRequest createSessionIdRequest, String email);

    JoinMeetRoomResponse joinMeetRoom(JoinMeetRoomRequest joinMeetRoomRequest, String email);

    getStatusResponse leaveMeetRoom(Long meetRoomId, String email);

    getStatusResponse selectScript(SelectScriptRequest selectScriptRequest);

    void selectCasting(List<SelectCastingRequest> selectCastingRequestList);
}
