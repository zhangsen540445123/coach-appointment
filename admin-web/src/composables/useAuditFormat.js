/**
 * 审核数据格式化和差异对比工具
 */

// 字段名称映射：英文 key -> 中文标签
export const fieldLabelMap = {
    name: '姓名',
    gender: '性别',
    cityName: '所在城市',
    headUrl: '头像',
    headUrlSquare: '方形头像',
    videoUrl: '视频地址',
    imageUrls: '图片列表',
    qualifications: '资质证书',
    directions: '擅长领域',
    introduction: '个人介绍',
    consultPrice: '咨询价格',
    serviceType: '服务类型',
    starNum: '星级评分',
    consultType: '咨询类型',
    supportOnlineConsult: '支持线上咨询',
    supportOfflineConsult: '支持线下咨询',
    canConsult: '是否可咨询',
    experienceDate: '从业日期',
    experienceTime: '从业时长',
    training: '受训背景',
    special: '特别说明',
    school: '学历背景',
    address: '咨询地址',
    faceMsg: '面询说明',
    consultMsg: '咨询说明',
    consult: '咨询项目',
    articleList: '文章列表',
    isTop: '是否置顶',
    sortOrder: '排序权重',
    createdAt: '创建时间',
    updatedAt: '更新时间'
}

// 性别映射
const genderMap = { 0: '未知', 1: '男', 2: '女' }

// 咨询方式映射
const consultWayMap = { 0: '视频', 1: '语音', 2: '图文', 3: '面询', 4: '不限' }

// 服务类型映射
const serviceTypeMap = { 1: '线上', 2: '线下', 3: '混合' }

/**
 * 格式化字段值
 */
export function formatFieldValue(key, value) {
    if (value === null || value === undefined) return '-'

    // 布尔/开关类型
    if (['supportOnlineConsult', 'supportOfflineConsult', 'canConsult', 'isTop'].includes(key)) {
        return value === 1 || value === true ? '是' : '否'
    }

    // 性别
    if (key === 'gender') {
        return genderMap[value] || value
    }

    // 服务类型
    if (key === 'serviceType') {
        return serviceTypeMap[value] || value
    }

    // 咨询类型数组
    if (key === 'consultType' && Array.isArray(value)) {
        return value.map(v => consultWayMap[v] || v).join('、') || '-'
    }

    // 日期格式化
    if (key === 'experienceDate' && value) {
        try {
            const date = new Date(value)
            return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
        } catch {
            return value
        }
    }

    // 价格格式化
    if (key === 'consultPrice' && value !== null) {
        return `¥${value}`
    }

    // 数组类型（资质证书、学历背景等）
    if (['qualifications', 'school', 'imageUrls'].includes(key) && Array.isArray(value)) {
        return value.length > 0 ? value.join('、') : '-'
    }

    // 擅长领域（复杂结构）
    if (key === 'directions') {
        return formatDirections(value)
    }

    // 受训背景
    if (key === 'training') {
        return formatTraining(value)
    }

    // 咨询项目
    if (key === 'consult') {
        return formatConsult(value)
    }

    // 图片URL，显示缩略版
    if ((key === 'headUrl' || key === 'headUrlSquare' || key === 'videoUrl') && value) {
        return value.length > 50 ? value.substring(0, 50) + '...' : value
    }

    // 长文本截断
    if (typeof value === 'string' && value.length > 100) {
        return value.substring(0, 100) + '...'
    }

    // 对象类型
    if (typeof value === 'object') {
        return JSON.stringify(value, null, 2)
    }

    return String(value)
}

/**
 * 格式化擅长领域
 */
function formatDirections(value) {
    if (!value) return '-'
    if (typeof value === 'string') return value
    if (Array.isArray(value)) {
        return value.map(item => {
            if (typeof item === 'string') return item
            if (item.name) {
                const childArray = item.child || []
                const children = childArray.map(c => c.name || c).join('、')
                return children ? `${item.name}(${children})` : item.name
            }
            return JSON.stringify(item)
        }).join('；') || '-'
    }
    return JSON.stringify(value)
}

