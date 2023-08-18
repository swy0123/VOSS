package com.yukgaejang.voss.domain.badge.service;

import com.yukgaejang.voss.domain.badge.repository.AttachRepository;
import com.yukgaejang.voss.domain.badge.repository.BadgeRepository;
import com.yukgaejang.voss.domain.badge.repository.entity.Attach;
import com.yukgaejang.voss.domain.badge.repository.entity.Badge;
import com.yukgaejang.voss.domain.badge.service.dto.request.GiveBadgeRequest;
import com.yukgaejang.voss.domain.badge.service.dto.response.BadgeListResponse;
import com.yukgaejang.voss.domain.badge.service.dto.response.ViewBadgeResponse;
import com.yukgaejang.voss.domain.member.repository.MemberRepository;
import com.yukgaejang.voss.domain.member.repository.entity.Member;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BadgeServiceImpl implements BadgeService {
    private final AttachRepository attachRepository;
    private final MemberRepository memberRepository;
    private final BadgeRepository badgeRepository;
    @Override
    public boolean giveBadge(GiveBadgeRequest giveBadgeRequest, String senderName) {
        Badge badge = badgeRepository.findById(giveBadgeRequest.getBadgeId()).get();
        Member receiver = memberRepository.findById(giveBadgeRequest.getReceiverId()).get();
        Member sender = memberRepository.findByEmail(senderName).get();
        if (gaveSameCertainly(sender, receiver, badge)) return false;
        attachRepository.save(new Attach(badge, sender, receiver));
        return true;
    }

    @Override
    public List<ViewBadgeResponse> getBadges(Member me) {
        return badgeRepository.findAllBadgeByMember(me);
    }

    @Override
    public List<BadgeListResponse> getBadgeList() {
        return badgeRepository.findAllBadge();
    }

    @Override
    @Transactional
    public void deleteAttachBySenderIdOrReceiverId(Long memberId) {
        badgeRepository.deleteAttachBySenderIdOrReceiverId(memberId);
    }

    private boolean gaveSameCertainly(Member sender, Member receiver, Badge badge) {
        LocalDateTime twentyFourHoursAgo = LocalDateTime.now().minusHours(24);
        return attachRepository.existsBySenderIdAndReceiverIdAndBadgeIdAndCreatedAtAfter(sender, receiver, badge, twentyFourHoursAgo);
    }
}
