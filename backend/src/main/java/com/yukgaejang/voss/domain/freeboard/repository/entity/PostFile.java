package com.yukgaejang.voss.domain.freeboard.repository.entity;

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
public class PostFile extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Post post;

    private String originalFileName;
    private String savedFileName;
    private String uploadPath;
    private String extension;
    private Long size;

    private int isDeleted;
    private LocalDateTime deletedAt;

    public void delete() {
        this.isDeleted = 1;
        this.deletedAt = LocalDateTime.now();
    }

    @Builder
    public PostFile(Post post, String originalFileName, String savedFileName,Long size) {
        this.post = post;
        this.originalFileName = originalFileName;
        this.savedFileName = savedFileName;
//        this.uploadPath = uploadPath;
//        this.extension = extension;
        this.size = size;
    }
}
