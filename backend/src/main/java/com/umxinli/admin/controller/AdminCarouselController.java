package com.umxinli.admin.controller;

import com.umxinli.dto.ApiResponse;
import com.umxinli.entity.Carousel;
import com.umxinli.service.CarouselService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * 管理后台 - 轮播图管理 Controller
 */
@RestController
@RequestMapping("/admin/carousel")
@CrossOrigin
public class AdminCarouselController {

    private static final Logger log = LoggerFactory.getLogger(AdminCarouselController.class);

    @Autowired
    private CarouselService carouselService;

    /**
     * 获取轮播图列表
     * GET /admin/carousel/list
     */
    @GetMapping("/list")
    public ApiResponse<List<Carousel>> getList() {
        log.info("Get carousel list");
        try {
            List<Carousel> list = carouselService.getAllCarousels();
            log.info("Found {} carousels", list.size());
            return ApiResponse.success(list);
        } catch (Exception e) {
            log.error("Error getting carousel list", e);
            return ApiResponse.error("获取轮播图列表失败");
        }
    }

    /**
     * 创建轮播图
     * POST /admin/carousel/create
     */
    @PostMapping("/create")
    public ApiResponse<String> create(@RequestBody Carousel carousel) {
        log.info("Create carousel: {}", carousel.getTitle());
        try {
            carouselService.addCarousel(carousel);
            log.info("Carousel created successfully");
            return ApiResponse.success("创建成功");
        } catch (Exception e) {
            log.error("Error creating carousel", e);
            return ApiResponse.error("创建轮播图失败");
        }
    }

    /**
     * 更新轮播图
     * PUT /admin/carousel/{id}
     */
    @PutMapping("/{id}")
    public ApiResponse<String> update(@PathVariable Long id, @RequestBody Carousel carousel) {
        log.info("Update carousel: {}", id);
        try {
            carousel.setId(id);
            carouselService.updateCarousel(carousel);
            log.info("Carousel updated successfully");
            return ApiResponse.success("更新成功");
        } catch (Exception e) {
            log.error("Error updating carousel", e);
            return ApiResponse.error("更新轮播图失败");
        }
    }

    /**
     * 删除轮播图
     * DELETE /admin/carousel/{id}
     */
    @DeleteMapping("/{id}")
    public ApiResponse<String> delete(@PathVariable Long id) {
        log.info("Delete carousel: {}", id);
        try {
            carouselService.deleteCarousel(id);
            log.info("Carousel deleted successfully");
            return ApiResponse.success("删除成功");
        } catch (Exception e) {
            log.error("Error deleting carousel", e);
            return ApiResponse.error("删除轮播图失败");
        }
    }

    /**
     * 批量更新排序
     * POST /admin/carousel/sort
     */
    @PostMapping("/sort")
    public ApiResponse<String> updateSort(@RequestBody Map<String, Object> payload) {
        log.info("Update carousel sort");
        try {
            List<Map<String, Object>> items = (List<Map<String, Object>>) payload.get("items");
            for (Map<String, Object> item : items) {
                Long id = Long.valueOf(item.get("id").toString());
                Integer sortOrder = Integer.valueOf(item.get("sortOrder").toString());
                Carousel carousel = carouselService.getCarouselById(id);
                if (carousel != null) {
                    carousel.setSortOrder(sortOrder);
                    carouselService.updateCarousel(carousel);
                }
            }
            log.info("Carousel sort updated successfully");
            return ApiResponse.success("排序更新成功");
        } catch (Exception e) {
            log.error("Error updating carousel sort", e);
            return ApiResponse.error("更新排序失败");
        }
    }
}

