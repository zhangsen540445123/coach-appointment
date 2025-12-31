package com.umxinli.admin.service;

import com.umxinli.entity.GrowthMember;
import com.umxinli.entity.User;
import com.umxinli.mapper.GrowthMemberMapper;
import com.umxinli.mapper.UserMapper;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletResponse;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * 成长会会员服务
 */
@Service
public class GrowthMemberService {

    private static final Logger log = LoggerFactory.getLogger(GrowthMemberService.class);

    @Autowired
    private GrowthMemberMapper growthMemberMapper;

    @Autowired
    private UserMapper userMapper;

    /**
     * 分页查询成长会会员列表
     */
    public Map<String, Object> getGrowthMemberPage(String xiaoeNickname, String latestPhone, String status,
                                                    String joinType, String xiaoeUserId, int page, int pageSize) {
        int offset = (page - 1) * pageSize;
        List<GrowthMember> list = growthMemberMapper.selectPageWithFilter(xiaoeNickname, latestPhone, status,
                joinType, xiaoeUserId, offset, pageSize);
        long total = growthMemberMapper.selectCountWithFilter(xiaoeNickname, latestPhone, status, joinType, xiaoeUserId);

        Map<String, Object> result = new HashMap<>();
        result.put("list", list);
        result.put("total", total);
        result.put("page", page);
        result.put("pageSize", pageSize);
        result.put("pages", (int) Math.ceil((double) total / pageSize));
        return result;
    }

    /**
     * 获取成长会会员详情
     */
    public GrowthMember getGrowthMemberDetail(Long id) {
        return growthMemberMapper.selectById(id);
    }

    /**
     * 创建成长会会员
     */
    @Transactional
    public GrowthMember createGrowthMember(GrowthMember growthMember) {
        growthMemberMapper.insert(growthMember);
        return growthMember;
    }

    /**
     * 更新成长会会员信息
     */
    @Transactional
    public GrowthMember updateGrowthMember(Long id, GrowthMember growthMember) {
        growthMember.setId(id);
        growthMemberMapper.updateById(growthMember);
        return growthMemberMapper.selectById(id);
    }

    /**
     * 删除成长会会员
     */
    @Transactional
    public void deleteGrowthMember(Long id) {
        growthMemberMapper.deleteById(id);
    }

    /**
     * 批量删除成长会会员
     */
    @Transactional
    public void batchDeleteGrowthMembers(List<Long> ids) {
        if (ids != null && !ids.isEmpty()) {
            growthMemberMapper.deleteByIds(ids);
        }
    }

    /**
     * 获取筛选选项数据
     */
    public Map<String, Object> getFilterOptions() {
        Map<String, Object> result = new HashMap<>();
        result.put("statusOptions", growthMemberMapper.selectDistinctStatus());
        result.put("joinTypeOptions", growthMemberMapper.selectDistinctJoinType());
        return result;
    }

    /**
     * 获取成长会会员统计数据
     */
    public Map<String, Object> getGrowthMemberStats() {
        long total = growthMemberMapper.selectCount();
        Map<String, Object> result = new HashMap<>();
        result.put("total", total);
        return result;
    }

