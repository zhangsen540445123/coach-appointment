package com.umxinli.mapper;

import com.umxinli.dto.CounselorFilterRequest;
import com.umxinli.entity.Counselor;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;

@Mapper
public interface CounselorMapper {
    Counselor selectById(Long id);
    
    List<Counselor> selectAll();
    
    List<Counselor> selectByFilter(@Param("name") String name, @Param("filter") CounselorFilterRequest.FilterCriteria filter, @Param("limit") int limit, @Param("offset") int offset);
    
    Integer countByFilter(@Param("name") String name, @Param("filter") CounselorFilterRequest.FilterCriteria filter);

    List<Counselor> selectFeatured(@Param("limit") int limit);
    
    int insert(Counselor counselor);
    
    int update(Counselor counselor);
    
    int delete(Long id);
}
