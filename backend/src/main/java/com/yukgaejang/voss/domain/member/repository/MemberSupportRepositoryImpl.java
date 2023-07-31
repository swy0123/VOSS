package com.yukgaejang.voss.domain.member.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.yukgaejang.voss.domain.member.repository.entity.Member;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.yukgaejang.voss.domain.member.repository.entity.QMember.*;

@Repository
public class MemberSupportRepositoryImpl implements MemberSupportRepository{

    private final JPAQueryFactory queryFactory;

    public MemberSupportRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    @Override
    public List<Member> findByEmailList(List<String> emailList) {
        return queryFactory
                .selectFrom(member)
                .where(member.email.in(emailList))
                .fetch();
    }
}
