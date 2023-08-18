package com.yukgaejang.voss.domain.meet.repository;

import com.yukgaejang.voss.domain.meet.repository.entity.Meet;
import org.springframework.data.jpa.repository.JpaRepository;


public interface MeetRepository extends JpaRepository<Meet, Long> ,MeetSupportRepository {

}
