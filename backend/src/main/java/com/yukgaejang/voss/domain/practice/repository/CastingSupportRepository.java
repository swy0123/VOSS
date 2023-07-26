package com.yukgaejang.voss.domain.practice.repository;

import com.yukgaejang.voss.domain.practice.repository.entity.Casting;

import java.util.List;

public interface CastingSupportRepository {

    List<Casting> findByScriptId(Long scriptId);

    Casting findCasting(Long castingId);
}
