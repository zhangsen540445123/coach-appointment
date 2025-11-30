# 后端工程文件索引

## 📚 文档导航

### 快速开始

- **[QUICKSTART.md](QUICKSTART.md)** - ⭐ 推荐首先阅读
  - Docker Compose 一键启动
  - 本地开发方式
  - 常用命令
  - 故障排除

### 详细文档

- **[README.md](README.md)** - 项目完整说明
  - 项目特性
  - 项目结构
  - 快速开始
  - API 端点
  - 缓存策略
  - 开发指南

- **[DEPLOYMENT.md](DEPLOYMENT.md)** - 部署指南
  - 本地开发部署
  - Docker 单容器部署
  - Docker Compose 部署
  - 生产环境部署
  - 常见问题

- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - 项目总结
  - 项目概述
  - 技术栈
  - 项目结构
  - 数据库设计
  - API 端点
  - 性能指标

- **[CHECKLIST.md](CHECKLIST.md)** - 完成清单
  - 已完成项目
  - 项目统计
  - 验收标准
  - 技术亮点

---

## 📁 源代码文件

### 启动类

```
src/main/java/com/umxinli/
└── UmxinliApplication.java          # Spring Boot 启动类
```

### 控制层 (Controller)

```
src/main/java/com/umxinli/controller/
├── OrderConsultController.java      # 咨询订单控制器
├── GlobalController.java            # 全局设置控制器
└── VisitorController.java           # 访客信息控制器
```

### 业务逻辑层 (Service)

```
src/main/java/com/umxinli/service/
├── CounselorService.java            # 教练业务接口
├── CarouselService.java             # 轮播图业务接口
├── CityService.java                 # 城市业务接口
└── impl/
    ├── CounselorServiceImpl.java     # 教练业务实现
    ├── CarouselServiceImpl.java      # 轮播图业务实现
    └── CityServiceImpl.java          # 城市业务实现
```

### 数据访问层 (Mapper)

```
src/main/java/com/umxinli/mapper/
├── CounselorMapper.java             # 教练数据访问
├── CarouselMapper.java              # 轮播图数据访问
└── CityMapper.java                  # 城市数据访问
```

### 实体类 (Entity)

```
src/main/java/com/umxinli/entity/
├── BaseEntity.java                  # 基础实体类
├── User.java                        # 用户实体
├── Counselor.java                   # 教练实体
├── City.java                        # 城市实体
├── Carousel.java                    # 轮播图实体
├── ConsultOrder.java                # 订单实体
└── VisitorInfo.java                 # 访客信息实体
```

### 数据传输对象 (DTO)

```
src/main/java/com/umxinli/dto/
├── ApiResponse.java                 # API 响应格式
├── CounselorFilterRequest.java      # 筛选请求
└── CounselorFilterResponse.java     # 筛选响应
```

---

## ⚙️ 配置文件

### Spring Boot 配置

```
src/main/resources/
├── application.yml                  # 应用配置
│   ├── 数据库连接
│   ├── MyBatis 配置
│   ├── 缓存配置
│   ├── 日志配置
│   └── 服务器配置
└── ehcache.xml                      # Ehcache 缓存配置
```

### MyBatis 映射文件

```
src/main/resources/mapper/
├── CounselorMapper.xml              # 教练映射
├── CarouselMapper.xml               # 轮播图映射
└── CityMapper.xml                   # 城市映射
```

---

## 🗄️ 数据库文件

```
sql/
└── init.sql                         # 数据库初始化脚本
    ├── 11 个数据表
    ├── 索引设计
    └── 初始数据
```

---

## 🐳 Docker 文件

```
├── Dockerfile                       # Docker 镜像配置
│   ├── 基于 OpenJDK 8 Alpine
│   ├── JVM 内存配置
│   └── 应用启动配置
└── docker-compose.yml               # Docker Compose 编排
    ├── MySQL 8.0 服务
    ├── 后端应用服务
    ├── 网络配置
    └── 卷配置
```

---

## 🚀 部署脚本

### Windows 批处理脚本

```
├── build.bat                        # Maven 构建脚本
│   ├── Maven 检查
│   ├── 清理和构建
│   └── 错误处理
│
├── run.bat                          # 应用运行脚本
│   ├── Java 检查
│   ├── JAR 文件验证
│   └── JVM 参数配置
│
├── docker-build.bat                 # Docker 构建脚本
│   ├── Docker 检查
│   ├── 镜像构建
│   └── 容器启动
│
├── docker-compose-up.bat            # Docker Compose 启动脚本
│   ├── Docker Compose 检查
│   ├── 服务启动
│   └── 日志提示
│
└── docker-compose-down.bat          # Docker Compose 停止脚本
    ├── 服务停止
    └── 清理资源
```

---

## 📋 构建配置

```
pom.xml                             # Maven 项目配置
├── 项目基本信息
├── 依赖管理
├── 构建插件
└── 资源配置
```

---

## 📖 文档文件

```
├── README.md                        # 项目说明文档（300+ 行）
├── QUICKSTART.md                    # 快速启动指南（250+ 行）
├── DEPLOYMENT.md                    # 详细部署指南（400+ 行）
├── PROJECT_SUMMARY.md               # 项目总结（350+ 行）
├── CHECKLIST.md                     # 完成清单（300+ 行）
├── INDEX.md                         # 文件索引（本文件）
└── .gitignore                       # Git 忽略配置
```

