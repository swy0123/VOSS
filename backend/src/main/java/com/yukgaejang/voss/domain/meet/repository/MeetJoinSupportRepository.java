package com.yukgaejang.voss.domain.meet.repository;

import com.yukgaejang.voss.domain.meet.repository.entity.MeetJoin;
import com.yukgaejang.voss.domain.practice.repository.entity.Casting;

import java.util.List;

public interface MeetJoinSupportRepository {

    List<MeetJoin> findByMeetId(Long meetId);

    MeetJoin findByMemberId(Long memberId);

    void selectCasting(Long memberId, Long meetRoomId, Casting casting);

    void resetCasting(Long meetRoomId);
}
