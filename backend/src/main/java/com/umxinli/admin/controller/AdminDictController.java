package com.umxinli.admin.controller;

import com.umxinli.admin.service.DictService;
import com.umxinli.dto.ApiResponse;
import com.umxinli.entity.DictItem;
import com.umxinli.entity.DictType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * 数据字典管理控制器
 */
@RestController
@RequestMapping("/admin/dict")
@CrossOrigin
public class AdminDictController {

    private static final Logger log = LoggerFactory.getLogger(AdminDictController.class);

    @Autowired
    private DictService dictService;

    // ========== 字典类型 ==========

    @GetMapping("/types")
    public ApiResponse<List<DictType>> getAllTypes() {
        log.info("Get all dict types");
        return ApiResponse.success(dictService.getAllTypes());
    }

    @GetMapping("/type/{id}")
    public ApiResponse<Map<String, Object>> getTypeWithItems(@PathVariable Long id) {
        log.info("Get dict type with items: {}", id);
        return ApiResponse.success(dictService.getTypeWithItems(id));
    }

    @PostMapping("/type")
    public ApiResponse<DictType> createType(@RequestBody DictType dictType) {
        log.info("Create dict type: {}", dictType.getCode());
        try {
            DictType existing = dictService.getTypeByCode(dictType.getCode());
            if (existing != null) {
                return ApiResponse.error("字典类型编码已存在");
            }
            DictType created = dictService.createType(dictType);
            return ApiResponse.success("创建成功", created);
        } catch (Exception e) {
            log.error("Error creating dict type", e);
            return ApiResponse.error("创建失败: " + e.getMessage());
        }
    }

    @PutMapping("/type/{id}")
    public ApiResponse<DictType> updateType(@PathVariable Long id, @RequestBody DictType dictType) {
        log.info("Update dict type: {}", id);
        try {
            dictType.setId(id);
            DictType updated = dictService.updateType(dictType);
            return ApiResponse.success("更新成功", updated);
        } catch (Exception e) {
            log.error("Error updating dict type", e);
            return ApiResponse.error("更新失败: " + e.getMessage());
        }
    }

    @DeleteMapping("/type/{id}")
    public ApiResponse<String> deleteType(@PathVariable Long id) {
        log.info("Delete dict type: {}", id);
        try {
            dictService.deleteType(id);
            return ApiResponse.success("删除成功", null);
        } catch (Exception e) {
            log.error("Error deleting dict type", e);
            return ApiResponse.error("删除失败: " + e.getMessage());
        }
    }

    // ========== 字典项 ==========

    @GetMapping("/items/{typeId}")
    public ApiResponse<List<DictItem>> getItemsByTypeId(@PathVariable Long typeId) {
        log.info("Get dict items by type id: {}", typeId);
        return ApiResponse.success(dictService.getItemsByTypeId(typeId));
    }

    @PostMapping("/item")
    public ApiResponse<DictItem> createItem(@RequestBody DictItem dictItem) {
        log.info("Create dict item for type: {}", dictItem.getTypeId());
        try {
            DictItem created = dictService.createItem(dictItem);
            return ApiResponse.success("创建成功", created);
        } catch (Exception e) {
            log.error("Error creating dict item", e);
            return ApiResponse.error("创建失败: " + e.getMessage());
        }
    }

    @PutMapping("/item/{id}")
    public ApiResponse<DictItem> updateItem(@PathVariable Long id, @RequestBody DictItem dictItem) {
        log.info("Update dict item: {}", id);
        try {
            dictItem.setId(id);
            DictItem updated = dictService.updateItem(dictItem);
            return ApiResponse.success("更新成功", updated);
        } catch (Exception e) {
            log.error("Error updating dict item", e);
            return ApiResponse.error("更新失败: " + e.getMessage());
        }
    }

    @DeleteMapping("/item/{id}")
    public ApiResponse<String> deleteItem(@PathVariable Long id) {
        log.info("Delete dict item: {}", id);
        try {
            dictService.deleteItem(id);
            return ApiResponse.success("删除成功", null);
        } catch (Exception e) {
            log.error("Error deleting dict item", e);
            return ApiResponse.error("删除失败: " + e.getMessage());
        }
    }

    // ========== 前端获取字典数据 ==========

    @GetMapping("/data")
    public ApiResponse<Map<String, List<String>>> getAllDictData() {
        log.info("Get all dict data for frontend");
        return ApiResponse.success(dictService.getAllDictData());
    }

    @GetMapping("/data/{typeCode}")
    public ApiResponse<List<String>> getDictDataByCode(@PathVariable String typeCode) {
        log.info("Get dict data by code: {}", typeCode);
        return ApiResponse.success(dictService.getEnabledLabelsByTypeCode(typeCode));
    }
}

