package com.yukgaejang.voss;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class VossApplication {
	public static void main(String[] args) {
		SpringApplication.run(VossApplication.class, args);
	}

}
