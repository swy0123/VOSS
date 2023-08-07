package com.yukgaejang.voss.domain.member.repository.entity;

import com.yukgaejang.voss.global.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash(value = "refresh_token", timeToLive =  60 * 24 * 60)
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RefreshToken {
    @Id
    String refreshToken;

    String email;
}

//@Entity
//@Getter
//@NoArgsConstructor
//@AllArgsConstructor
//public class RefreshToken extends BaseEntity {
//    @Id
//    @Column(length = 180)
//    String refreshToken;
//
//    String email;
//}
