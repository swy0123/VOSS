package com.yukgaejang.voss.domain.badge.repository.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAttach is a Querydsl query type for Attach
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAttach extends EntityPathBase<Attach> {

    private static final long serialVersionUID = -201720351L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QAttach attach = new QAttach("attach");

    public final com.yukgaejang.voss.global.entity.QBaseEntity _super = new com.yukgaejang.voss.global.entity.QBaseEntity(this);

    public final QBadge badgeId;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.yukgaejang.voss.domain.member.repository.entity.QMember receiverId;

    public final com.yukgaejang.voss.domain.member.repository.entity.QMember senderId;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QAttach(String variable) {
        this(Attach.class, forVariable(variable), INITS);
    }

    public QAttach(Path<? extends Attach> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QAttach(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QAttach(PathMetadata metadata, PathInits inits) {
        this(Attach.class, metadata, inits);
    }

    public QAttach(Class<? extends Attach> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.badgeId = inits.isInitialized("badgeId") ? new QBadge(forProperty("badgeId")) : null;
        this.receiverId = inits.isInitialized("receiverId") ? new com.yukgaejang.voss.domain.member.repository.entity.QMember(forProperty("receiverId")) : null;
        this.senderId = inits.isInitialized("senderId") ? new com.yukgaejang.voss.domain.member.repository.entity.QMember(forProperty("senderId")) : null;
    }

}

