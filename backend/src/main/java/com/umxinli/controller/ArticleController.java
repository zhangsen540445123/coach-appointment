package com.umxinli.controller;

import com.umxinli.dto.ApiResponse;
import com.umxinli.entity.Article;
import com.umxinli.service.ArticleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/article")
@CrossOrigin
public class ArticleController {

    private static final Logger log = LoggerFactory.getLogger(ArticleController.class);

    @Autowired
    private ArticleService articleService;

    /**
     * 获取普通文章列表
     */
    @GetMapping("/getNormalList")
    public ApiResponse<List<Article>> getNormalList() {
        log.info("Get normal article list request");
        try {
            List<Article> articles = articleService.getAllArticles();
            return ApiResponse.success(articles);
        } catch (Exception e) {
            log.error("Error getting article list", e);
            return ApiResponse.error("Failed to get article list");
        }
    }
}

