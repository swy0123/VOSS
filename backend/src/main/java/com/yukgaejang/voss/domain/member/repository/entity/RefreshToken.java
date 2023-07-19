package com.yukgaejang.voss.domain.member.repository.entity;

import com.yukgaejang.voss.global.dto.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RefreshToken extends BaseEntity {
    @Id
    @Column(length = 180)
    String refreshToken;

    String email;
}
