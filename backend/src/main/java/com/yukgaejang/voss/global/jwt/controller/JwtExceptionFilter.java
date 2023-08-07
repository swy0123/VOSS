package com.yukgaejang.voss.global.jwt.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.yukgaejang.voss.domain.member.exception.WrongPasswordException;
import com.yukgaejang.voss.global.jwt.exception.TokenNotValidateException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
@RequiredArgsConstructor
public class JwtExceptionFilter extends OncePerRequestFilter {
    private final ObjectMapper objectMapper;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws TokenNotValidateException, ServletException, IOException {
        response.setCharacterEncoding("utf-8");
        try {
            filterChain.doFilter(request, response);

        } catch (TokenNotValidateException e){
            request.setAttribute("exception", "유효하지 않은 토큰");

        } catch (IOException | ServletException e) {
            request.setAttribute("exception", "잘못된 요청");

        }

        if (!response.isCommitted()) {
            filterChain.doFilter(request, response);
        }

    }
}
