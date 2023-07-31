package com.yukgaejang.voss.domain.freeboard.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.yukgaejang.voss.domain.freeboard.repository.entity.QPostLike;

public class PostLikeSupportRepositoryImpl implements PostLikeSupportRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public PostLikeSupportRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Override
    public boolean existsByPostIdAndEmail(Long postId, String email) {
        QPostLike pl = QPostLike.postLike;

        return jpaQueryFactory
                .selectOne()
                .from(pl)
                .where(pl.post.id.eq(postId)
                        .and(pl.member.email.eq(email)))
                .fetchOne() != null;
    }

    @Override
    public Long countByPostId(Long postId) {
        QPostLike pl = QPostLike.postLike;

        return jpaQueryFactory
                .selectOne()
                .from(pl)
                .where(pl.post.id.eq(postId))
                .fetchCount();
    }
}
