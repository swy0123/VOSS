package com.yukgaejang.voss.domain.messenger.repository.mongo;

import com.yukgaejang.voss.domain.messenger.repository.entity.MongoChat;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MongoChatRepository extends MongoRepository<MongoChat, Long>, MongoChatSupportRepository {
}
