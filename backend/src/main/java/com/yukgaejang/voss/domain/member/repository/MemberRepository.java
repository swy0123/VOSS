package com.yukgaejang.voss.domain.member.repository;

import com.yukgaejang.voss.domain.member.repository.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long>, MemberSupportRepository{
    Optional<Member> findByEmail(String email);
    Optional<Member> findByNickname(String nickname);
}
