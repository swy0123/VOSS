package com.yukgaejang.voss.domain.grouppractice.repository;

import com.yukgaejang.voss.domain.grouppractice.repository.entity.Cast;

import java.util.List;

public interface CastSupportRepository {

    List<Cast> findByMeetRoomId(Long meetRoomId);
}
