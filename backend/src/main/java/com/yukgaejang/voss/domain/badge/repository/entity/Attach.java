package com.yukgaejang.voss.domain.badge.repository.entity;

import com.yukgaejang.voss.domain.badge.service.dto.request.GiveBadgeRequest;
import com.yukgaejang.voss.domain.member.repository.entity.Member;
import com.yukgaejang.voss.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
@Getter
public class Attach extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Badge badgeId;

    @ManyToOne
    private Member senderId;

    @ManyToOne
    private Member receiverId;

    public Attach(Badge badgeId, Member senderId, Member receiverId) {
        this.badgeId = badgeId;
        this.senderId = senderId;
        this.receiverId = receiverId;
    }
}
