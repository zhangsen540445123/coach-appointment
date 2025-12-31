package com.umxinli.admin.controller;

import com.umxinli.admin.service.GrowthMemberService;
import com.umxinli.common.ApiResponse;
import com.umxinli.entity.GrowthMember;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

/**
 * 管理端成长会员管理控制器
 */
@Slf4j
@RestController
@RequestMapping("/admin/growth-members")
@RequiredArgsConstructor
public class AdminGrowthMemberController {

    private final GrowthMemberService growthMemberService;

    /**
     * 分页查询成长会员列表
     */
    @GetMapping("/page")
    public ApiResponse getGrowthMemberPage(@RequestParam(required = false) String xiaoeNickname,
                                           @RequestParam(required = false) String latestPhone,
                                           @RequestParam(required = false) String status,
                                           @RequestParam(required = false) String joinType,
                                           @RequestParam(required = false) String xiaoeUserId,
                                           @RequestParam(defaultValue = "1") int page,
                                           @RequestParam(defaultValue = "10") int pageSize) {
        try {
            Map<String, Object> result = growthMemberService.getGrowthMemberPage(xiaoeNickname, latestPhone,
                    status, joinType, xiaoeUserId, page, pageSize);
            return ApiResponse.success(result);
        } catch (Exception e) {
            log.error("获取成长会员列表失败", e);
            return ApiResponse.error("获取成长会员列表失败: " + e.getMessage());
        }
    }

    /**
     * 获取成长会员详情
     */
    @GetMapping("/{id}")
    public ApiResponse getGrowthMemberDetail(@PathVariable Long id) {
        try {
            GrowthMember result = growthMemberService.getGrowthMemberDetail(id);
            return result != null ? ApiResponse.success(result) : ApiResponse.error("成长会员不存在");
        } catch (Exception e) {
            log.error("获取成长会员详情失败", e);
            return ApiResponse.error("获取成长会员详情失败: " + e.getMessage());
        }
    }

    /**
     * 创建成长会员
     */
    @PostMapping
    public ApiResponse createGrowthMember(@RequestBody GrowthMember growthMember) {
        try {
            GrowthMember result = growthMemberService.createGrowthMember(growthMember);
            return ApiResponse.success(result);
        } catch (Exception e) {
            log.error("创建成长会员失败", e);
            return ApiResponse.error("创建成长会员失败: " + e.getMessage());
        }
    }

    /**
     * 更新成长会员信息
     */
    @PutMapping("/{id}")
    public ApiResponse updateGrowthMember(@PathVariable Long id, @RequestBody GrowthMember growthMember) {
        try {
            GrowthMember result = growthMemberService.updateGrowthMember(id, growthMember);
            return ApiResponse.success(result);
        } catch (Exception e) {
            log.error("更新成长会员失败", e);
            return ApiResponse.error("更新成长会员失败: " + e.getMessage());
        }
    }

    /**
     * 删除单个成长会员
     */
    @DeleteMapping("/{id}")
    public ApiResponse deleteGrowthMember(@PathVariable Long id) {
        try {
            growthMemberService.deleteGrowthMember(id);
            return ApiResponse.success("删除成功");
        } catch (Exception e) {
            log.error("删除成长会员失败", e);
            return ApiResponse.error("删除成长会员失败: " + e.getMessage());
        }
    }

    /**
     * 批量删除成长会员
     */
    @DeleteMapping("/batch")
    public ApiResponse batchDeleteGrowthMembers(@RequestBody Map<String, List<Long>> request) {
        try {
            List<Long> ids = request.get("ids");
            if (ids == null || ids.isEmpty()) {
                return ApiResponse.error("删除ID列表不能为空");
            }
            growthMemberService.batchDeleteGrowthMembers(ids);
            return ApiResponse.success("批量删除成功");
        } catch (Exception e) {
            log.error("批量删除成长会员失败", e);
            return ApiResponse.error("批量删除成长会员失败: " + e.getMessage());
        }
    }

    /**
     * 导入成长会员数据
     */
    @PostMapping("/import")
    public ApiResponse importGrowthMembers(@RequestParam("file") MultipartFile file,
                                           @RequestParam("tags") String tags) {
        try {
            if (file.isEmpty()) {
                return ApiResponse.error("上传文件不能为空");
            }
            Map<String, Object> result = growthMemberService.importGrowthMembers(file, tags);
            return ApiResponse.success(result);
        } catch (Exception e) {
            log.error("导入成长会员数据失败", e);
            return ApiResponse.error("导入失败: " + e.getMessage());
        }
    }

    /**
     * 导入后同步数据功能
     */
    @PostMapping("/sync")
    public ApiResponse syncAfterImport(@RequestBody(required = false) Map<String, Object> body) {
        try {
            List<String> phones = null;
            if (body != null && body.get("phones") instanceof List<?>) {
                phones = ((List<?>) body.get("phones")).stream()
                        .filter(obj -> obj != null)
                        .map(String::valueOf)
                        .filter(s -> !s.isBlank())
                        .toList();
            }
            Map<String, Object> result = growthMemberService.syncAfterImport(phones);
            return ApiResponse.success(result);
        } catch (Exception e) {
            log.error("同步数据失败", e);
            return ApiResponse.error("同步失败: " + e.getMessage());
        }
    }

    /**
     * 导出成长会员数据
     */
    @GetMapping("/export")
    public void exportGrowthMembers(@RequestParam(required = false) String xiaoeNickname,
                                     @RequestParam(required = false) String latestPhone,
                                     @RequestParam(required = false) String status,
                                     @RequestParam(required = false) String joinType,
                                     @RequestParam(required = false) String xiaoeUserId,
                                     HttpServletResponse response) {
        try {
            growthMemberService.exportGrowthMembers(xiaoeNickname, latestPhone, status, joinType, xiaoeUserId, response);
        } catch (Exception e) {
            log.error("导出成长会员数据失败", e);
            throw new RuntimeException("导出成长会员数据失败: " + e.getMessage());
        }
    }

    /**
     * 下载导入模板（xlsx）
     */
    @GetMapping("/template")
    public void downloadImportTemplate(HttpServletResponse response) {
        try {
            growthMemberService.downloadImportTemplate(response);
        } catch (Exception e) {
            log.error("下载导入模板失败", e);
            throw new RuntimeException("下载导入模板失败: " + e.getMessage());
        }
    }

    /**
     * 获取筛选选项数据
     */
    @GetMapping("/filter-options")
    public ApiResponse getFilterOptions() {
        try {
            Map<String, Object> result = growthMemberService.getFilterOptions();
            return ApiResponse.success(result);
        } catch (Exception e) {
            log.error("获取筛选选项失败", e);
            return ApiResponse.error("获取筛选选项失败: " + e.getMessage());
        }
    }

    /**
     * 获取成长会员统计数据
     */
    @GetMapping("/stats")
    public ApiResponse getGrowthMemberStats() {
        try {
            Map<String, Object> result = growthMemberService.getGrowthMemberStats();
            return ApiResponse.success(result);
        } catch (Exception e) {
            log.error("获取成长会员统计数据失败", e);
            return ApiResponse.error("获取统计数据失败: " + e.getMessage());
        }
    }
}
