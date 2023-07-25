package com.yukgaejang.voss.domain.meet.repository;

import com.yukgaejang.voss.domain.meet.repository.entity.MeetJoin;

import java.util.List;

public interface MeetJoinSupportRepository {

    List<MeetJoin> findByMeetId(Long meetId);

    MeetJoin findByEmail(String email);
}
