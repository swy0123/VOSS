package com.yukgaejang.voss.domain.member.event;

import com.yukgaejang.voss.domain.member.repository.entity.Member;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;


@Getter
public class MemberJoinEvent extends ApplicationEvent {
    private final Member member;

    public MemberJoinEvent(Member member) {
        super(member);
        this.member = member;
    }

}
