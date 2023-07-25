package com.yukgaejang.voss.domain.meet.repository;

import com.yukgaejang.voss.domain.meet.repository.entity.Meet;

import java.util.Optional;


public interface MeetSupportRepository {

    Optional<Meet> findByMeetId(Long meetId);
}
