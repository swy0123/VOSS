package com.yukgaejang.voss.domain.messenger.repository.entity;

import com.yukgaejang.voss.domain.member.repository.entity.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Attend {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    private Chat chat;


    private LocalDateTime leaveTime;
    private LocalDateTime receiveMessageTime;

    public Attend(Member member, Chat chat) {
        this.member = member;
        this.chat = chat;
        this.leaveTime = LocalDateTime.now();
        this.receiveMessageTime = LocalDateTime.now();
    }
}
