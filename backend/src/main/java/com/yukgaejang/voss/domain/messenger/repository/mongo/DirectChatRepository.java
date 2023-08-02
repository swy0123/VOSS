package com.yukgaejang.voss.domain.messenger.repository.mongo;

import com.yukgaejang.voss.domain.messenger.repository.entity.DirectChat;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DirectChatRepository extends MongoRepository<DirectChat, Long> {

    Page<DirectChat> findByChatId(Long chadId, Pageable pageable);
}
