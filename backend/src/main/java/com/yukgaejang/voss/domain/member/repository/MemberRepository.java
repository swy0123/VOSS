package com.yukgaejang.voss.domain.member.repository;

import com.yukgaejang.voss.domain.member.repository.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long>, MemberSupportRepository{
    Optional<Member> findByEmail(String email);

    Optional<Member> findByEmailAndIsDeletedFalse(String email);
    Optional<Member> findByNickname(String nickname);

    boolean existsByEmail(String email);

    @Modifying
    @Query("UPDATE Member m SET m.isDeleted = true WHERE m.id = :memberId")
    int markAsDeleted(@Param("memberId") Long memberId);
}
