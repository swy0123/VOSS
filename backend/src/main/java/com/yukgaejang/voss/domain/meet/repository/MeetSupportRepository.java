package com.yukgaejang.voss.domain.meet.repository;

import com.yukgaejang.voss.domain.meet.repository.entity.Meet;
import com.yukgaejang.voss.domain.meet.service.dto.request.MeetSearchCondition;
import com.yukgaejang.voss.domain.meet.service.dto.request.SelectScriptRequest;
import com.yukgaejang.voss.domain.practice.repository.entity.Script;

import java.util.List;
import java.util.Optional;
import java.util.Set;


public interface MeetSupportRepository {

    Optional<Meet> findByMeetId(Long meetId);

    long setScript(SelectScriptRequest selectScriptRequest, Script script);

    void leaveMeetRoom(Long meetId);

    List<Meet> getMeetListBySessionId(MeetSearchCondition condition, Set<String> sessionIdList);
}
