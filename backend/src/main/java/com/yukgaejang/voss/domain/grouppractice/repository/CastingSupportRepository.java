package com.yukgaejang.voss.domain.grouppractice.repository;

import com.yukgaejang.voss.domain.grouppractice.repository.entity.Casting;

import java.util.List;

public interface CastingSupportRepository {

    List<Casting> findByMeetRoomId(Long meetRoomId);
}
