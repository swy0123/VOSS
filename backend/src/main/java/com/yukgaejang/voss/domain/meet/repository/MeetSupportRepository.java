package com.yukgaejang.voss.domain.meet.repository;

import com.yukgaejang.voss.domain.meet.repository.entity.Meet;
import com.yukgaejang.voss.domain.meet.service.dto.request.SelectScriptRequest;
import com.yukgaejang.voss.domain.practice.repository.entity.Script;

import java.util.Optional;


public interface MeetSupportRepository {

    Optional<Meet> findByMeetId(Long meetId);

    long setScript(SelectScriptRequest selectScriptRequest, Script script);
}
