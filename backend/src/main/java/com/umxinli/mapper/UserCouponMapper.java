package com.umxinli.mapper;

import com.umxinli.entity.UserCoupon;
import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Map;

@Mapper
public interface UserCouponMapper {

    @Select("SELECT * FROM user_coupon WHERE id = #{id}")
    UserCoupon selectById(@Param("id") Long id);

    @Insert("INSERT INTO user_coupon (user_id, coupon_id, status, receive_type, created_at) " +
            "VALUES (#{userId}, #{couponId}, #{status}, #{receiveType}, NOW())")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insert(UserCoupon userCoupon);

    @Update("UPDATE user_coupon SET status=#{status}, used_at=#{usedAt}, order_id=#{orderId} WHERE id=#{id}")
    int updateById(UserCoupon userCoupon);

    @Delete("DELETE FROM user_coupon WHERE id = #{id}")
    int deleteById(@Param("id") Long id);

    List<Map<String, Object>> selectUserCouponList(@Param("userId") Long userId,
                                                    @Param("status") Integer status,
                                                    @Param("offset") int offset,
                                                    @Param("limit") int limit);

    /**
     * 查询用户优惠券列表（支持按教练ID过滤）
     * @param userId 用户ID
     * @param status 优惠券状态
     * @param counselorId 教练ID（可选，用于过滤适用于特定教练的优惠券）
     * @param offset 偏移量
     * @param limit 数量限制
     * @return 优惠券列表
     */
    List<Map<String, Object>> selectUserCouponListByCounselor(@Param("userId") Long userId,
                                                               @Param("status") Integer status,
                                                               @Param("counselorId") Long counselorId,
                                                               @Param("offset") int offset,
                                                               @Param("limit") int limit);

    int countUserCouponList(@Param("userId") Long userId, @Param("status") Integer status);

    List<Map<String, Object>> selectCouponDistributionList(@Param("couponId") Long couponId,
                                                           @Param("offset") int offset,
                                                           @Param("limit") int limit);

    int countCouponDistribution(@Param("couponId") Long couponId);

    int batchInsertUserCoupon(@Param("list") List<UserCoupon> list);
}

