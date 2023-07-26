package com.yukgaejang.voss.domain.practice.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.yukgaejang.voss.domain.practice.repository.entity.QScript;
import com.yukgaejang.voss.domain.practice.repository.entity.QScriptLine;
import com.yukgaejang.voss.domain.practice.serivce.dto.response.ScriptListResponse;
import com.yukgaejang.voss.domain.practice.serivce.dto.response.ViewScriptLineResponse;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ScriptSupportRepositoryImpl implements ScriptSupportRepository {
    private final JPAQueryFactory jpaQueryFactory;

    public ScriptSupportRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Override
    public List<ViewScriptLineResponse> getScriptLines(Long scriptId) {
        QScript s = QScript.script;
        QScriptLine sl = QScriptLine.scriptLine;

        return jpaQueryFactory
                .select(Projections.constructor(ViewScriptLineResponse.class,
                        sl.id, sl.name, sl.content, sl.startSec, sl.endSec))
                .from(sl)
                .where(sl.script.id.eq(scriptId))
                .orderBy(sl.id.asc())
                .fetch();
    }

    @Override
    public List<String> getRoleNames(Long scriptId) {
        QScript s = QScript.script;
        QScriptLine sl = QScriptLine.scriptLine;

        return jpaQueryFactory
                .select(sl.name)
                .from(sl)
                .where(sl.script.id.eq(scriptId))
                .orderBy(sl.id.asc())
                .distinct()
                .fetch();
    }

    @Override
    public List<ScriptListResponse> findAllScript() {
        QScript s = QScript.script;
        return jpaQueryFactory
                .select(Projections.constructor(ScriptListResponse.class,
                        s.id, s.category, s.title, s.durationInSec, s.videoUrl, s.roleCnt))
                .from(s)
                .orderBy(s.id.asc())
                .fetch();
    }
}
