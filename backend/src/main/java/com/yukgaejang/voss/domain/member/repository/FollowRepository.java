package com.yukgaejang.voss.domain.member.repository;

import com.yukgaejang.voss.domain.member.repository.entity.Follow;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FollowRepository extends JpaRepository<Follow, Long>, FollowSupportRepository {

    @Query("SELECT COUNT(f) FROM Follow f WHERE f.followingId.id = :memberId")
    int getFollowerCount(Long memberId);

    @Query("SELECT COUNT(f) FROM Follow f WHERE f.followerId.id = :memberId")
    int getFollowingCount(Long memberId);

    @Query("SELECT CASE WHEN COUNT(f) > 0 THEN true ELSE false END FROM Follow f WHERE f.followerId.id = :followerId AND f.followingId.id = :myId")
    boolean isFollowingYou(Long followerId, Long myId);

    @Modifying
    @Query("DELETE FROM Follow f WHERE f.followerId.id = :followerId AND f.followingId.id = :followingId")
    void unfollow(Long followingId, Long followerId);
}
