package com.umxinli.mapper;

import com.umxinli.entity.Carousel;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface CarouselMapper {
    Carousel selectById(Long id);
    
    List<Carousel> selectAll();
    
    List<Carousel> selectByStatus(Integer status);
    
    int insert(Carousel carousel);
    
    int update(Carousel carousel);
    
    int delete(Long id);
}
