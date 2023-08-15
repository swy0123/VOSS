package com.yukgaejang.voss.domain.freeboard.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.yukgaejang.voss.domain.freeboard.repository.entity.PostComment;
import com.yukgaejang.voss.domain.freeboard.repository.entity.QPost;
import com.yukgaejang.voss.domain.freeboard.repository.entity.QPostComment;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.CommentDetailResponse;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.MyCommentListResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;

import java.util.List;

import static com.yukgaejang.voss.domain.freeboard.repository.entity.QPost.post;

public class PostCommentSupportRepositoryImpl implements PostCommentSupportRepository {
    static QPostComment pc = QPostComment.postComment;
    static QPost p = QPost.post;

    private final JPAQueryFactory jpaQueryFactory;

    public PostCommentSupportRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Override
    public List<CommentDetailResponse> findAllByPostIdAndIsDeletedFalse(Long postId) {
        return jpaQueryFactory
                .select(Projections.constructor(CommentDetailResponse.class, pc))
                .from(pc)
                .leftJoin(pc.member).fetchJoin()
                .where(pc.post.id.eq(postId).and(pc.isDeleted.eq(0)))
                .fetch();
    }

    @Override
    public PostComment findByIdAndIsDeletedFalse(Long commentId) {
        return jpaQueryFactory
                .select(pc)
                .from(pc)
                .where(pc.id.eq(commentId).and(pc.isDeleted.eq(0)))
                .fetchOne();
    }

    @Override
    public Page<MyCommentListResponse> findAllByMemberEmailAndIsDeletedFalse(Pageable pageable, String email) {
        List<MyCommentListResponse> comments = jpaQueryFactory
                .select(Projections.constructor(MyCommentListResponse.class,
                        p,
                        pc))
                .from(pc)
                .leftJoin(pc.post, p)
                .where(pc.member.email.eq(email).and(pc.isDeleted.eq(0)))
                .orderBy(pc.createdAt.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Long> countQuery = jpaQueryFactory
                .select(pc.post.id.count())
                .from(pc)
                .where(pc.member.email.eq(email).and(pc.isDeleted.eq(0)))
                .groupBy(pc.post);

        return new PageImpl<>(comments, pageable, countQuery.fetchOne());
    }
}
