package com.yukgaejang.voss.domain.meet.repository.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMeetJoin is a Querydsl query type for MeetJoin
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMeetJoin extends EntityPathBase<MeetJoin> {

    private static final long serialVersionUID = -124395083L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMeetJoin meetJoin = new QMeetJoin("meetJoin");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QMeet meet;

    public final com.yukgaejang.voss.domain.member.repository.entity.QMember member;

    public QMeetJoin(String variable) {
        this(MeetJoin.class, forVariable(variable), INITS);
    }

    public QMeetJoin(Path<? extends MeetJoin> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMeetJoin(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMeetJoin(PathMetadata metadata, PathInits inits) {
        this(MeetJoin.class, metadata, inits);
    }

    public QMeetJoin(Class<? extends MeetJoin> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.meet = inits.isInitialized("meet") ? new QMeet(forProperty("meet")) : null;
        this.member = inits.isInitialized("member") ? new com.yukgaejang.voss.domain.member.repository.entity.QMember(forProperty("member")) : null;
    }

}

