package com.yukgaejang.voss.domain.meet.repository.entity;

import com.yukgaejang.voss.domain.grouppractice.repository.entity.Casting;
import com.yukgaejang.voss.domain.member.repository.entity.Member;
import com.yukgaejang.voss.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MeetJoin extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "meet_id")
    private Meet meet;

    @Nullable
    @OneToOne(fetch = FetchType.LAZY)
    private Casting casting;

    public MeetJoin(Member member, Meet meet) {
        this.member = member;
        this.meet = meet;
    }

    public MeetJoin(Member member, Meet meet, Casting casting) {
        this.member = member;
        this.meet = meet;
        this.casting = casting;
    }
}
