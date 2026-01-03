package com.umxinli.mapper;

import com.umxinli.entity.ConsultStudio;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface ConsultStudioMapper {
    
    @Select("SELECT * FROM consult_studio WHERE enabled = 1 ORDER BY sort_order ASC, id DESC")
    @Results({
        @Result(property = "studioName", column = "studio_name"),
        @Result(property = "studioType", column = "studio_type"),
        @Result(property = "studioCoverImgList", column = "studio_cover_img_list"),
        @Result(property = "studioOpenTime", column = "studio_open_time"),
        @Result(property = "studioDetail", column = "studio_detail"),
        @Result(property = "summaryAddress", column = "summary_address"),
        @Result(property = "fullAddress", column = "full_address"),
        @Result(property = "locationLongitude", column = "location_longitude"),
        @Result(property = "locationLatitude", column = "location_latitude"),
        @Result(property = "concatPhone", column = "concat_phone"),
        @Result(property = "qrCodeUrl", column = "qr_code_url"),
        @Result(property = "sortOrder", column = "sort_order"),
        @Result(property = "bookingType", column = "booking_type"),
        @Result(property = "maxParticipants", column = "max_participants"),
        @Result(property = "createdAt", column = "created_at"),
        @Result(property = "updatedAt", column = "updated_at")
    })
    List<ConsultStudio> selectAll();

    @Select("SELECT * FROM consult_studio WHERE id = #{id}")
    @Results({
        @Result(property = "studioName", column = "studio_name"),
        @Result(property = "studioType", column = "studio_type"),
        @Result(property = "studioCoverImgList", column = "studio_cover_img_list"),
        @Result(property = "studioOpenTime", column = "studio_open_time"),
        @Result(property = "studioDetail", column = "studio_detail"),
        @Result(property = "summaryAddress", column = "summary_address"),
        @Result(property = "fullAddress", column = "full_address"),
        @Result(property = "locationLongitude", column = "location_longitude"),
        @Result(property = "locationLatitude", column = "location_latitude"),
        @Result(property = "concatPhone", column = "concat_phone"),
        @Result(property = "qrCodeUrl", column = "qr_code_url"),
        @Result(property = "sortOrder", column = "sort_order"),
        @Result(property = "bookingType", column = "booking_type"),
        @Result(property = "maxParticipants", column = "max_participants"),
        @Result(property = "createdAt", column = "created_at"),
        @Result(property = "updatedAt", column = "updated_at")
    })
    ConsultStudio selectById(@Param("id") Long id);

    @Select("SELECT * FROM consult_studio ORDER BY sort_order ASC, id DESC")
    @Results({
        @Result(property = "studioName", column = "studio_name"),
        @Result(property = "studioType", column = "studio_type"),
        @Result(property = "studioCoverImgList", column = "studio_cover_img_list"),
        @Result(property = "studioOpenTime", column = "studio_open_time"),
        @Result(property = "studioDetail", column = "studio_detail"),
        @Result(property = "summaryAddress", column = "summary_address"),
        @Result(property = "fullAddress", column = "full_address"),
        @Result(property = "locationLongitude", column = "location_longitude"),
        @Result(property = "locationLatitude", column = "location_latitude"),
        @Result(property = "concatPhone", column = "concat_phone"),
        @Result(property = "qrCodeUrl", column = "qr_code_url"),
        @Result(property = "sortOrder", column = "sort_order"),
        @Result(property = "bookingType", column = "booking_type"),
        @Result(property = "maxParticipants", column = "max_participants"),
        @Result(property = "createdAt", column = "created_at"),
        @Result(property = "updatedAt", column = "updated_at")
    })
    List<ConsultStudio> selectAllForAdmin();

    @Insert("INSERT INTO consult_studio (studio_name, studio_type, studio_cover_img_list, studio_open_time, " +
            "studio_detail, summary_address, full_address, location_longitude, location_latitude, " +
            "concat_phone, qr_code_url, sort_order, enabled, price, booking_type, max_participants) VALUES " +
            "(#{studioName}, #{studioType}, #{studioCoverImgList}, #{studioOpenTime}, #{studioDetail}, " +
            "#{summaryAddress}, #{fullAddress}, #{locationLongitude}, #{locationLatitude}, " +
            "#{concatPhone}, #{qrCodeUrl}, #{sortOrder}, #{enabled}, #{price}, #{bookingType}, #{maxParticipants})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insert(ConsultStudio studio);

    @Update("UPDATE consult_studio SET studio_name = #{studioName}, studio_type = #{studioType}, " +
            "studio_cover_img_list = #{studioCoverImgList}, studio_open_time = #{studioOpenTime}, " +
            "studio_detail = #{studioDetail}, summary_address = #{summaryAddress}, full_address = #{fullAddress}, " +
            "location_longitude = #{locationLongitude}, location_latitude = #{locationLatitude}, " +
            "concat_phone = #{concatPhone}, qr_code_url = #{qrCodeUrl}, sort_order = #{sortOrder}, " +
            "enabled = #{enabled}, price = #{price}, booking_type = #{bookingType}, max_participants = #{maxParticipants} WHERE id = #{id}")
    int update(ConsultStudio studio);

    @Delete("DELETE FROM consult_studio WHERE id = #{id}")
    int deleteById(@Param("id") Long id);

    @Update("UPDATE consult_studio SET enabled = #{enabled} WHERE id = #{id}")
    int updateEnabled(@Param("id") Long id, @Param("enabled") Integer enabled);
}