    /**
     * 导入成长会会员数据
     */
    @Transactional
    public Map<String, Object> importGrowthMembers(MultipartFile file, String tags) throws Exception {
        int successCount = 0;
        int updateCount = 0;
        int errorCount = 0;
        List<String> errorMessages = new ArrayList<>();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

        try (Workbook workbook = new XSSFWorkbook(file.getInputStream())) {
            Sheet sheet = workbook.getSheetAt(0);
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                if (row == null) continue;

                try {
                    GrowthMember member = new GrowthMember();
                    member.setXiaoeNickname(getCellValue(row.getCell(0)));
                    member.setLatestPhone(getCellValue(row.getCell(1)));
                    String courseCount = getCellValue(row.getCell(2));
                    if (courseCount != null && !courseCount.isEmpty()) {
                        member.setCourseCompletionCount(Integer.parseInt(courseCount));
                    }
                    String joinDateStr = getCellValue(row.getCell(3));
                    if (joinDateStr != null && !joinDateStr.isEmpty()) {
                        member.setJoinDate(dateFormat.parse(joinDateStr));
                    }
                    String expireDateStr = getCellValue(row.getCell(4));
                    if (expireDateStr != null && !expireDateStr.isEmpty()) {
                        member.setExpireDate(dateFormat.parse(expireDateStr));
                    }
                    member.setJoinType(getCellValue(row.getCell(5)));
                    member.setStatus(getCellValue(row.getCell(6)));
                    member.setXiaoeUserId(getCellValue(row.getCell(7)));
                    member.setXiaoeTags(tags); // 使用传入的标签
                    member.setRealName(getCellValue(row.getCell(9)));
                    String birthdayStr = getCellValue(row.getCell(10));
                    if (birthdayStr != null && !birthdayStr.isEmpty()) {
                        member.setBirthday(dateFormat.parse(birthdayStr));
                    }
                    member.setGender(getCellValue(row.getCell(11)));
                    member.setCity(getCellValue(row.getCell(12)));
                    member.setPhoneNumber(getCellValue(row.getCell(13)));
                    member.setEmail(getCellValue(row.getCell(14)));
                    member.setSourceChannel(getCellValue(row.getCell(15)));
                    String ageStr = getCellValue(row.getCell(16));
                    if (ageStr != null && !ageStr.isEmpty()) {
                        member.setAge(Integer.parseInt(ageStr));
                    }
                    member.setAddress(getCellValue(row.getCell(17)));
                    member.setWechatName(getCellValue(row.getCell(18)));
                    member.setWechatId(getCellValue(row.getCell(19)));

                    // 检查是否已存在（通过phone_number）
                    GrowthMember existing = null;
                    if (member.getPhoneNumber() != null && !member.getPhoneNumber().isEmpty()) {
                        existing = growthMemberMapper.selectByPhoneNumber(member.getPhoneNumber());
                    }

                    if (existing != null) {
                        // 更新现有记录
                        member.setId(existing.getId());
                        growthMemberMapper.updateById(member);
                        updateCount++;
                    } else {
                        // 插入新记录
                        growthMemberMapper.insert(member);
                        successCount++;
                    }
                } catch (Exception e) {
                    errorCount++;
                    errorMessages.add("第" + (i + 1) + "行: " + e.getMessage());
                    log.error("导入第{}行失败", i + 1, e);
                }
            }
        }

