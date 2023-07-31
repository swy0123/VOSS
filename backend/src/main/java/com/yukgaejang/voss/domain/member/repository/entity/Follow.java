package com.yukgaejang.voss.domain.member.repository.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Follow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Member followerId;

    @ManyToOne
    private Member followingId;

    public Follow(Member followerId, Member followingId) {
        this.followerId = followerId;
        this.followingId = followingId;
    }
}
