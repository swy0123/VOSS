package com.yukgaejang.voss.domain.member.repository;

import com.yukgaejang.voss.domain.member.repository.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FollowRepository extends JpaRepository<Follow, Long> {

    @Query("SELECT COUNT(f) FROM Follow f WHERE f.followingId.id = :memberId")
    int getFollowerCount(@Param("memberId") Long memberId);

    @Query("SELECT COUNT(f) FROM Follow f WHERE f.followerId.id = :memberId")
    int getFollowingCount(@Param("memberId") Long memberId);

    @Query("SELECT CASE WHEN COUNT(f) > 0 THEN true ELSE false END FROM Follow f WHERE f.followerId.id = :followerId AND f.followingId.id = :yourId")
    boolean isFollowingYou(@Param("followerId") Long followerId, @Param("yourId") Long yourId);
}
