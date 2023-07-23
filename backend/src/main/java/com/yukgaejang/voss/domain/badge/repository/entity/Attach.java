package com.yukgaejang.voss.domain.badge.repository.entity;

import com.yukgaejang.voss.domain.member.repository.entity.Member;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter
public class Attach {
    @Id
    private Long id;

    @ManyToOne
    private Badge badgeId;

    @ManyToOne
    private Member senderId;

    @ManyToOne
    private Member receiverId;

    private LocalDateTime createdAt;

    public Attach(Badge badgeId, Member senderId, Member receiverId) {
        this.badgeId = badgeId;
        this.senderId = senderId;
        this.receiverId = receiverId;
    }
}
