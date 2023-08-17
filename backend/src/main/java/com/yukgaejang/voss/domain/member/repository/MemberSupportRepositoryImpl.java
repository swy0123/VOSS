package com.yukgaejang.voss.domain.member.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.yukgaejang.voss.domain.member.repository.entity.Member;
import com.yukgaejang.voss.domain.member.service.dto.response.GetMemberList;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

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

    @Override
    public Page<GetMemberList> findMemberListByNicknameAndIsDeletedFalse(String keyword, Pageable pageable) {
        List<GetMemberList> content = queryFactory
                .selectFrom(member)
                .where(nicknameContains(keyword).and(member.isDeleted.eq(false)))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(member.nickname.length().asc())
                .fetch()
                .stream()
                .map(o -> new GetMemberList(o))
                .collect(Collectors.toList());

        JPAQuery<Long> countQuery = queryFactory
                .select(member.count())
                .from(member)
                .where(nicknameContains(keyword));

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchOne);
    }

    private BooleanExpression nicknameContains(String nickname) {
        return nickname == null ? null : member.nickname.contains(nickname);
    }
}
