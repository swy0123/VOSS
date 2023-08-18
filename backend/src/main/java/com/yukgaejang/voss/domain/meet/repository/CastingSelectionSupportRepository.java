package com.yukgaejang.voss.domain.meet.repository;

import com.yukgaejang.voss.domain.practice.repository.entity.Casting;

public interface CastingSelectionSupportRepository {

    void selectCasting(Long memberId, Casting casting);

    void deleteByMemberId(Long memberId);
}