---

## 🔍 快速查找

### 按功能查找

| 功能 | 文件 |
|------|------|
| 教练管理 | `CounselorController.java`, `CounselorService.java`, `CounselorMapper.java` |
| 轮播图管理 | `CarouselService.java`, `CarouselMapper.java` |
| 城市管理 | `CityService.java`, `CityMapper.java` |
| 全局设置 | `GlobalController.java` |
| 访客信息 | `VisitorController.java` |
| 数据库 | `sql/init.sql` |
| 缓存 | `ehcache.xml` |
| 部署 | `Dockerfile`, `docker-compose.yml` |

### 按技术查找

| 技术 | 文件 |
|------|------|
| Spring Boot | `UmxinliApplication.java`, `application.yml` |
| MyBatis | `mapper/` 目录, `*Mapper.java` 文件 |
| Ehcache | `ehcache.xml`, `*ServiceImpl.java` |
| Docker | `Dockerfile`, `docker-compose.yml` |
| MySQL | `sql/init.sql` |
| Maven | `pom.xml` |

### 按部署方式查找

| 部署方式 | 文件 |
|---------|------|
| 本地开发 | `build.bat`, `run.bat`, `README.md` |
| Docker 单容器 | `docker-build.bat`, `Dockerfile` |
| Docker Compose | `docker-compose-up.bat`, `docker-compose.yml` |
| 生产环境 | `DEPLOYMENT.md` |

---

## 📊 项目统计

### 代码行数

| 类型 | 文件数 | 总行数 |
|------|--------|--------|
| Java 源文件 | 23 | 1000+ |
| XML 映射文件 | 3 | 300+ |
| 配置文件 | 3 | 200+ |
| SQL 脚本 | 1 | 200+ |
| 文档文件 | 6 | 2000+ |
| 脚本文件 | 5 | 300+ |

### 功能数量

| 功能 | 数量 |
|------|------|
| API 端点 | 6 |
| 数据表 | 11 |
| Service 方法 | 15+ |
| Mapper 方法 | 21 |
| 缓存区域 | 6 |

---

## 🎯 使用指南

### 第一次使用

1. **阅读文档**
   - 先读 `QUICKSTART.md` 了解快速启动
   - 再读 `README.md` 了解项目详情

2. **启动服务**
   - 双击 `docker-compose-up.bat` 启动所有服务
   - 或按 `QUICKSTART.md` 中的步骤本地启动

3. **测试 API**
   - 访问 `http://localhost:8080/api/orderConsult/getCityList`
   - 使用 Postman 或 curl 测试其他端点

### 开发新功能

1. **了解架构**
   - 查看 `PROJECT_SUMMARY.md` 了解项目结构
   - 查看现有代码了解开发模式

2. **添加新表**
   - 在 `sql/init.sql` 中添加表定义
   - 创建对应的 Entity 类

3. **实现业务逻辑**
   - 创建 Service 接口和实现类
   - 创建 Mapper 接口和 XML 映射文件
   - 创建 Controller 处理 HTTP 请求

### 部署到生产

1. **选择部署方式**
   - 查看 `DEPLOYMENT.md` 选择合适的部署方式
   - 推荐使用 Docker Compose

2. **准备环境**
   - 安装 Docker 和 Docker Compose
   - 准备 MySQL 数据库

3. **执行部署**
   - 按 `DEPLOYMENT.md` 中的步骤部署
   - 验证服务是否正常运行

---

## 📞 获取帮助

### 查看文档

- **快速问题**：查看 `QUICKSTART.md` 中的故障排除
- **部署问题**：查看 `DEPLOYMENT.md` 中的常见问题
- **项目问题**：查看 `README.md` 中的开发指南

### 查看日志

```bash
# 查看应用日志
tail -f logs/application.log

# 查看 Docker 日志
docker-compose logs -f backend
docker-compose logs -f mysql
```

### 联系支持

- 提交问题或建议
- 请求技术支持
- 参与项目开发

---

## 🔗 相关链接

### 项目文档

- [项目说明](README.md)
- [快速启动](QUICKSTART.md)
- [部署指南](DEPLOYMENT.md)
- [项目总结](PROJECT_SUMMARY.md)
- [完成清单](CHECKLIST.md)

### 外部资源

- [Spring Boot 官方文档](https://spring.io/projects/spring-boot)
- [MyBatis 官方文档](https://mybatis.org/)
- [Docker 官方文档](https://docs.docker.com/)
- [MySQL 官方文档](https://dev.mysql.com/doc/)

---

## ✅ 检查清单

在使用本项目前，请确保：

- [ ] 已阅读 `QUICKSTART.md`
- [ ] 已安装 Docker 和 Docker Compose（如使用 Docker 部署）
- [ ] 已安装 Java 8 和 Maven（如本地开发）
- [ ] 已安装 MySQL 8.0（如本地开发）
- [ ] 已理解项目结构和架构

---

**最后更新**：2025-11-27

**版本**：1.0.0

**状态**：✅ 生产就绪

**下一步**：选择合适的部署方式，启动您的服务！
