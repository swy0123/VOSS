package com.yukgaejang.voss.domain.member.controller;

import com.yukgaejang.voss.domain.member.repository.RefreshTokenRepository;
import com.yukgaejang.voss.domain.member.service.MemberService;
import com.yukgaejang.voss.domain.member.service.dto.request.FollowRequest;
import com.yukgaejang.voss.domain.member.service.dto.request.JoinRequest;
import com.yukgaejang.voss.domain.member.service.dto.response.*;
import com.yukgaejang.voss.domain.practice.serivce.dto.request.GetMemberListRequest;
import com.yukgaejang.voss.global.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {
    private final MemberService memberService;
    private final JwtService jwtService;
    private final RefreshTokenRepository refreshTokenRepository;

    @PostMapping
    public ResponseEntity<JoinResponse> join(@RequestBody JoinRequest joinRequest) {
        memberService.join(joinRequest);
        return ResponseEntity.ok(new JoinResponse(true));
    }

    @GetMapping("/info")
    public ResponseEntity<MemberInfoResponse> myInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        MemberInfoResponse info = memberService.getInfo(authentication.getName());
        return ResponseEntity.ok(info);
    }

    @GetMapping("/info/{memberId}")
    public ResponseEntity<MemberInfoResponse> memberInfo(@PathVariable("memberId") Long memberId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        MemberInfoResponse info = memberService.getInfo(memberId, authentication.getName());
        return ResponseEntity.ok(info);
    }

    @PostMapping("/follow")
    public ResponseEntity<FollowResponse> follow(@RequestBody FollowRequest followRequest/*, @AuthenticationPrincipal Authentication authentication*/) {;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        memberService.follow(followRequest, authentication.getName());
        return ResponseEntity.ok(new FollowResponse(true));
    }

    @DeleteMapping("/unfollow/{memberId}")
    public ResponseEntity<FollowResponse> unfollow(@PathVariable("memberId") Long memberId) {;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        memberService.unfollow(memberId, authentication.getName());
        return ResponseEntity.ok(new FollowResponse(false));
    }

    @GetMapping("/following")
    public ResponseEntity<List<GetFollowMemberResponse>> myFollowings() {;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        List<GetFollowMemberResponse> followings = memberService.getFollowings(authentication.getName());
        return ResponseEntity.ok(followings);
    }

    @GetMapping("/follower")
    public ResponseEntity<List<GetFollowMemberResponse>> myFollowers() {;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        List<GetFollowMemberResponse> followers = memberService.getFollowers(authentication.getName());
        return ResponseEntity.ok(followers);
    }

    @GetMapping("/following/{memberId}")
    public ResponseEntity<List<GetFollowMemberResponse>> userFollowings(@PathVariable("memberId") Long memberId) {;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        List<GetFollowMemberResponse> followings = memberService.getFollowings(memberId, authentication.getName());
        return ResponseEntity.ok(followings);
    }

    @GetMapping("/follower/{memberId}")
    public ResponseEntity<List<GetFollowMemberResponse>> userFollowers(@PathVariable("memberId") Long memberId) {;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        List<GetFollowMemberResponse> followers = memberService.getFollowers(memberId, authentication.getName());
        return ResponseEntity.ok(followers);
    }

    @GetMapping("/find")
    public ResponseEntity<Page<GetMemberList>> getMemberList(GetMemberListRequest getMemberListRequest) {
        return ResponseEntity.ok(memberService.getMemberList(getMemberListRequest));
    }
}