/**
 * 格式化受训背景
 */
function formatTraining(value) {
    if (!value) return '-'
    if (!Array.isArray(value)) return String(value)
    return value.map(item => {
        if (typeof item === 'string') return item
        const dates = [item.beginDate, item.endDate].filter(Boolean).join(' ~ ')
        return dates ? `${item.content || ''} (${dates})` : (item.content || JSON.stringify(item))
    }).join('；') || '-'
}

/**
 * 格式化咨询项目
 */
function formatConsult(value) {
    if (!value) return '-'
    if (!Array.isArray(value)) return String(value)
    return value.map(item => {
        const type = consultWayMap[item.consultType] || item.consultType
        return `${type}: ¥${item.consultPrice || 0}`
    }).join('、') || '-'
}

/**
 * 解析 JSON 字符串
 */
export function parseJsonData(data) {
    if (!data) return {}
    if (typeof data === 'object') return data
    try {
        return JSON.parse(data)
    } catch {
        return {}
    }
}

/**
 * 深度比较两个值是否相等
 * 正确处理：属性顺序不同、空值、嵌套对象/数组
 */
function isEqual(val1, val2) {
    // 严格相等
    if (val1 === val2) return true

    // 空值处理：null, undefined, 空字符串 视为等价
    const isEmpty = v => v === null || v === undefined || v === ''
    if (isEmpty(val1) && isEmpty(val2)) return true
    if (isEmpty(val1) || isEmpty(val2)) return false

    // 类型不同时，尝试转换后比较（处理 "1" vs 1 的情况）
    if (typeof val1 !== typeof val2) {
        // 都能转为数字且相等
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
            return Number(val1) === Number(val2)
        }
        return String(val1) === String(val2)
    }

    // 数组比较
    if (Array.isArray(val1) && Array.isArray(val2)) {
        if (val1.length !== val2.length) return false
        for (let i = 0; i < val1.length; i++) {
            if (!isEqual(val1[i], val2[i])) return false
        }
        return true
    }

    // 对象比较（处理属性顺序不同的情况）
    if (typeof val1 === 'object' && val1 !== null) {
        const keys1 = Object.keys(val1).filter(k => !isEmpty(val1[k]))
        const keys2 = Object.keys(val2).filter(k => !isEmpty(val2[k]))

        // 排除空值后的键数量不同
        if (keys1.length !== keys2.length) return false

        // 检查所有非空键的值是否相等
        for (const key of keys1) {
            if (!isEqual(val1[key], val2[key])) return false
        }
        return true
    }

    return false
}

/**
 * 计算前后数据的差异
 * @param {Object} beforeData - 修改前数据
 * @param {Object} afterData - 修改后数据
 * @returns {Object} - { changedFields: Set, allFields: Array }
 */
export function computeDiff(beforeData, afterData) {
    const before = parseJsonData(beforeData)
    const after = parseJsonData(afterData)

    // 获取所有字段（排除一些不需要展示的字段）
    const excludeFields = ['id', 'counselorId', 'userId']
    const allFieldsSet = new Set([
        ...Object.keys(before),
        ...Object.keys(after)
    ].filter(key => !excludeFields.includes(key)))

    // 按照 fieldLabelMap 的顺序排列字段
    const fieldOrder = Object.keys(fieldLabelMap)
    const allFields = [...allFieldsSet].sort((a, b) => {
        const idxA = fieldOrder.indexOf(a)
        const idxB = fieldOrder.indexOf(b)
        if (idxA === -1 && idxB === -1) return a.localeCompare(b)
        if (idxA === -1) return 1
        if (idxB === -1) return -1
        return idxA - idxB
    })

    // 找出变化的字段
    const changedFields = new Set()
    for (const key of allFields) {
        if (!isEqual(before[key], after[key])) {
            changedFields.add(key)
        }
    }

    return {
        before,
        after,
        changedFields,
        allFields
    }
}

/**
 * 获取字段的中文标签
 */
export function getFieldLabel(key) {
    return fieldLabelMap[key] || key
}