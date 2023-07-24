package com.yukgaejang.voss.domain.meet.repository;

import com.yukgaejang.voss.domain.meet.repository.entity.Meet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MeetRepository extends JpaRepository<Meet, Long> ,MeetSupportRepository {

    @Query(value = "select distinct m from Meet m" +
            " join fetch m.meetJoins mj", countQuery = "select count (m) from Meet m")
    Page<Meet> findAllList(Pageable pageable);
}
