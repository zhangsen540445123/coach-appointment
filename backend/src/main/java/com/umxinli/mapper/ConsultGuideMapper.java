package com.umxinli.mapper;

import com.umxinli.entity.ConsultGuide;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;

@Mapper
public interface ConsultGuideMapper {
    ConsultGuide selectById(Long id);

    List<ConsultGuide> selectAll();

    List<ConsultGuide> selectByStatus(Integer status);

    List<ConsultGuide> selectByCategory(Integer category);

    List<ConsultGuide> selectByCategoryAndStatus(@Param("category") Integer category, @Param("status") Integer status);

    int insert(ConsultGuide consultGuide);

    int update(ConsultGuide consultGuide);

    int delete(Long id);
}
