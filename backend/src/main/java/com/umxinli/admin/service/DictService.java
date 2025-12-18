package com.umxinli.admin.service;

import com.umxinli.admin.mapper.DictMapper;
import com.umxinli.entity.DictItem;
import com.umxinli.entity.DictType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

/**
 * 数据字典服务
 */
@Service
public class DictService {

    @Autowired
    private DictMapper dictMapper;

    // ========== 字典类型 ==========

    public List<DictType> getAllTypes() {
        return dictMapper.selectAllTypes();
    }

    public DictType getTypeById(Long id) {
        return dictMapper.selectTypeById(id);
    }

    public DictType getTypeByCode(String code) {
        return dictMapper.selectTypeByCode(code);
    }

    @Transactional
    public DictType createType(DictType dictType) {
        dictType.setEnabled(1);
        dictMapper.insertType(dictType);
        return dictType;
    }

    @Transactional
    public DictType updateType(DictType dictType) {
        dictMapper.updateType(dictType);
        return dictType;
    }

    @Transactional
    public void deleteType(Long id) {
        dictMapper.deleteItemsByTypeId(id);
        dictMapper.deleteType(id);
    }

    // ========== 字典项 ==========

    public List<DictItem> getItemsByTypeId(Long typeId) {
        return dictMapper.selectItemsByTypeId(typeId);
    }

    public List<DictItem> getItemsByTypeCode(String typeCode) {
        return dictMapper.selectItemsByTypeCode(typeCode);
    }

    public List<String> getEnabledLabelsByTypeCode(String typeCode) {
        List<DictItem> items = dictMapper.selectEnabledItemsByTypeCode(typeCode);
        List<String> labels = new ArrayList<>();
        for (DictItem item : items) {
            labels.add(item.getLabel());
        }
        return labels;
    }

    @Transactional
    public DictItem createItem(DictItem dictItem) {
        DictType type = dictMapper.selectTypeById(dictItem.getTypeId());
        if (type != null) {
            dictItem.setTypeCode(type.getCode());
        }
        dictItem.setEnabled(1);
        dictMapper.insertItem(dictItem);
        return dictItem;
    }

    @Transactional
    public DictItem updateItem(DictItem dictItem) {
        dictMapper.updateItem(dictItem);
        return dictItem;
    }

    @Transactional
    public void deleteItem(Long id) {
        dictMapper.deleteItem(id);
    }

    /**
     * 获取所有字典数据（前端使用）
     * 返回格式: { typeCode: [label1, label2, ...], ... }
     */
    public Map<String, List<String>> getAllDictData() {
        Map<String, List<String>> result = new HashMap<>();
        List<DictType> types = dictMapper.selectAllTypes();
        for (DictType type : types) {
            if (type.getEnabled() == 1) {
                result.put(type.getCode(), getEnabledLabelsByTypeCode(type.getCode()));
            }
        }
        return result;
    }

    /**
     * 获取字典类型及其下的所有项
     */
    public Map<String, Object> getTypeWithItems(Long typeId) {
        Map<String, Object> result = new HashMap<>();
        DictType type = dictMapper.selectTypeById(typeId);
        result.put("type", type);
        result.put("items", dictMapper.selectItemsByTypeId(typeId));
        return result;
    }
}

