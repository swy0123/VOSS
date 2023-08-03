package com.yukgaejang.voss.domain.freeboard.repository.entity;

import com.yukgaejang.voss.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PostFile extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Post post;

    private String originalFileName;
    private String savedFileName;
    private String contentType;
    private Long size;

    private int isDeleted;

    @Nullable
    private LocalDateTime deletedAt;

    public void delete() {
        this.isDeleted = 1;
        this.deletedAt = LocalDateTime.now();
    }

    @Builder
    public PostFile(Post post, String originalFileName, String savedFileName, String contentType, Long size) {
        this.post = post;
        this.originalFileName = originalFileName;
        this.savedFileName = savedFileName;
        this.contentType = contentType;
        this.size = size;
        this.isDeleted = 0;
    }
}
