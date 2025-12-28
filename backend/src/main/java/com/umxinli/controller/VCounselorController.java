package com.umxinli.controller;

import com.umxinli.dto.ApiResponse;
import com.umxinli.entity.Counselor;
import com.umxinli.entity.CounselorCalendar;
import com.umxinli.mapper.CounselorCalendarMapper;
import com.umxinli.mapper.UserStarMapper;
import com.umxinli.service.CounselorService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import com.umxinli.util.JwtUtil;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("/vCounselor")
@CrossOrigin
public class VCounselorController {

    private static final Logger log = LoggerFactory.getLogger(VCounselorController.class);

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CounselorService counselorService;

    @Autowired
    private CounselorCalendarMapper counselorCalendarMapper;

    @Autowired
    private UserStarMapper userStarMapper;

    @Value("${app.base-url:}")
    private String appBaseUrl;

    /**
     * Get the list of starred counselors for a user.
     * @return A list of starred counselors.
     */
    @PostMapping("/getStarList")
    public ApiResponse getStarList(@RequestBody Map<String, Object> payload,
                                   @RequestHeader(value = "Authorization", required = false) String token) {
        log.info("Get star list request: {}", payload);
        try {
            Long userId = getUserIdFromToken(token);
            if (userId == null && payload.containsKey("userId") && payload.get("userId") != null) {
                userId = Long.valueOf(payload.get("userId").toString());
            }
            if (userId == null) {
                Map<String, Object> result = new HashMap<>();
                result.put("list", Collections.emptyList());
                return ApiResponse.success(result);
            }
            List<Map<String, Object>> list = userStarMapper.selectByUserId(userId);
            Map<String, Object> result = new HashMap<>();
            result.put("list", list);
            return ApiResponse.success(result);
        } catch (Exception e) {
            log.error("Error getting star list", e);
            return ApiResponse.error("Failed to get star list");
        }
    }

    /**
     * 获取咨询师详情 - 支持POST请求（小程序使用）
     */
    @PostMapping("/getInfo")
    public ApiResponse getInfoPost(@RequestBody Map<String, Object> payload) {
        Object counselorIdObj = payload.get("counselorId");
        Long counselorId = null;
        if (counselorIdObj instanceof Number) {
            counselorId = ((Number) counselorIdObj).longValue();
        } else if (counselorIdObj instanceof String) {
            counselorId = Long.parseLong((String) counselorIdObj);
        }
        return getInfoInternal(counselorId);
    }

    /**
     * 获取咨询师详情 - 支持GET请求
     */
    @GetMapping("/getInfo")
    public ApiResponse getInfo(@RequestParam Long counselorId) {
        return getInfoInternal(counselorId);
    }

    private ApiResponse getInfoInternal(Long counselorId) {
        log.info("Get counselor info request, counselorId: {}", counselorId);
        try {
            if (counselorId == null) {
                return ApiResponse.error("counselorId is required");
            }
            Counselor counselor = counselorService.getCounselorById(counselorId);
            if (counselor != null) {
                // 构建详情页需要的完整数据结构
                Map<String, Object> result = buildCounselorDetailResponse(counselor);
                return ApiResponse.success(result);
            } else {
                return ApiResponse.error("Counselor not found");
            }
        } catch (Exception e) {
            log.error("Error getting counselor info", e);
            return ApiResponse.error("Failed to get counselor info");
        }
    }

