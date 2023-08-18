package com.yukgaejang.voss.domain.member.service;

import com.yukgaejang.voss.domain.badge.repository.BadgeRepository;
import com.yukgaejang.voss.domain.badge.service.BadgeService;
import com.yukgaejang.voss.domain.badge.service.dto.response.ViewBadgeResponse;
import com.yukgaejang.voss.domain.member.exception.MemberEmailDuplicateException;
import com.yukgaejang.voss.domain.member.exception.NoMemberException;
import com.yukgaejang.voss.domain.member.exception.WrongPasswordException;
import com.yukgaejang.voss.domain.member.repository.FollowRepository;
import com.yukgaejang.voss.domain.member.repository.MemberRepository;
import com.yukgaejang.voss.domain.member.repository.entity.Follow;
import com.yukgaejang.voss.domain.member.repository.entity.Member;
import com.yukgaejang.voss.domain.member.repository.entity.Role;
import com.yukgaejang.voss.domain.member.service.dto.request.*;
import com.yukgaejang.voss.domain.member.service.dto.response.GetFollowMemberResponse;
import com.yukgaejang.voss.domain.member.service.dto.response.GetMemberList;
import com.yukgaejang.voss.domain.member.service.dto.response.MemberDetailResponse;
import com.yukgaejang.voss.domain.member.service.dto.response.MemberInfoResponse;
import com.yukgaejang.voss.domain.messenger.repository.AttendRepository;
import com.yukgaejang.voss.domain.notification.service.NotificationService;
import com.yukgaejang.voss.domain.practice.repository.StatRepository;
import com.yukgaejang.voss.domain.practice.repository.entity.PracticeType;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final NotificationService notificationService;
    private final BadgeService badgeService;
    private final MemberRepository memberRepository;
    private final FollowRepository followRepository;
    private final StatRepository statRepository;
    private final AttendRepository attendRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void join(JoinRequest joinRequest) {
        if (memberRepository.findByEmail(joinRequest.getEmail()).isPresent()) {
            throw new MemberEmailDuplicateException("이미 존재하는 이메일입니다.");
        }

        Member member = Member.builder()
                .email(joinRequest.getEmail())
                .password(joinRequest.getPassword())
                .nickname(joinRequest.getNickname())
                .imageUrl(joinRequest.getImageUrl())
                .role(Role.MEMBER)
                .build();

        member.passwordEncode(passwordEncoder);
        memberRepository.save(member);
    }

    @Override
    public boolean modifyMember(ModifyMemberRequest modifyMemberRequest, String email) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new NoMemberException("존재하지 않는 이메일입니다."));

        Member newMem = Member.builder()
                .id(member.getId())
                .email(member.getEmail())
                .password(member.getPassword())
                .nickname(modifyMemberRequest.getNickname())
                .imageUrl(modifyMemberRequest.getImageUrl())
                .role(member.getRole())
                .build();

        memberRepository.save(newMem);
        return true;
    }

    @Override
    public boolean deleteMember(String email, MemberDeleteRequest memberDeleteRequest) {
        Member member = memberRepository.findByEmailAndIsDeletedFalse(email)
                .orElseThrow(() -> new NoMemberException("존재하지 않는 이메일입니다."));

        if (!passwordEncoder.matches(memberDeleteRequest.getPassword(), member.getPassword())) {
            throw new WrongPasswordException("잘못된 비밀번호입니다");
        }

        memberRepository.markAsDeleted(member.getId());
        followRepository.deleteFollowByMemberId(member.getId());

        badgeService.deleteAttachBySenderIdOrReceiverId(member.getId());
        notificationService.readAll(email);
        attendRepository.deleteAttendByMemberId(member.getId());
        // 게시글 삭제
        // 녹음 게시글 삭제
        // 댓글 삭제

        return false;
    }

    @Override
    public boolean modifyPassword(ModifyPasswordRequest modifyPasswordRequest, String email) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new NoMemberException("존재하지 않는 이메일입니다."));
        
        if (!passwordEncoder.matches(modifyPasswordRequest.getOriginalPassword(), member.getPassword())) {
            throw new WrongPasswordException("잘못된 비밀번호입니다");
        }

        Member newMem = Member.builder()
                .id(member.getId())
                .email(member.getEmail())
                .password(modifyPasswordRequest.getNewPassword())
                .nickname(member.getNickname())
                .imageUrl(member.getImageUrl())
                .role(member.getRole())
                .build();

        newMem.passwordEncode(passwordEncoder);
        memberRepository.save(newMem);
        return true;
    }

    @Override
    public MemberDetailResponse getDetails(String email) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new NoMemberException("존재하지 않는 이메일입니다."));
        return MemberDetailResponse.builder()
                .id(member.getId())
                .nickname(member.getNickname())
                .imageUrl(member.getImageUrl())
                .build();
    }

    public boolean follow(FollowRequest targetEmail, String email) {
        Member follower = memberRepository.findByEmail(email).orElseThrow(() ->
                new NoMemberException("팔로우를 시도하는 멤버가 존재하지 않습니다.")
        );

        Member following = memberRepository.findById(targetEmail.getTargetId()).orElseThrow(() ->
                new NoMemberException("팔로우하려는 대상 멤버가 존재하지 않습니다.")
        );

        if (followRepository.isFollowing(following.getId(), follower.getId())) return false;

        Follow follow = new Follow(follower, following);
        followRepository.save(follow);

        // TODO : event로 처리
        notificationService.notifyFollow(follow);
        return true;
    }

    @Override
    public void unfollow(Long targetId, String email) {
        Member me = memberRepository.findByEmail(email).orElseThrow(() ->
                new NoMemberException("없는 사용자입니다.")
        );

        followRepository.unfollow(targetId, me.getId());
    }

    @Override
    public List<GetFollowMemberResponse> getFollowings(String email) {
        Member me = memberRepository.findByEmail(email).orElseThrow(() ->
                new NoMemberException("없는 사용자입니다.")
        );

        return followRepository.findFollowings(me.getId(), me.getId());
    }

    @Override
    public List<GetFollowMemberResponse> getFollowers(String email) {
        Member me = memberRepository.findByEmail(email).orElseThrow(() ->
                new NoMemberException("없는 사용자입니다.")
        );

        return followRepository.findFollowers(me.getId(), me.getId());
    }

    @Override
    public List<GetFollowMemberResponse> getFollowings(Long memberId, String email) {
        Member me = memberRepository.findByEmail(email).orElseThrow(() ->
                new NoMemberException("없는 사용자입니다.")
        );

        return followRepository.findFollowings(memberId, me.getId());
    }

    @Override
    public List<GetFollowMemberResponse> getFollowers(Long memberId, String email) {
        Member me = memberRepository.findByEmail(email).orElseThrow(() ->
                new NoMemberException("없는 사용자입니다.")
        );

        return followRepository.findFollowers(memberId, me.getId());
    }

    @Override
    public MemberInfoResponse getInfo(String email) {
        Member me = memberRepository.findByEmail(email).orElseThrow(() ->
                new NoMemberException("없는 사용자입니다.")
        );

        List<ViewBadgeResponse> badges = badgeService.getBadges(me);
        int actCnt = statRepository.getCountByMemberAndPracticeType(me, PracticeType.ACT);
        int dubCnt = statRepository.getCountByMemberAndPracticeType(me, PracticeType.DUB);
        int dictionCnt = statRepository.getCountByMemberAndPracticeType(me, PracticeType.DICTION);

        return MemberInfoResponse.builder()
                .id(me.getId())
                .email(me.getEmail())
                .nickname(me.getNickname())
                .imageUrl(me.getImageUrl())
                .isFollowing(false)
                .followerCnt(followRepository.getFollowerCount(me.getId()))
                .followingCnt(followRepository.getFollowingCount(me.getId()))
                .badges(badges)
                .actCnt(actCnt)
                .dubCnt(dubCnt)
                .dictionCnt(dictionCnt)
                .totalCnt(actCnt + dubCnt + dictionCnt)
                .build();
    }

    @Override
    public MemberInfoResponse getInfo(Long memberId, String email) {
        Member member = memberRepository.findById(memberId).orElseThrow(() ->
                new NoMemberException("없는 사용자입니다.")
        );

        Member me = memberRepository.findByEmail(email).orElseThrow(() ->
                new NoMemberException("없는 사용자입니다.")
        );

        List<ViewBadgeResponse> badges = badgeService.getBadges(member);
        int actCnt = statRepository.getCountByMemberAndPracticeType(member, PracticeType.ACT);
        int dubCnt = statRepository.getCountByMemberAndPracticeType(member, PracticeType.DUB);
        int dictionCnt = statRepository.getCountByMemberAndPracticeType(member, PracticeType.DICTION);

        return MemberInfoResponse.builder()
                .id(member.getId())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .imageUrl(member.getImageUrl())
                .isFollowing(followRepository.existsByFollowerIdAndFollowingId(me.getId(), memberId))
                .followerCnt(followRepository.getFollowerCount(memberId))
                .followingCnt(followRepository.getFollowingCount(memberId))
                .badges(badges)
                .actCnt(actCnt)
                .dubCnt(dubCnt)
                .dictionCnt(dictionCnt)
                .totalCnt(actCnt + dubCnt + dictionCnt)
                .build();
    }

    @Override
    public Page<GetMemberList> findMemberListByNickname(GetMemberListRequest getMemberListRequest) {
        String keyword = getMemberListRequest.getKeyword();
        PageRequest pageRequest = PageRequest.of(getMemberListRequest.getPage(), getMemberListRequest.getLimit());
        return memberRepository.findMemberListByNicknameAndIsDeletedFalse(keyword, pageRequest);
    }
}