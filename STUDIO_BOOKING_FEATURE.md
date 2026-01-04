# 悦行活动线上预约和支付功能

## 已完成功能

### 一、数据库设计 ✅
1. **活动表改造** (`consult_studio`)
   - 添加 `price` 字段：活动价格（0表示免费）
   - 添加 `booking_type` 字段：预约方式（0=仅电话，1=线上预约，2=两者都支持）
   - 添加 `max_participants` 字段：最大参与人数（0表示不限制）

2. **活动预约表** (`studio_booking`)
   - 完整的预约记录管理
   - 支持免费和收费活动
   - 关联用户和活动信息

3. **优惠券表改造** (`coupon`)
   - 添加 `coupon_type` 字段：区分教练优惠券和活动优惠券
   - 添加 `applicable_studio_id` 字段：指定适用活动

### 二、后端开发 ✅

#### 实体类
- `StudioBooking.java` - 活动预约实体
- `ConsultStudio.java` - 更新支持新字段

#### Mapper
- `StudioBookingMapper.java` - 预约数据访问
- `StudioBookingMapper.xml` - SQL映射
- `ConsultStudioMapper.java` - 更新支持新字段

#### Service
- `StudioBookingService.java` - 预约业务接口
- `StudioBookingServiceImpl.java` - 预约业务实现
  - 免费活动直接预约成功
  - 收费活动创建待支付订单并返回支付参数
  - 支持取消预约
  - 支持查询预约状态

#### Controller
- `StudioBookingController.java` - 用户端预约接口
  - POST `/api/studio/{id}/book` - 预约活动
  - GET `/api/studio/{id}/booking-status` - 查询预约状态
  - POST `/api/studio/booking/{bookingId}/cancel` - 取消预约
  - GET `/api/studio/my-bookings` - 我的预约列表
  - POST `/api/studio/booking/{bookingId}/pay` - 活动预约支付

- `AdminStudioBookingController.java` - 管理端预约管理
  - GET `/admin/studio/{id}/bookings` - 获取活动预约列表

#### 支付集成
- 更新 `PayServiceImpl.java` 支持活动预约支付回调
- 订单号以 "STUDIO" 开头的为活动预约订单

### 三、管理端前端开发 ✅

#### 管理端 (admin-web)
1. **活动管理页面** (`StudioList.vue`)
   - 添加价格、预约方式、人数限制字段
   - 表格显示价格和预约方式
   - 添加"查看预约"操作按钮

2. **活动预约列表页面** (`StudioBookingList.vue`)
   - 显示预约用户信息
   - 显示支付状态和金额
   - 支持分页查询

3. **路由配置**
   - 添加活动预约列表路由

### 四、小程序端前端开发 ✅

#### 小程序端 (app)
1. **API 接口封装** (`app/utils/api.js`)
   - 添加 `studioApi` 对象
   - 实现活动预约相关接口调用

2. **预约辅助函数** (`app/utils/studioBooking.js`)
   - `handleStudioBooking()` - 处理活动预约流程
   - `handlePayment()` - 处理支付流程
   - 自动判断免费/收费活动
   - 检查登录状态和手机号绑定

3. **活动详情页面** (`app/pages/studio/details.*`)
   - 显示活动价格信息
   - 显示预约状态（已预约/待支付）
   - 根据 `bookingType` 显示不同的预约按钮
   - 实现立即预约功能

4. **我的预约页面** (`app/pages/user/myBookings.*`)
   - 显示用户的所有活动预约记录
   - 支持查看详情、去支付、取消预约
   - 支持下拉刷新和加载更多
   - 空状态提示

5. **用户中心页面** (`app/pages/user/user.*`)
   - 添加"我的预约"入口
   - 跳转到预约列表页面

6. **辅助文件**
   - `app/pages/studio/detailsHelper.js` - 活动详情页面扩展
   - `app/utils/userPageHelper.js` - 用户中心页面扩展

7. **页面注册**
   - 在 `app.json` 中注册 `myBookings` 页面

### 五、业务规则 ✅
1. 用户必须登录且绑定手机号才能预约
2. 免费活动点击预约后直接成功
3. 收费活动必须支付成功后才算预约成功
4. 用户不能重复预约同一个活动
5. 活动满员后不能继续预约
6. 支持活动人数限制

### 六、数据库初始化
所有数据库变更已维护到 `backend/src/main/resources/schema.sql` 文件中。
对于新项目，直接执行该文件即可完成数据库初始化。

## 使用说明

### 小程序端集成
详细的小程序端集成说明请参考：`app/STUDIO_BOOKING_INTEGRATION.md`

由于小程序代码是编译后的版本，需要在源代码中进行以下关键修改：

1. **活动详情页面** - 在 `onLoad` 中初始化预约功能
2. **用户中心页面** - 添加跳转到"我的预约"的方法

具体步骤和代码示例请查看集成文档。

### 管理员操作
1. 在"悦行活动管理"页面创建或编辑活动
2. 设置活动价格（0表示免费）
3. 选择预约方式（仅电话/线上预约/两者都支持）
4. 设置人数限制（0表示不限制）
5. 点击"查看预约"查看活动的预约情况

### 用户操作
1. 浏览活动列表，查看活动详情
2. 点击预约按钮
   - 免费活动：直接预约成功
   - 收费活动：跳转支付页面，完成支付后预约成功
3. 在"我的预约"查看所有预约记录
4. 可以取消未支付的预约

## 技术要点
- 复用现有的微信支付流程
- 支付回调通过订单号前缀区分订单类型
- 前端表单验证和后端业务校验
- 数据库唯一索引防止重复预约

