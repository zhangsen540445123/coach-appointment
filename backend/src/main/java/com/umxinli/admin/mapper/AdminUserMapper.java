package com.umxinli.admin.mapper;

import com.umxinli.admin.entity.AdminUser;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface AdminUserMapper {

    AdminUser selectById(@Param("id") Long id);

    AdminUser selectByUsername(@Param("username") String username);

    AdminUser selectByCounselorId(@Param("counselorId") Long counselorId);

    List selectList(@Param("offset") int offset, @Param("limit") int limit,
                              @Param("keyword") String keyword, @Param("role") Integer role);

    int count(@Param("keyword") String keyword, @Param("role") Integer role);

    int insert(AdminUser adminUser);

    int update(AdminUser adminUser);

    int delete(@Param("id") Long id);

    int updateLastLogin(@Param("id") Long id, @Param("lastLoginIp") String lastLoginIp);
}

