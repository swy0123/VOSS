package com.yukgaejang.voss.domain.member.repository;

import com.yukgaejang.voss.domain.member.service.dto.response.GetFollowUserResponse;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FollowSupportRepositoryImpl implements FollowSupportRepository {

    @Override
    public List<GetFollowUserResponse> findFollowings(Long targetId, Long myId) {
        return null;
    }

    @Override
    public List<GetFollowUserResponse> findFollowers(Long targetId, Long myId) {
        return null;
    }
}
