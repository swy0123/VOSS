package com.yukgaejang.voss.domain.freeboard.repository.entity;

import com.yukgaejang.voss.domain.member.repository.entity.Member;
import com.yukgaejang.voss.global.entity.BaseEntity;
import jakarta.persistence.*;
<<<<<<< HEAD
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
=======
import lombok.Builder;
import lombok.Getter;
>>>>>>> d02e2a470f6d104435ac50733c1192265ec8254f
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
@Getter
<<<<<<< HEAD
@NoArgsConstructor(access = AccessLevel.PROTECTED)
=======
>>>>>>> d02e2a470f6d104435ac50733c1192265ec8254f
public class Post extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    private String title;
    private String content;
    private Long hit;

<<<<<<< HEAD
=======
    @CreatedDate
    private LocalDateTime createdAt;

>>>>>>> d02e2a470f6d104435ac50733c1192265ec8254f
    private int isDeleted;
    private LocalDateTime deletedAt;

    public void update(String title, String content) {
        this.title = title;
        this.content = content;
    }

    public void delete(int isDeleted) {
        this.isDeleted = isDeleted;
        this.deletedAt = LocalDateTime.now();
    }

<<<<<<< HEAD
=======
    public Post() {}

>>>>>>> d02e2a470f6d104435ac50733c1192265ec8254f
    @Builder
    public Post(String title, String content, Member member) {
        this.title = title;
        this.content = content;
        this.member = member;
        this.hit = 0L;
        this.isDeleted = 0;
    }
}
