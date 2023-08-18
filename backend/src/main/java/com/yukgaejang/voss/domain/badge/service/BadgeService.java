package com.yukgaejang.voss.domain.badge.service;

import com.yukgaejang.voss.domain.badge.service.dto.request.GiveBadgeRequest;
import com.yukgaejang.voss.domain.badge.service.dto.response.BadgeListResponse;
import com.yukgaejang.voss.domain.badge.service.dto.response.ViewBadgeResponse;
import com.yukgaejang.voss.domain.member.repository.entity.Member;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface BadgeService {
    boolean giveBadge(GiveBadgeRequest giveBadgeRequest, String receiver);

    List<ViewBadgeResponse> getBadges(Member me);

    List<BadgeListResponse> getBadgeList();

    void deleteAttachBySenderIdOrReceiverId(Long memberId);
}
