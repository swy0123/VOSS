package com.yukgaejang.voss.domain.meet.repository;

import com.yukgaejang.voss.domain.meet.repository.entity.MeetJoin;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

@SpringBootTest
@Transactional
public class getCurrentCount {
    @Autowired MeetJoinRepository meetJoinRepository;

    @Test
    public void currentCount(){
        List<MeetJoin> findMeetJoin = meetJoinRepository.findByMeetId(49L);
        for (MeetJoin meetJoin : findMeetJoin) {
            System.out.println("meetJoin = " + meetJoin.getMeet().getMaxCount());
        }
    }
}
