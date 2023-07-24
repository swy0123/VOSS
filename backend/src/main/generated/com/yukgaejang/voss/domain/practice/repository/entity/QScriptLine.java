package com.yukgaejang.voss.domain.practice.repository.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QScriptLine is a Querydsl query type for ScriptLine
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QScriptLine extends EntityPathBase<ScriptLine> {

    private static final long serialVersionUID = 1960276623L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QScriptLine scriptLine = new QScriptLine("scriptLine");

    public final StringPath content = createString("content");

    public final NumberPath<Integer> endSec = createNumber("endSec", Integer.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath name = createString("name");

    public final QScript script;

    public final NumberPath<Integer> startSec = createNumber("startSec", Integer.class);

    public QScriptLine(String variable) {
        this(ScriptLine.class, forVariable(variable), INITS);
    }

    public QScriptLine(Path<? extends ScriptLine> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QScriptLine(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QScriptLine(PathMetadata metadata, PathInits inits) {
        this(ScriptLine.class, metadata, inits);
    }

    public QScriptLine(Class<? extends ScriptLine> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.script = inits.isInitialized("script") ? new QScript(forProperty("script")) : null;
    }

}

