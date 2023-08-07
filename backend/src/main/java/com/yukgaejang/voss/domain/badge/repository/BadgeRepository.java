package com.yukgaejang.voss.domain.badge.repository;

import com.yukgaejang.voss.domain.badge.repository.entity.Badge;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BadgeRepository extends JpaRepository<Badge, Long>, BadgeSupportRepository {

}
