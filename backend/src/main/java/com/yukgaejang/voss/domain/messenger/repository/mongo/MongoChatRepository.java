package com.yukgaejang.voss.domain.messenger.repository.mongo;

import com.yukgaejang.voss.domain.messenger.repository.entity.MongoChat;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MongoChatRepository extends MongoRepository<MongoChat, Long> {

    Page<MongoChat> findByChatId(Long chadId, Pageable pageable);
}
