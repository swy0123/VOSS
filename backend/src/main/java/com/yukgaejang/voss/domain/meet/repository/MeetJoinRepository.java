package com.yukgaejang.voss.domain.meet.repository;

import com.yukgaejang.voss.domain.meet.repository.entity.MeetJoin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MeetJoinRepository extends JpaRepository<MeetJoin, Long> {

    List<MeetJoin> findByMeetId(Long meetId);
}
