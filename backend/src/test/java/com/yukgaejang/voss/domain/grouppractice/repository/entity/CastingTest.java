package com.yukgaejang.voss.domain.grouppractice.repository.entity;

import com.yukgaejang.voss.domain.grouppractice.repository.CastingRepository;
import com.yukgaejang.voss.domain.meet.repository.MeetJoinRepository;
import com.yukgaejang.voss.domain.meet.repository.entity.MeetJoin;
import com.yukgaejang.voss.domain.member.repository.MemberRepository;
import com.yukgaejang.voss.domain.practice.repository.ScriptLineRepository;
import com.yukgaejang.voss.domain.practice.repository.entity.ScriptLine;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import java.util.List;


@SpringBootTest
@Transactional
@Rollback(value = false)
class CastingTest {

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    MeetJoinRepository meetJoinRepository;

    @Autowired
    ScriptLineRepository scriptLineRepository;

    @Autowired
    CastingRepository castingRepository;

    @Autowired
    EntityManager em;

    @Test
    public void setCasting() {
        // 미팅방에 참여한 인원
//        List<MeetJoin> byMeetId = meetJoinRepository.findByMeetId(50L);
        MeetJoin findMeetJoin = meetJoinRepository.findByEmail("won@naver.com");
        // 스크립트 할당
        List<ScriptLine> scripts = scriptLineRepository.findByName("포카칩");
        Casting casting = new Casting(findMeetJoin, scripts);
        castingRepository.save(casting);
    }

    @Test
    public void getCasting() {
        // MeetRoomId로 Casting 을 얻어와보자
        List<Casting> castingList = castingRepository.findByMeetRoomId(50L);
        System.out.println(castingList.size());

        // 스크립트와
//        for (Casting casting : castingList) {
//            casting.getScriptLine().stream().forEach(scriptLine -> System.out.println("scriptLine.getContent() = " + scriptLine.getContent()));
//            Long memberId = casting.getMeetJoin().getId();
//            System.out.println("memberId = " + memberId);
////            Optional<Member> member = memberRepository.findById(memberId);
////            System.out.println("member = " + member.orElseThrow().getEmail());
//        }
    }

}