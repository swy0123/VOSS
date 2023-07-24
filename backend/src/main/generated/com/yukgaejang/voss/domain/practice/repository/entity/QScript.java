package com.yukgaejang.voss.domain.practice.repository.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QScript is a Querydsl query type for Script
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QScript extends EntityPathBase<Script> {

    private static final long serialVersionUID = 1618723835L;

    public static final QScript script = new QScript("script");

    public final com.yukgaejang.voss.global.entity.QBaseEntity _super = new com.yukgaejang.voss.global.entity.QBaseEntity(this);

    public final EnumPath<Category> category = createEnum("category", Category.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> durationInSec = createNumber("durationInSec", Long.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Integer> roleCnt = createNumber("roleCnt", Integer.class);

    public final StringPath title = createString("title");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public final StringPath videoUrl = createString("videoUrl");

    public QScript(String variable) {
        super(Script.class, forVariable(variable));
    }

    public QScript(Path<? extends Script> path) {
        super(path.getType(), path.getMetadata());
    }

    public QScript(PathMetadata metadata) {
        super(Script.class, metadata);
    }

}

