package com.yukgaejang.voss.domain.meet.repository.entity;

import com.yukgaejang.voss.domain.meet.repository.MeetJoinRepository;
import com.yukgaejang.voss.domain.meet.repository.MeetRepository;
import com.yukgaejang.voss.domain.member.repository.MemberRepository;
import com.yukgaejang.voss.domain.member.repository.entity.Member;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@Rollback(value = false)
class MeetTest {
    @Autowired
    EntityManager em;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    MeetJoinRepository meetJoinRepository;

    @Autowired
    MeetRepository meetRepository;


    @Test
    public void MeetJoin() throws Exception {

        Optional<Meet> meet = meetRepository.findById(41L);
        Optional<Member> member = memberRepository.findByEmail("nerrw@naver.com");
        meetJoinRepository.save(new MeetJoin(member.get(), meet.get()));



    }

}