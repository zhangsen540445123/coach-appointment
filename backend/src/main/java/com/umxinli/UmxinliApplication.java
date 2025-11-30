package com.umxinli;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableCaching
@EnableScheduling
public class UmxinliApplication {

    public static void main(String[] args) {
        SpringApplication.run(UmxinliApplication.class, args);
    }
}