    /**
     * 构建详情页完整数据结构（完全匹配原接口格式）
     */
    private Map<String, Object> buildCounselorDetailResponse(Counselor counselor) {
        Map<String, Object> result = new LinkedHashMap<>();

        // 基本信息
        result.put("counselorId", String.valueOf(counselor.getId())); // 返回字符串避免JS精度丢失
        result.put("name", counselor.getName());
        result.put("headUrl", counselor.getHeadUrl());
        result.put("headUrlSquare", counselor.getHeadUrlSquare());
        result.put("videoUrl", counselor.getVideoUrl());
        result.put("imageUrls", counselor.getImageUrls() != null ? counselor.getImageUrls() : Collections.emptyList());
        result.put("serviceType", counselor.getServiceType());
        result.put("qualifications", counselor.getQualifications() != null ? counselor.getQualifications() : Collections.emptyList());

        // consult 咨询项目列表 - 确保至少有一个默认项，避免前端 consult[0].consultType 报错
        Object consultData = counselor.getConsult();
        if (consultData == null || (consultData instanceof List && ((List<?>) consultData).isEmpty())) {
            // 提供默认的 consult 项，使用教练的 consultPrice 作为默认价格
            Map<String, Object> defaultConsult = new LinkedHashMap<>();
            defaultConsult.put("consultType", 4); // 默认类型
            // 使用教练的 consultPrice 字段，如果也为空则默认为 0
            Object defaultPrice = counselor.getConsultPrice() != null ? counselor.getConsultPrice() : 0;
            defaultConsult.put("consultPrice", defaultPrice);
            result.put("consult", Collections.singletonList(defaultConsult));
        } else {
            result.put("consult", consultData);
        }

        result.put("introduction", counselor.getIntroduction());
        result.put("cityName", counselor.getCityName());

        // directions 擅长方向（复杂结构）- 确保每个项目都有 child 数组
        Object directionsData = counselor.getDirections();
        if (directionsData != null && directionsData instanceof List) {
            List<?> directionsList = (List<?>) directionsData;
            List<Map<String, Object>> processedDirections = new ArrayList<>();
            for (Object item : directionsList) {
                if (item instanceof Map) {
                    @SuppressWarnings("unchecked")
                    Map<String, Object> dirMap = new LinkedHashMap<>((Map<String, Object>) item);
                    // 确保 child 字段存在且不为 null
                    if (!dirMap.containsKey("child") || dirMap.get("child") == null) {
                        dirMap.put("child", Collections.emptyList());
                    }
                    processedDirections.add(dirMap);
                }
            }
            result.put("directions", processedDirections);
        } else {
            result.put("directions", Collections.emptyList());
        }

        // training 培训经历
        result.put("training", counselor.getTraining() != null ? counselor.getTraining() : Collections.emptyList());

        // experience 从业经验
        Map<String, Object> experience = new LinkedHashMap<>();
        if (counselor.getExperienceDate() != null) {
            java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("yyyy-MM-dd");
            experience.put("date", sdf.format(counselor.getExperienceDate()));
        } else {
            experience.put("date", null);
        }
        experience.put("time", counselor.getExperienceTime());
        result.put("experience", experience);

        // special 特别说明
        result.put("special", counselor.getSpecial());

        // school 流派
        result.put("school", counselor.getSchool() != null ? counselor.getSchool() : Collections.emptyList());

        result.put("address", counselor.getAddress());
        result.put("faceMsg", counselor.getFaceMsg());
        result.put("consultMsg", counselor.getConsultMsg());

        result.put("supportOnlineConsult", counselor.getSupportOnlineConsult());
        result.put("supportOfflineConsult", counselor.getSupportOfflineConsult());

        result.put("consultStudioList", Collections.emptyList());
        result.put("articleList", counselor.getArticleList());

        return result;
    }

    /**
     * 获取咨询师日历（可预约时间段）- POST请求
     */
    @PostMapping("/getCalendar")
    public ApiResponse<Map> getCalendarPost(@RequestBody Map<String, Object> payload) {
        Object counselorIdObj = payload.get("counselorId");
        Long counselorId = null;
        if (counselorIdObj instanceof Number) {
            counselorId = ((Number) counselorIdObj).longValue();
        } else if (counselorIdObj instanceof String) {
            counselorId = Long.parseLong((String) counselorIdObj);
        }
        return getCalendarInternal(counselorId);
    }

    /**
     * 获取咨询师日历（可预约时间段）- GET请求
     */
    @GetMapping("/getCalendar")
    public ApiResponse<Map> getCalendar(@RequestParam Long counselorId) {
        return getCalendarInternal(counselorId);
    }

    private ApiResponse<Map> getCalendarInternal(Long counselorId) {
        log.info("Get counselor calendar request, counselorId: {}", counselorId);
        try {
            Map<String, Object> result = new LinkedHashMap<>();
            List<Map<String, Object>> dateList = new ArrayList<>();

            LocalDate today = LocalDate.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

            // 获取未来60天的日期范围
            String startDate = today.format(formatter);
            String endDate = today.plusDays(60).format(formatter);

            // 从数据库获取可预约时间
            List<CounselorCalendar> calendars = counselorCalendarMapper.selectAvailableByCounselorId(
                counselorId, startDate, endDate
            );

            // 按日期分组
            Map<String, List<CounselorCalendar>> groupedByDate = new LinkedHashMap<>();
            for (CounselorCalendar cal : calendars) {
                groupedByDate.computeIfAbsent(cal.getDate(), k -> new ArrayList<>()).add(cal);
            }

            // 生成未来60天的日期列表
            int prevMonth = -1;
            for (int i = 0; i < 60; i++) {
                LocalDate date = today.plusDays(i);
                String dateStr = date.format(formatter);
                Map<String, Object> dateInfo = new LinkedHashMap<>();
                dateInfo.put("date", dateStr);

                // 设置 isToday 标志，用于前端显示"今天"
                if (i == 0) {
                    dateInfo.put("isToday", true);
                }

                // inWeek 只在每个月的第一个日期设置（用于计算日历布局）
                int currentMonth = date.getMonthValue();
                if (currentMonth != prevMonth) {
                    dateInfo.put("inWeek", date.getDayOfWeek().getValue());
                } else {
                    dateInfo.put("inWeek", null);
                }
                prevMonth = currentMonth;

                // 该日期的可预约时间段
                List<Map<String, Object>> timeSlots = new ArrayList<>();
                List<CounselorCalendar> dayCalendars = groupedByDate.get(dateStr);
                if (dayCalendars != null) {
                    for (CounselorCalendar cal : dayCalendars) {
                        Map<String, Object> slot = new LinkedHashMap<>();
                        slot.put("startTime", cal.getStartTime());
                        slot.put("consultWay", cal.getConsultWay());
                        slot.put("consultType", cal.getConsultType());
                        timeSlots.add(slot);
                    }
                }
                dateInfo.put("time", timeSlots);
                dateList.add(dateInfo);
            }

            result.put("list", dateList);
            result.put("canSubmitOrder", 1);
            return ApiResponse.success(result);
        } catch (Exception e) {
            log.error("Error getting counselor calendar", e);
            return ApiResponse.error("Failed to get counselor calendar");
        }
    }

