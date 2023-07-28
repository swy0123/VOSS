package com.yukgaejang.voss.domain.messenger.repository.entity;

import com.yukgaejang.voss.domain.member.repository.entity.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class attend {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    private Chat chat;

    public attend(Member member, Chat chat) {
        this.member = member;
        this.chat = chat;
    }
}
