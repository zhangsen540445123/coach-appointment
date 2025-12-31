package com.umxinli.mapper;

import com.umxinli.entity.GrowthMember;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface GrowthMemberMapper {

    @Select("SELECT * FROM growth_member WHERE id = #{id}")
    GrowthMember selectById(@Param("id") Long id);

    @Select("SELECT * FROM growth_member WHERE latest_phone = #{phone}")
    GrowthMember selectByLatestPhone(@Param("phone") String phone);

    @Select("SELECT * FROM growth_member WHERE phone_number = #{phoneNumber}")
    GrowthMember selectByPhoneNumber(@Param("phoneNumber") String phoneNumber);

    @Select("SELECT COUNT(*) FROM growth_member")
    long selectCount();

    List<GrowthMember> selectPageWithFilter(@Param("xiaoeNickname") String xiaoeNickname,
                                             @Param("latestPhone") String latestPhone,
                                             @Param("status") String status,
                                             @Param("joinType") String joinType,
                                             @Param("xiaoeUserId") String xiaoeUserId,
                                             @Param("offset") int offset,
                                             @Param("size") int size);

    long selectCountWithFilter(@Param("xiaoeNickname") String xiaoeNickname,
                                @Param("latestPhone") String latestPhone,
                                @Param("status") String status,
                                @Param("joinType") String joinType,
                                @Param("xiaoeUserId") String xiaoeUserId);

    List<GrowthMember> selectAllWithFilter(@Param("xiaoeNickname") String xiaoeNickname,
                                            @Param("latestPhone") String latestPhone,
                                            @Param("status") String status,
                                            @Param("joinType") String joinType,
                                            @Param("xiaoeUserId") String xiaoeUserId);

    @Insert("INSERT INTO growth_member (xiaoe_nickname, latest_phone, course_completion_count, join_date, expire_date, " +
            "join_type, status, xiaoe_user_id, xiaoe_tags, last_sync_time, real_name, birthday, gender, city, " +
            "phone_number, email, source_channel, age, address, wechat_name, wechat_id, create_time, update_time) " +
            "VALUES (#{xiaoeNickname}, #{latestPhone}, #{courseCompletionCount}, #{joinDate}, #{expireDate}, " +
            "#{joinType}, #{status}, #{xiaoeUserId}, #{xiaoeTags}, #{lastSyncTime}, #{realName}, #{birthday}, #{gender}, #{city}, " +
            "#{phoneNumber}, #{email}, #{sourceChannel}, #{age}, #{address}, #{wechatName}, #{wechatId}, NOW(), NOW())")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insert(GrowthMember growthMember);

    int updateById(GrowthMember growthMember);

    @Delete("DELETE FROM growth_member WHERE id = #{id}")
    int deleteById(@Param("id") Long id);

    int deleteByIds(@Param("ids") List<Long> ids);

    @Select("SELECT DISTINCT status FROM growth_member WHERE status IS NOT NULL AND status != ''")
    List<String> selectDistinctStatus();

    @Select("SELECT DISTINCT join_type FROM growth_member WHERE join_type IS NOT NULL AND join_type != ''")
    List<String> selectDistinctJoinType();
}

