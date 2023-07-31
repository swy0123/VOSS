package com.yukgaejang.voss.domain.meet.repository;

import com.yukgaejang.voss.domain.meet.repository.entity.Meet;
import com.yukgaejang.voss.domain.meet.service.dto.request.MeetSearchCondition;
import com.yukgaejang.voss.domain.meet.service.dto.request.SelectScriptRequest;
import com.yukgaejang.voss.domain.practice.repository.entity.Script;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;


public interface MeetSupportRepository {

    Optional<Meet> findByMeetId(Long meetId);

    long setScript(SelectScriptRequest selectScriptRequest, Script script);

    void leaveMeetRoom(Long meetId);

    Page<Meet> getMeetList(MeetSearchCondition condition, Pageable pageable);

    Page<Meet> getMeetListBySessionId(MeetSearchCondition condition, Pageable pageable, List<String> sessionIdList);
}