        Map<String, Object> result = new HashMap<>();
        result.put("successCount", successCount);
        result.put("updateCount", updateCount);
        result.put("errorCount", errorCount);
        result.put("errorMessages", errorMessages);
        return result;
    }

    /**
     * 导入后同步数据到用户表
     */
    @Transactional
    public Map<String, Object> syncAfterImport(List<String> phones) {
        int syncCount = 0;
        List<GrowthMember> members;

        if (phones != null && !phones.isEmpty()) {
            // 同步指定手机号的会员
            members = new ArrayList<>();
            for (String phone : phones) {
                GrowthMember member = growthMemberMapper.selectByPhoneNumber(phone);
                if (member != null) {
                    members.add(member);
                }
            }
        } else {
            // 同步所有会员
            members = growthMemberMapper.selectAllWithFilter(null, null, null, null, null);
        }

        for (GrowthMember member : members) {
            String phone = member.getPhoneNumber();
            if (phone == null || phone.isEmpty()) {
                phone = member.getLatestPhone();
            }
            if (phone != null && !phone.isEmpty()) {
                User user = userMapper.selectByPhone(phone);
                if (user != null) {
                    // 更新用户的成长会标签
                    user.setGrowthMemberTag(member.getXiaoeTags());
                    userMapper.updateById(user);
                    syncCount++;
                }
            }
        }

        Map<String, Object> result = new HashMap<>();
        result.put("syncCount", syncCount);
        return result;
    }

    /**
     * 导出成长会会员数据
     */
    public void exportGrowthMembers(String xiaoeNickname, String latestPhone, String status,
                                     String joinType, String xiaoeUserId, HttpServletResponse response) throws Exception {
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=growth_members.xlsx");

        List<GrowthMember> members = growthMemberMapper.selectAllWithFilter(xiaoeNickname, latestPhone, status, joinType, xiaoeUserId);
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

        try (Workbook workbook = new XSSFWorkbook(); OutputStream out = response.getOutputStream()) {
            Sheet sheet = workbook.createSheet("成长会会员");
            Row headerRow = sheet.createRow(0);
            String[] headers = {"小鹅通昵称", "最新手机号", "完课数", "加入日期", "到期日期", "加入方式", "状态",
                    "小鹅通用户ID", "小鹅通标签", "真实姓名", "生日", "性别", "城市", "手机号", "邮箱",
                    "来源渠道", "年龄", "地址", "微信昵称", "微信号"};
            for (int i = 0; i < headers.length; i++) {
                headerRow.createCell(i).setCellValue(headers[i]);
            }

            int rowNum = 1;
            for (GrowthMember member : members) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(member.getXiaoeNickname());
                row.createCell(1).setCellValue(member.getLatestPhone());
                row.createCell(2).setCellValue(member.getCourseCompletionCount() != null ? member.getCourseCompletionCount() : 0);
                row.createCell(3).setCellValue(member.getJoinDate() != null ? dateFormat.format(member.getJoinDate()) : "");
                row.createCell(4).setCellValue(member.getExpireDate() != null ? dateFormat.format(member.getExpireDate()) : "");
                row.createCell(5).setCellValue(member.getJoinType());
                row.createCell(6).setCellValue(member.getStatus());
                row.createCell(7).setCellValue(member.getXiaoeUserId());
                row.createCell(8).setCellValue(member.getXiaoeTags());
                row.createCell(9).setCellValue(member.getRealName());
                row.createCell(10).setCellValue(member.getBirthday() != null ? dateFormat.format(member.getBirthday()) : "");
                row.createCell(11).setCellValue(member.getGender());
                row.createCell(12).setCellValue(member.getCity());
                row.createCell(13).setCellValue(member.getPhoneNumber());
                row.createCell(14).setCellValue(member.getEmail());
                row.createCell(15).setCellValue(member.getSourceChannel());
                row.createCell(16).setCellValue(member.getAge() != null ? member.getAge() : 0);
                row.createCell(17).setCellValue(member.getAddress());
                row.createCell(18).setCellValue(member.getWechatName());
                row.createCell(19).setCellValue(member.getWechatId());
            }
            workbook.write(out);
        }
    }

    /**
     * 下载导入模板
     */
    public void downloadImportTemplate(HttpServletResponse response) throws Exception {
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=growth_member_template.xlsx");

        try (Workbook workbook = new XSSFWorkbook(); OutputStream out = response.getOutputStream()) {
            Sheet sheet = workbook.createSheet("成长会会员");
            Row headerRow = sheet.createRow(0);
            String[] headers = {"小鹅通昵称", "最新手机号", "完课数", "加入日期", "到期日期", "加入方式", "状态",
                    "小鹅通用户ID", "小鹅通标签", "真实姓名", "生日", "性别", "城市", "手机号", "邮箱",
                    "来源渠道", "年龄", "地址", "微信昵称", "微信号"};
            for (int i = 0; i < headers.length; i++) {
                headerRow.createCell(i).setCellValue(headers[i]);
            }
            workbook.write(out);
        }
    }

    private String getCellValue(Cell cell) {
        if (cell == null) return null;
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                    return sdf.format(cell.getDateCellValue());
                } else {
                    return String.valueOf((long) cell.getNumericCellValue());
                }
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            default:
                return null;
        }
    }
}

