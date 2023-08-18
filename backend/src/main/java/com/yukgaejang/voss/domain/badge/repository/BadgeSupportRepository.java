package com.yukgaejang.voss.domain.badge.repository;

import com.yukgaejang.voss.domain.badge.service.dto.response.BadgeListResponse;
import com.yukgaejang.voss.domain.badge.service.dto.response.ViewBadgeResponse;
import com.yukgaejang.voss.domain.member.repository.entity.Member;

import java.util.List;

public interface BadgeSupportRepository {
    List<ViewBadgeResponse> findAllBadgeByMember(Member member);
    List<BadgeListResponse> findAllBadge();

    void deleteAttachBySenderIdOrReceiverId(Long memberId);
}
