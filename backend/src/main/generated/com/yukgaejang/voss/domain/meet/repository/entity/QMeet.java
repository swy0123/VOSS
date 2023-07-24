package com.yukgaejang.voss.domain.meet.repository.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMeet is a Querydsl query type for Meet
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMeet extends EntityPathBase<Meet> {

    private static final long serialVersionUID = 1988722155L;

    public static final QMeet meet = new QMeet("meet");

    public final StringPath category = createString("category");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final BooleanPath isDeleted = createBoolean("isDeleted");

    public final BooleanPath isPassword = createBoolean("isPassword");

    public final NumberPath<Integer> maxCount = createNumber("maxCount", Integer.class);

    public final ListPath<MeetJoin, QMeetJoin> meetJoins = this.<MeetJoin, QMeetJoin>createList("meetJoins", MeetJoin.class, QMeetJoin.class, PathInits.DIRECT2);

    public final StringPath title = createString("title");

    public QMeet(String variable) {
        super(Meet.class, forVariable(variable));
    }

    public QMeet(Path<? extends Meet> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMeet(PathMetadata metadata) {
        super(Meet.class, metadata);
    }

}

