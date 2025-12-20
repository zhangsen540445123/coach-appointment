import { ref, readonly } from 'vue'
import { dictApi } from '@/api/dict'

// Global cache for dictionary data
const dictCache = ref({})
const loading = ref(false)
const loaded = ref(false)

// Status type mapping for UI display
const statusTypeMap = {
  order_status: {
    '0': 'warning',   // 待支付 - 黄色
    '1': 'primary',   // 已支付 - 蓝色
    '2': 'success',   // 进行中 - 绿色
    '3': 'success',   // 已完成 - 绿色
    '4': 'danger',    // 已取消 - 红色
    '5': 'info'       // 已退款 - 灰色
  },
  audit_status: {
    '0': 'warning',   // 待审核
    '1': 'success',   // 已通过
    '2': 'danger'     // 已拒绝
  }
}

/**
 * Composable for dictionary data management
 * Provides centralized loading and caching of dictionary data
 */
export function useDict() {
  /**
   * Load all dictionary data from API
   * @param {boolean} force - Force reload even if already cached
   */
  const loadAllDict = async (force = false) => {
    if (loaded.value && !force) return dictCache.value
    if (loading.value) return dictCache.value
    
    loading.value = true
    try {
      const res = await dictApi.getAllData()
      if (res.code === 0 && res.data) {
        dictCache.value = res.data
        loaded.value = true
      }
    } catch (e) {
      console.error('Failed to load dictionary data:', e)
    } finally {
      loading.value = false
    }
    return dictCache.value
  }

  /**
   * Get dictionary items by type code
   * @param {string} typeCode - Dictionary type code (e.g., 'order_status', 'career')
   * @returns {Array} Array of labels
   */
  const getDictItems = (typeCode) => {
    return dictCache.value[typeCode] || []
  }

  /**
   * Get label by value for a dictionary type
   * @param {string} typeCode - Dictionary type code
   * @param {string|number} value - The value to look up
   * @returns {string} The label for the value
   */
  const getLabel = (typeCode, value) => {
    const items = getDictItems(typeCode)
    if (!items.length) return String(value)
    
    // For status types, value is stored as string in dict_item
    const idx = parseInt(value)
    if (!isNaN(idx) && idx >= 0 && idx < items.length) {
      return items[idx] || String(value)
    }
    return String(value)
  }

  /**
   * Get status tag type for UI display
   * @param {string} typeCode - Dictionary type code
   * @param {string|number} value - The status value
   * @returns {string} Element Plus tag type
   */
  const getStatusType = (typeCode, value) => {
    const typeMap = statusTypeMap[typeCode]
    if (typeMap) {
      return typeMap[String(value)] || 'info'
    }
    return 'info'
  }

  /**
   * Get options formatted for el-select
   * @param {string} typeCode - Dictionary type code
   * @param {boolean} useIndex - Use index as value (for status types)
   * @returns {Array} Array of {label, value} objects
   */
  const getSelectOptions = (typeCode, useIndex = false) => {
    const items = getDictItems(typeCode)
    if (useIndex) {
      return items.map((label, index) => ({ label, value: index }))
    }
    return items.map(label => ({ label, value: label }))
  }

  /**
   * Get channel options with numeric values
   * @returns {Array} Array of {text, value} objects for channels
   */
  const getChannelOptions = () => {
    const channels = getDictItems('channel') || []
    return channels.map((text, idx) => ({ value: idx + 1, text }))
  }

  return {
    dictCache: readonly(dictCache),
    loading: readonly(loading),
    loaded: readonly(loaded),
    loadAllDict,
    getDictItems,
    getLabel,
    getStatusType,
    getSelectOptions,
    getChannelOptions
  }
}

// Export a singleton instance for global use
export const dictStore = {
  cache: dictCache,
  loading,
  loaded
}

