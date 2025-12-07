package com.umxinli.mapper;

import com.umxinli.entity.VisitorInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface VisitorInfoMapper {

    VisitorInfo selectByUserId(@Param("userId") Long userId);

    VisitorInfo selectById(@Param("id") Long id);

    List<VisitorInfo> selectAll(@Param("keyword") String keyword, @Param("offset") int offset, @Param("limit") int limit);

    int countAll(@Param("keyword") String keyword);

    int insert(VisitorInfo visitorInfo);

    int update(VisitorInfo visitorInfo);

    int deleteById(@Param("id") Long id);
}

