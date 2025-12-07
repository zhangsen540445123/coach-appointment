package com.umxinli.controller;

import com.umxinli.dto.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserEventController {

    private static final Logger log = LoggerFactory.getLogger(UserEventController.class);

    /**
     * 记录用户事件日志
     */
    @PostMapping("/event/log")
    public ApiResponse<Object> logEvent(@RequestBody(required = false) Map<String, Object> eventData) {
        log.info("User event log: {}", eventData);
        // 简单返回成功，实际生产环境可以将事件存入数据库
        return ApiResponse.success(null);
    }
}

