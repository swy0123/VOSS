package com.yukgaejang.voss.domain.member.event;

import com.yukgaejang.voss.domain.member.repository.entity.Follow;
import jdk.jfr.Event;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class FollowEvent extends ApplicationEvent {
    private final Follow follow;

    public FollowEvent(Follow follow) {
        super(follow);
        this.follow = follow;
    }
}
