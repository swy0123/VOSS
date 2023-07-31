package com.yukgaejang.voss.domain.member.service;

import com.yukgaejang.voss.domain.member.exception.MemberEmailDuplicateException;
import com.yukgaejang.voss.domain.member.exception.NoMemberException;
import com.yukgaejang.voss.domain.member.exception.WrongPasswordException;
import com.yukgaejang.voss.domain.member.repository.FollowRepository;
import com.yukgaejang.voss.domain.member.repository.MemberRepository;
import com.yukgaejang.voss.domain.member.repository.entity.Follow;
import com.yukgaejang.voss.domain.member.repository.entity.Member;
import com.yukgaejang.voss.domain.member.repository.entity.Role;
import com.yukgaejang.voss.domain.member.service.MemberService;
import com.yukgaejang.voss.domain.member.service.dto.request.FollowRequest;
import com.yukgaejang.voss.domain.member.service.dto.request.JoinRequest;
import com.yukgaejang.voss.domain.member.service.dto.request.LoginRequest;
import com.yukgaejang.voss.global.jwt.service.JwtService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final FollowRepository followRepository;
    private final PasswordEncoder passwordEncoder;

    public void join(JoinRequest joinRequest) {
        if (memberRepository.findByEmail(joinRequest.getEmail()).isPresent()) {
            throw new MemberEmailDuplicateException("이미 존재하는 이메일입니다.");
        }

        Member member = Member.builder()
                .email(joinRequest.getEmail())
                .password(joinRequest.getPassword())
                .nickname(joinRequest.getNickname())
                .role(Role.MEMBER)
                .build();

        member.passwordEncode(passwordEncoder);
        memberRepository.save(member);
    }

    @Override
    public void follow(FollowRequest targetEmail, String email) {
        Member follower = memberRepository.findByEmail(email).orElseThrow(() ->
                new NoMemberException("팔로우를 시도하는 멤버가 존재하지 않습니다.")
        );

        Member following = memberRepository.findByEmail(targetEmail.getTargetEmail()).orElseThrow(() ->
                new NoMemberException("팔로우하려는 대상 멤버가 존재하지 않습니다.")
        );

        followRepository.save(new Follow(follower, following));
    }

}
