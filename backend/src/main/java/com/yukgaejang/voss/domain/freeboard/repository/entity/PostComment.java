package com.yukgaejang.voss.domain.freeboard.repository.entity;

import com.yukgaejang.voss.domain.member.repository.entity.Member;
import com.yukgaejang.voss.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PostComment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    @ManyToOne
    private Post post;

    @ManyToOne
    private Member member;

    private int isDeleted;
    private LocalDateTime deletedAt;

    public void update(String content) {
        this.content = content;
    }

    public void delete() {
        this.isDeleted = 1;
        this.deletedAt = LocalDateTime.now();
    }

    @Builder
    public PostComment(String content, Post post, Member member) {
        this.content = content;
        this.post = post;
        this.member = member;
    }
}
