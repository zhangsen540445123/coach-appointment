package com.umxinli.admin.mapper;

import com.umxinli.entity.DictItem;
import com.umxinli.entity.DictType;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 数据字典Mapper
 */
@Mapper
public interface DictMapper {
    
    // ========== 字典类型 ==========
    
    List<DictType> selectAllTypes();
    
    DictType selectTypeById(@Param("id") Long id);
    
    DictType selectTypeByCode(@Param("code") String code);
    
    int insertType(DictType dictType);
    
    int updateType(DictType dictType);
    
    int deleteType(@Param("id") Long id);
    
    // ========== 字典项 ==========
    
    List<DictItem> selectItemsByTypeId(@Param("typeId") Long typeId);
    
    List<DictItem> selectItemsByTypeCode(@Param("typeCode") String typeCode);
    
    List<DictItem> selectEnabledItemsByTypeCode(@Param("typeCode") String typeCode);
    
    DictItem selectItemById(@Param("id") Long id);
    
    int insertItem(DictItem dictItem);
    
    int updateItem(DictItem dictItem);
    
    int deleteItem(@Param("id") Long id);
    
    int deleteItemsByTypeId(@Param("typeId") Long typeId);
    
    /** 批量插入字典项 */
    int batchInsertItems(@Param("items") List<DictItem> items);
}

