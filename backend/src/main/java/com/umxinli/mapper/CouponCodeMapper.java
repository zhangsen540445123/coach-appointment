package com.umxinli.mapper;

import com.umxinli.entity.CouponCode;
import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Map;

@Mapper
public interface CouponCodeMapper {

    @Select("SELECT * FROM coupon_code WHERE id = #{id}")
    CouponCode selectById(@Param("id") Long id);

    @Insert("INSERT INTO coupon_code (code, coupon_id, total_count, used_count, status, created_at) " +
            "VALUES (#{code}, #{couponId}, #{totalCount}, #{usedCount}, #{status}, NOW())")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insert(CouponCode couponCode);

    @Update("UPDATE coupon_code SET code=#{code}, coupon_id=#{couponId}, total_count=#{totalCount}, " +
            "used_count=#{usedCount}, status=#{status}, updated_at=NOW() WHERE id=#{id}")
    int updateById(CouponCode couponCode);

    @Delete("DELETE FROM coupon_code WHERE id = #{id}")
    int deleteById(@Param("id") Long id);

    List<Map<String, Object>> selectCouponCodeList(@Param("couponId") Long couponId,
                                                    @Param("keyword") String keyword,
                                                    @Param("offset") int offset,
                                                    @Param("limit") int limit);

    int countCouponCodeList(@Param("couponId") Long couponId, @Param("keyword") String keyword);

    @Update("UPDATE coupon_code SET used_count = used_count + 1 WHERE id = #{id} AND used_count < total_count")
    int incrementUsedCount(@Param("id") Long id);

    CouponCode selectByCode(@Param("code") String code);
}

