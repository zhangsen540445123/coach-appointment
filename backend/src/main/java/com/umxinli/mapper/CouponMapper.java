package com.umxinli.mapper;

import com.umxinli.entity.Coupon;
import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Map;

@Mapper
public interface CouponMapper {

    @Select("SELECT * FROM coupon WHERE id = #{id}")
    Coupon selectById(@Param("id") Long id);

    @Insert("INSERT INTO coupon (name, type, discount_amount, min_amount, coach_scope, coach_ids, start_time, end_time, status, created_at) " +
            "VALUES (#{name}, #{type}, #{discountAmount}, #{minAmount}, #{coachScope}, #{coachIds,typeHandler=org.apache.ibatis.type.StringTypeHandler}, #{startTime}, #{endTime}, #{status}, NOW())")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insert(Coupon coupon);

    @Update("UPDATE coupon SET name=#{name}, type=#{type}, discount_amount=#{discountAmount}, min_amount=#{minAmount}, " +
            "coach_scope=#{coachScope}, coach_ids=#{coachIds,typeHandler=org.apache.ibatis.type.StringTypeHandler}, start_time=#{startTime}, end_time=#{endTime}, status=#{status}, updated_at=NOW() WHERE id=#{id}")
    int updateById(Coupon coupon);

    @Delete("DELETE FROM coupon WHERE id = #{id}")
    int deleteById(@Param("id") Long id);

    List<Map<String, Object>> selectCouponList(@Param("keyword") String keyword,
                                                @Param("type") Integer type,
                                                @Param("status") Integer status,
                                                @Param("offset") int offset,
                                                @Param("limit") int limit);

    int countCouponList(@Param("keyword") String keyword,
                        @Param("type") Integer type,
                        @Param("status") Integer status);

    @Select("SELECT * FROM coupon WHERE status = 1 AND (end_time IS NULL OR end_time > NOW())")
    List<Coupon> selectActiveCoupons();
}

