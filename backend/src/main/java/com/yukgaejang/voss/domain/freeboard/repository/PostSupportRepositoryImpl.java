package com.yukgaejang.voss.domain.freeboard.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.yukgaejang.voss.domain.freeboard.repository.entity.*;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.PostListResponse;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.UserPostListResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

import static com.querydsl.core.group.GroupBy.groupBy;
import static com.yukgaejang.voss.domain.freeboard.repository.entity.QPost.post;
import static com.yukgaejang.voss.domain.freeboard.repository.entity.QPostComment.postComment;

@Repository
public class PostSupportRepositoryImpl implements PostSupportRepository {

    private final JPAQueryFactory jpaQueryFactory;

    static QPost p = QPost.post;
    static QPostComment pc = QPostComment.postComment;
    static QPostLike pl = QPostLike.postLike;
    static QPostFile pf = QPostFile.postFile;

    public PostSupportRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Override
    public Page<PostListResponse> findAllByConditionAndIsDeletedFalse(Pageable pageable, String title, String content, String nickname) {
        BooleanBuilder builder = new BooleanBuilder();
        if(title != null) {
            builder.and(p.title.contains(title));
        }
        if(content != null) {
            builder.and(p.content.contains(content).or(p.title.contains(content)));
        }
        if(nickname != null) {
            builder.and(p.member.nickname.eq(nickname));
        }

        List<PostListResponse> posts = jpaQueryFactory
                .selectDistinct(Projections.constructor(PostListResponse.class,
                        p,
                        JPAExpressions
                                .select(pc.id.count())
                                .from(pc)
                                .where(pc.post.id.eq(p.id)
                                        .and(pc.isDeleted.eq(0))),
                        p.postLikes.size(),
                        JPAExpressions
                                .select(pf.count())
                                .from(pf)
                                .where(pf.post.id.eq(p.id)
                                        .and(pf.contentType.like("image%"))),
                        JPAExpressions
                                .select(pf.count())
                                .from(pf)
                                .where(pf.post.id.eq(p.id)
                                        .and(pf.contentType.notLike("image%")))
                        )
                )
                .from(p)
                .leftJoin(p.member).fetchJoin()
                .where(p.isDeleted.eq(0).and(builder))
                .orderBy(createOrderSpecifier(pageable))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Long> countQuery = jpaQueryFactory
                .select(p.id.count())
                .from(p)
                .where(p.isDeleted.eq(0).and(builder));

        return new PageImpl<>(posts, pageable, countQuery.fetchOne());
    }

    @Override
    public Post findByIdAndIsDeletedFalse(Long id) {
        return jpaQueryFactory
                .selectFrom(post)
                .where(post.id.eq(id).and(post.isDeleted.eq(0)))
                .fetchOne();
    }

    @Override
    public Page<UserPostListResponse> findAllByMemberIdAndIsDeletedFalse(Pageable pageable, Long memberId) {
        List<UserPostListResponse> posts = jpaQueryFactory
                .selectDistinct(Projections.constructor(UserPostListResponse.class,
                        p,
                        JPAExpressions
                                .select(pc.id.count())
                                .from(pc)
                                .where(pc.post.id.eq(p.id)
                                        .and(pc.isDeleted.eq(0))),
                        p.postLikes.size(),
                        JPAExpressions
                                .select(pf.count())
                                .from(pf)
                                .where(pf.post.id.eq(p.id)
                                        .and(pf.contentType.like("image%"))),
                        JPAExpressions
                                .select(pf.count())
                                .from(pf)
                                .where(pf.post.id.eq(p.id)
                                        .and(pf.contentType.notLike("image%")))
                        )
                )
                .from(p)
                .leftJoin(p.member).fetchJoin()
                .leftJoin(pc).on(p.id.eq(pc.post.id).and(pc.isDeleted.eq(0))).fetchJoin()
                .where(
                        p.isDeleted.eq(0).and(p.member.id.eq(memberId))
                )
                .groupBy(p.id)
                .orderBy(p.createdAt.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Long> countQuery = jpaQueryFactory
                .select(p.id.count())
                .from(p)
                .where(p.isDeleted.eq(0).and(p.member.id.eq(memberId)));

        return new PageImpl<>(posts, pageable, countQuery.fetchOne());
    }

    private OrderSpecifier[] createOrderSpecifier(Pageable pageable) {
        return pageable.getSort().stream().map(order -> {
            if(order.getProperty().equals("hit")) {
                return p.hit.desc();
            } else if(order.getProperty().equals("like")) {
                return p.postLikes.size().desc();
            } else {
                return p.createdAt.desc();
            }
        }).toArray(OrderSpecifier[]::new);
    }

}
