package com.yukgaejang.voss.domain.auth.service;

import com.yukgaejang.voss.domain.member.exception.NoMemberException;
import com.yukgaejang.voss.domain.member.exception.WrongPasswordException;
import com.yukgaejang.voss.domain.member.repository.MemberRepository;
import com.yukgaejang.voss.domain.member.repository.RefreshTokenRepository;
import com.yukgaejang.voss.domain.member.repository.entity.RefreshToken;
import com.yukgaejang.voss.global.jwt.service.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

@RequiredArgsConstructor
public class LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final MemberRepository memberRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    @Value("${jwt.access.expiration}")
    private String accessTokenExpiration;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) {
        String email = extractUsername(request, authentication);
        String accessToken = jwtService.createAccessToken(email);
        String refreshToken = jwtService.createRefreshToken();

        jwtService.sendAccessAndRefreshToken(response, accessToken, refreshToken, email);
        if (memberRepository.findByEmail(email).isPresent()) {
            refreshTokenRepository.save(new RefreshToken(refreshToken, email));
        }
        System.out.println("로그인 성공");
    }

    private String extractUsername(HttpServletRequest request, Authentication authentication) {
        UserDetails userDetails = null;
        try {
            userDetails = (UserDetails) authentication.getPrincipal();
        } catch (Exception e) {
            request.setAttribute("exception", "잘못된 로그인 정보입니다");
        }
        return userDetails.getUsername();
    }
}
