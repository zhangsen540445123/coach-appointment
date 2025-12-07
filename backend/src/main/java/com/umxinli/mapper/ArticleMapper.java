package com.umxinli.mapper;

import com.umxinli.entity.Article;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ArticleMapper {
    
    @Select("SELECT id, title, author, digest, url, thumb_url as thumbUrl, update_time as updateTime, created_at as createdAt FROM article ORDER BY update_time DESC")
    List<Article> findAll();
    
    @Select("SELECT id, title, author, digest, url, thumb_url as thumbUrl, update_time as updateTime, created_at as createdAt FROM article ORDER BY update_time DESC LIMIT #{limit}")
    List<Article> findTopN(int limit);
}

