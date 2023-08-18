package com.yukgaejang.voss.domain.member.repository.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {
    GUEST("ROLE_GUEST"), MEMBER("ROLE_MEMBER"), ADMIN("ROLE_ADMIN");

    private final String key;
}