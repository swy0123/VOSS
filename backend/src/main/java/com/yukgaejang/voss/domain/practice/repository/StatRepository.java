package com.yukgaejang.voss.domain.practice.repository;

import com.yukgaejang.voss.domain.member.repository.entity.Member;
import com.yukgaejang.voss.domain.practice.repository.entity.PracticeType;
import com.yukgaejang.voss.domain.practice.repository.entity.Stat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StatRepository extends JpaRepository<Stat, Long> {
    @Query("SELECT COUNT(s) FROM Stat s WHERE s.member = :member AND s.practiceType = :practiceType")
    int getCountByMemberAndPracticeType(@Param("member") Member member, @Param("practiceType") PracticeType practiceType);

}