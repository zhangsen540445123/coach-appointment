package com.umxinli.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface UserStarMapper {

    int insert(@Param("userId") Long userId, @Param("counselorId") Long counselorId);

    int delete(@Param("userId") Long userId, @Param("counselorId") Long counselorId);

    int exists(@Param("userId") Long userId, @Param("counselorId") Long counselorId);

    List<Map<String, Object>> selectByUserId(@Param("userId") Long userId);

    /**
     * 获取教练收藏统计列表
     */
    List<Map<String, Object>> selectCounselorStarStats(@Param("keyword") String keyword,
                                                        @Param("offset") int offset,
                                                        @Param("limit") int limit);

    /**
     * 获取教练收藏统计总数
     */
    int countCounselorStarStats(@Param("keyword") String keyword);

    /**
     * 获取某教练的收藏用户列表
     */
    List<Map<String, Object>> selectStarUsersByCounselorId(@Param("counselorId") Long counselorId,
                                                           @Param("offset") int offset,
                                                           @Param("limit") int limit);

    /**
     * 获取某教练的收藏用户总数
     */
    int countStarUsersByCounselorId(@Param("counselorId") Long counselorId);
}

