package com.yukgaejang.voss.domain.freeboard.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.yukgaejang.voss.domain.freeboard.repository.entity.Post;
import com.yukgaejang.voss.domain.freeboard.repository.entity.QPost;
import com.yukgaejang.voss.domain.freeboard.repository.entity.QPostComment;
import com.yukgaejang.voss.domain.freeboard.repository.entity.QPostLike;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.PostListResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.querydsl.core.group.GroupBy.groupBy;
import static com.yukgaejang.voss.domain.freeboard.repository.entity.QPost.post;
import static com.yukgaejang.voss.domain.freeboard.repository.entity.QPostComment.postComment;

@Repository
public class PostSupportRepositoryImpl implements PostSupportRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public PostSupportRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Override
    public Page<PostListResponse> findAllByIsDeletedFalse(Pageable pageable) {
        QPost p = QPost.post;
        QPostComment pc = QPostComment.postComment;
        QPostLike pl = QPostLike.postLike;

        List<PostListResponse> posts = jpaQueryFactory
                .select(Projections.constructor(PostListResponse.class, p, pc.id.count(), pl.id.count()))
                .from(p)
                .leftJoin(p.member).fetchJoin()
                .leftJoin(pc).on(p.id.eq(pc.post.id).and(pc.isDeleted.eq(0)))
                .leftJoin(pl).on(p.id.eq(pl.post.id))
                .where(p.isDeleted.eq(0))
                .groupBy(p.id)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Long> countQuery = jpaQueryFactory
                .select(p.id.count())
                .from(p)
                .where(p.isDeleted.eq(0));

        return PageableExecutionUtils.getPage(posts, pageable, countQuery::fetchOne);
    }

    @Override
    public Post findByIdAndIsDeletedFalse(Long id) {
        return jpaQueryFactory
                .selectFrom(post)
                .where(post.id.eq(id).and(post.isDeleted.eq(0)))
                .fetchOne();
    }

}