    /**
     * 收藏咨询师
     */
    @PostMapping("/star")
    public ApiResponse star(@RequestBody Map<String, Object> payload,
                           @RequestHeader(value = "Authorization", required = false) String token) {
        log.info("Star counselor request: {}", payload);
        try {
            Long userId = getUserIdFromToken(token);
            if (userId == null) {
                // 尝试从 payload 获取
                if (payload.containsKey("userId") && payload.get("userId") != null) {
                    userId = Long.valueOf(payload.get("userId").toString());
                }
            }
            if (userId == null) {
                return ApiResponse.error("请先登录");
            }
            Long counselorId = Long.valueOf(payload.get("counselorId").toString());
            userStarMapper.insert(userId, counselorId);
            return ApiResponse.success(true);
        } catch (Exception e) {
            log.error("Error starring counselor", e);
            return ApiResponse.error("Failed to star counselor");
        }
    }

    /**
     * 取消收藏
     */
    @PostMapping("/cancelStar")
    public ApiResponse cancelStar(@RequestBody Map<String, Object> payload,
                                  @RequestHeader(value = "Authorization", required = false) String token) {
        log.info("Cancel star counselor request: {}", payload);
        try {
            Long userId = getUserIdFromToken(token);
            if (userId == null) {
                if (payload.containsKey("userId") && payload.get("userId") != null) {
                    userId = Long.valueOf(payload.get("userId").toString());
                }
            }
            if (userId == null) {
                return ApiResponse.error("请先登录");
            }
            Long counselorId = Long.valueOf(payload.get("counselorId").toString());
            userStarMapper.delete(userId, counselorId);
            return ApiResponse.success(true);
        } catch (Exception e) {
            log.error("Error canceling star", e);
            return ApiResponse.error("Failed to cancel star");
        }
    }

    /**
     * 检查是否已收藏
     */
    @PostMapping("/hasStar")
    public ApiResponse hasStar(@RequestBody Map<String, Object> payload,
                               @RequestHeader(value = "Authorization", required = false) String token) {
        log.info("Check star counselor request: {}", payload);
        try {
            Long userId = getUserIdFromToken(token);
            if (userId == null) {
                if (payload.containsKey("userId") && payload.get("userId") != null) {
                    userId = Long.valueOf(payload.get("userId").toString());
                }
            }
            if (userId == null) {
                return ApiResponse.success(false);
            }
            Long counselorId = Long.valueOf(payload.get("counselorId").toString());
            int count = userStarMapper.exists(userId, counselorId);
            return ApiResponse.success(count > 0);
        } catch (Exception e) {
            log.error("Error checking star", e);
            return ApiResponse.success(false);
        }
    }

    /**
     * 从 Authorization token 中获取 userId
     */
    private Long getUserIdFromToken(String token) {
        if (token == null || token.isEmpty()) {
            return null;
        }
        // 去掉 Bearer 前缀
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        String userIdStr = jwtUtil.getUserIdFromToken(token);
        if (userIdStr != null) {
            try {
                return Long.valueOf(userIdStr);
            } catch (NumberFormatException e) {
                log.warn("Invalid userId in token: {}", userIdStr);
            }
        }
        return null;
    }

    private String getWeekdayName(int dayOfWeek) {
        String[] names = {"", "周一", "周二", "周三", "周四", "周五", "周六", "周日"};
        return names[dayOfWeek];
    }
}
