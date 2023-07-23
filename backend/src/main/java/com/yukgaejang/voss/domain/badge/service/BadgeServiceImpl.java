package com.yukgaejang.voss.domain.badge.service;

import com.yukgaejang.voss.domain.badge.repository.AttachRepository;
import com.yukgaejang.voss.domain.badge.repository.BadgeRepository;
import com.yukgaejang.voss.domain.badge.repository.entity.Attach;
import com.yukgaejang.voss.domain.badge.repository.entity.Badge;
import com.yukgaejang.voss.domain.badge.service.dto.request.GiveBadgeRequest;
import com.yukgaejang.voss.domain.member.repository.MemberRepository;
import com.yukgaejang.voss.domain.member.repository.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BadgeServiceImpl implements BadgeService {
    private final AttachRepository attachRepository;
    private final MemberRepository memberRepository;
    private final BadgeRepository badgeRepository;
    @Override
    public void giveBadge(GiveBadgeRequest giveBadgeRequest, String senderName) {
        Badge badge = badgeRepository.findById(giveBadgeRequest.getBadgeId()).get();
        Member receiver = memberRepository.findById(giveBadgeRequest.getReceiverId()).get();
        Member sender = memberRepository.findByEmail(senderName).get();
        attachRepository.save(new Attach(badge, sender, receiver));
    }
}
