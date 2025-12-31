package com.umxinli.mapper;

import com.umxinli.entity.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

/**
 * 用户数据访问接口
 */
@Mapper
public interface UserMapper {

    /**
     * 根据ID查询用户
     */
    @Select("SELECT * FROM user WHERE id = #{id}")
    User selectById(Long id);

    /**
     * 根据openid查询用户
     */
    @Select("SELECT * FROM user WHERE openid = #{openid}")
    User selectByOpenid(String openid);

    /**
     * 根据openid查询用户（别名方法，与 selectByOpenid 相同）
     */
    @Select("SELECT * FROM user WHERE openid = #{openid}")
    User findByOpenid(String openid);

    /**
     * 根据手机号查询用户
     */
    @Select("SELECT * FROM user WHERE phone = #{phone}")
    User selectByPhone(String phone);

    /**
     * 查询所有用户
     */
    @Select("SELECT * FROM user ORDER BY id DESC")
    List<User> selectAll();

    /**
     * 分页查询用户
     */
    @Select("<script>" +
            "SELECT * FROM user" +
            "<where>" +
            "<if test='keyword != null and keyword != \"\"'>" +
            " AND (name LIKE CONCAT('%', #{keyword}, '%') OR phone LIKE CONCAT('%', #{keyword}, '%'))" +
            "</if>" +
            "</where>" +
            " ORDER BY id DESC LIMIT #{offset}, #{limit}" +
            "</script>")
    List<User> selectList(@Param("offset") int offset, @Param("limit") int limit, @Param("keyword") String keyword);

    /**
     * 统计用户数量
     */
    @Select("<script>" +
            "SELECT COUNT(*) FROM user" +
            "<where>" +
            "<if test='keyword != null and keyword != \"\"'>" +
            " AND (name LIKE CONCAT('%', #{keyword}, '%') OR phone LIKE CONCAT('%', #{keyword}, '%'))" +
            "</if>" +
            "</where>" +
            "</script>")
    int count(@Param("keyword") String keyword);

    /**
     * 插入用户（id 由数据库自增生成）
     */
    @Insert("INSERT INTO user (phone, name, avatar, gender, city, province, openid, status, last_login_time, created_at, updated_at) " +
            "VALUES (#{phone}, #{name}, #{avatar}, #{gender}, #{city}, #{province}, #{openid}, COALESCE(#{status}, 1), NOW(), NOW(), NOW())")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insert(User user);

    /**
     * 更新用户
     */
    @Update("UPDATE user SET phone = #{phone}, name = #{name}, avatar = #{avatar}, gender = #{gender}, " +
            "city = #{city}, province = #{province}, updated_at = NOW() WHERE id = #{id}")
    int update(User user);

    /**
     * 根据ID更新用户（别名方法，与 update 相同）
     */
    @Update("UPDATE user SET phone = #{phone}, name = #{name}, avatar = #{avatar}, gender = #{gender}, " +
            "city = #{city}, province = #{province}, growth_member_tag = #{growthMemberTag}, updated_at = NOW() WHERE id = #{id}")
    int updateById(User user);

    /**
     * 更新用户的成长会会员标签
     */
    @Update("UPDATE user SET growth_member_tag = #{growthMemberTag}, updated_at = NOW() WHERE id = #{id}")
    int updateGrowthMemberTag(@Param("id") Long id, @Param("growthMemberTag") String growthMemberTag);

    /**
     * 删除用户
     */
    @Delete("DELETE FROM user WHERE id = #{id}")
    int delete(Long id);

    /**
     * 更新最后登录时间和IP
     */
    @Update("UPDATE user SET last_login_time = NOW(), last_login_ip = #{lastLoginIp}, updated_at = NOW() WHERE id = #{id}")
    int updateLastLogin(@Param("id") Long id, @Param("lastLoginIp") String lastLoginIp);

    /**
     * 切换用户状态
     */
    @Update("UPDATE user SET status = #{status}, updated_at = NOW() WHERE id = #{id}")
    int updateStatus(@Param("id") Long id, @Param("status") Integer status);
}

