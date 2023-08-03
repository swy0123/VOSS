package com.yukgaejang.voss.domain.freeboard.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.yukgaejang.voss.domain.freeboard.repository.entity.PostFile;
import com.yukgaejang.voss.domain.freeboard.repository.entity.QPostFile;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.PostFileDetailResponse;

import java.util.List;

public class PostFileSupportRepositoryImpl implements PostFileSupportRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public PostFileSupportRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }


    @Override
    public PostFile findByPostFileIdAndIsDeletedFalse(Long postFileId) {
        QPostFile pf = QPostFile.postFile;
        return jpaQueryFactory
                .selectFrom(pf)
                .where(pf.id.eq(postFileId).and(pf.isDeleted.eq(0)))
                .fetchOne();
    }

    @Override
    public List<PostFileDetailResponse> findAllByPostIdAndIsDeletedFalse(Long postId) {
        QPostFile pf = QPostFile.postFile;

        return jpaQueryFactory
                .select(Projections.constructor(PostFileDetailResponse.class, pf))
                .from(pf)
                .where(pf.post.id.eq(postId).and(pf.isDeleted.eq(0)))
                .fetch();
    }

    @Override
    public List<PostFileDetailResponse> findAllByPostIdAndIsDeletedFalseAndContentTypeStartsWith(Long postId, String contentType) {
        QPostFile pf = QPostFile.postFile;

        return jpaQueryFactory
                .select(Projections.constructor(PostFileDetailResponse.class, pf))
                .from(pf)
                .where(pf.post.id.eq(postId).and(pf.isDeleted.eq(0)).and(pf.contentType.startsWith(contentType)))
                .fetch();
    }

    @Override
    public List<PostFileDetailResponse> findAllByPostIdAndIsDeletedFalseAndContentTypeNotStartsWith(Long postId, String contentType) {
        QPostFile pf = QPostFile.postFile;

        return jpaQueryFactory
                .select(Projections.constructor(PostFileDetailResponse.class, pf))
                .from(pf)
                .where(pf.post.id.eq(postId).and(pf.isDeleted.eq(0)).and(pf.contentType.startsWith(contentType).not()))
                .fetch();
    }
}
