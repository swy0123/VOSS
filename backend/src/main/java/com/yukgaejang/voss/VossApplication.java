package com.yukgaejang.voss;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableJpaAuditing
@EnableMongoRepositories(basePackages = "com.yukgaejang.voss.domain.messenger.repository.mongo")
public class VossApplication {
	public static void main(String[] args) {
		SpringApplication.run(VossApplication.class, args);
	}

}
