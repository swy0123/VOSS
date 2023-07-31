package com.yukgaejang.voss.domain.freeboard.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.yukgaejang.voss.domain.freeboard.repository.entity.PostComment;
import com.yukgaejang.voss.domain.freeboard.repository.entity.QPostComment;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.CommentDetailResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;

import java.util.List;

public class PostCommentSupportRepositoryImpl implements PostCommentSupportRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public PostCommentSupportRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Override
    public List<CommentDetailResponse> findAllByPostIdAndIsDeletedFalse(Long postId) {
        QPostComment pc = QPostComment.postComment;

        return jpaQueryFactory
                .select(Projections.constructor(CommentDetailResponse.class, pc))
                .from(pc)
                .leftJoin(pc.member).fetchJoin()
                .where(pc.post.id.eq(postId).and(pc.isDeleted.eq(0)))
                .fetch();
    }

    @Override
    public PostComment findByIdAndIsDeletedFalse(Long commentId) {
        QPostComment pc = QPostComment.postComment;

        return jpaQueryFactory
                .select(pc)
                .from(pc)
                .where(pc.id.eq(commentId).and(pc.isDeleted.eq(0)))
                .fetchOne();
    }
}
