package com.umxinli.mapper;

import com.umxinli.entity.UserFeedback;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UserFeedbackMapper {
    
    int insert(UserFeedback feedback);
    
    int updateStatus(@Param("id") Long id, @Param("status") Integer status, @Param("reply") String reply);
    
    UserFeedback selectById(@Param("id") Long id);
    
    List<UserFeedback> selectAll(@Param("status") Integer status);
    
    int deleteById(@Param("id") Long id);
}

