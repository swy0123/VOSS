package com.yukgaejang.voss.domain.member.repository;

import com.yukgaejang.voss.domain.member.repository.entity.Follow;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FollowRepository extends JpaRepository<Follow, Long>, FollowSupportRepository {

    @Query("SELECT COUNT(f) FROM Follow f WHERE f.following.id = :memberId")
    int getFollowerCount(Long memberId);

    @Query("SELECT COUNT(f) FROM Follow f WHERE f.follower.id = :memberId")
    int getFollowingCount(Long memberId);

    @Query("SELECT CASE WHEN COUNT(f) > 0 THEN true ELSE false END FROM Follow f WHERE f.follower.id = :myId AND f.following.id = :memberId")
    boolean amFollowing(Long memberId, Long myId);

    @Modifying
    @Query("DELETE FROM Follow f WHERE f.follower.id = :followerId AND f.following.id = :followingId")
    void unfollow(Long followingId, Long followerId);
}
