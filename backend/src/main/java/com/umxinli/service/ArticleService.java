package com.umxinli.service;

import com.umxinli.entity.Article;
import com.umxinli.mapper.ArticleMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArticleService {
    
    @Autowired
    private ArticleMapper articleMapper;
    
    public List getAllArticles() {
        return articleMapper.findAll();
    }
    
    public List getTopArticles(int limit) {
        return articleMapper.findTopN(limit);
    }
}

