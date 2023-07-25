package com.yukgaejang.voss.domain.meet.service;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.yukgaejang.voss.domain.meet.repository.MeetJoinRepository;
import com.yukgaejang.voss.domain.meet.repository.MeetRepository;
import com.yukgaejang.voss.domain.meet.repository.entity.Meet;
import com.yukgaejang.voss.domain.meet.repository.entity.MeetJoin;
import com.yukgaejang.voss.domain.meet.repository.entity.QMeet;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class MeetServiceImplTest {

    @Autowired
    MeetRepository meetRepository;

    @Autowired
    MeetJoinRepository meetJoinRepository;

    @Autowired
    EntityManager em;

    JPAQueryFactory queryFactory;

    @Test
    public void test() {
        queryFactory = new JPAQueryFactory(em);
        Meet meet = queryFactory
                .selectFrom(QMeet.meet)
                .where(QMeet.meet.id.eq(50L))
                .fetchOne();
        System.out.println("meet.getSessionId() = " + meet.getSessionId());

    }

}