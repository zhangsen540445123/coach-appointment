# UMXinli 心理咨询平台 - 后端服务

完整的 Spring Boot 后端工程，为心理咨询平台提供 API 服务。

## 项目特性

- **框架**: Spring Boot 2.7.14
- **数据库**: MySQL 8.0
- **ORM**: MyBatis
- **缓存**: Ehcache + Guava Cache
- **构建工具**: Maven
- **容器化**: Docker 支持

## 项目结构

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/umxinli/
│   │   │   ├── controller/          # 控制层
│   │   │   ├── service/             # 业务逻辑层
│   │   │   ├── mapper/              # 数据访问层
│   │   │   ├── entity/              # 实体类
│   │   │   ├── dto/                 # 数据传输对象
│   │   │   └── UmxinliApplication.java  # 启动类
│   │   └── resources/
│   │       ├── mapper/              # MyBatis XML 映射文件
│   │       ├── application.yml      # 应用配置
│   │       └── ehcache.xml          # 缓存配置
│   └── test/                        # 测试代码
├── sql/
│   └── init.sql                     # 数据库初始化脚本
├── pom.xml                          # Maven 配置
├── Dockerfile                       # Docker 镜像配置
├── build.bat                        # 构建脚本
├── run.bat                          # 运行脚本
├── docker-build.bat                 # Docker 构建脚本
└── README.md                        # 本文件
```

## 快速开始

### 前置要求

- Java 8 或更高版本
- Maven 3.6+
- MySQL 8.0+
- Docker (可选，用于容器化部署)

### 1. 数据库初始化

```bash
# 使用 MySQL 客户端执行 SQL 脚本
mysql -u root -p < sql/init.sql
```

或者在 MySQL 中执行：

```sql
source sql/init.sql;
```

### 2. 配置数据库连接

编辑 `src/main/resources/application.yml`，修改数据库连接信息：

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/umxinli_db?useUnicode=true&characterEncoding=utf-8&useSSL=false&serverTimezone=UTC
    username: root
    password: root
```

### 3. 构建项目

#### 方式一：使用 Windows 批处理脚本

```bash
# 双击运行
build.bat
```

#### 方式二：使用 Maven 命令

```bash
mvn clean package -DskipTests
```

### 4. 运行应用

#### 方式一：使用 Windows 批处理脚本

```bash
# 双击运行
run.bat
```

#### 方式二：使用 Java 命令

```bash
java -Xms512m -Xmx1024m -jar target/umxinli-backend-1.0.0.jar
```

### 5. 验证服务

打开浏览器访问：

```
http://localhost:8080/api/orderConsult/getCityList
```

如果返回城市列表，说明服务启动成功。

## Docker 部署

### 构建 Docker 镜像

```bash
# 使用批处理脚本
docker-build.bat

# 或使用 Docker 命令
docker build -t umxinli-backend:1.0.0 .
```

### 运行 Docker 容器

```bash
docker run -d \
    --name umxinli-backend \
    -p 8080:8080 \
    -e MYSQL_HOST=host.docker.internal \
    -e MYSQL_PORT=3306 \
    -e MYSQL_DB=umxinli_db \
    -e MYSQL_USER=root \
    -e MYSQL_PASSWORD=root \
    umxinli-backend:1.0.0
```

### 查看日志

```bash
docker logs -f umxinli-backend
```

### 停止容器

```bash
docker stop umxinli-backend
docker rm umxinli-backend
```

## API 端点

### 教练相关

- **POST** `/api/orderConsult/filter` - 筛选教练
- **GET** `/api/orderConsult/getCarousel` - 获取轮播图
- **GET** `/api/orderConsult/getCityList` - 获取城市列表

### 全局设置

- **GET** `/api/global/settings` - 获取全局设置

### 访客信息

- **GET** `/api/visitor/user/hasMessage` - 检查是否有消息

## 缓存策略

项目使用 Ehcache 进行本地缓存，缓存配置如下：

| 缓存名称 | 过期时间 | 用途 |
|---------|---------|------|
| counselor | 30分钟 | 单个教练信息 |
| counselors | 60分钟 | 教练列表 |
| carousel | 1小时 | 轮播图 |
| carousels | 1小时 | 轮播图列表 |
| city | 2小时 | 城市信息 |
| cities | 2小时 | 城市列表 |

## 日志配置

日志文件位置：`logs/application.log`

日志级别：
- ROOT: INFO
- com.umxinli: DEBUG
- org.springframework.web: DEBUG
- org.mybatis: DEBUG

## 常见问题

### 1. 连接数据库失败

检查以下项：
- MySQL 服务是否启动
- 数据库连接信息是否正确
- 数据库是否已创建
- 用户权限是否足够

### 2. 端口被占用

修改 `application.yml` 中的端口配置：

```yaml
server:
  port: 8081
```

### 3. 内存不足

增加 JVM 内存：

```bash
java -Xms1024m -Xmx2048m -jar target/umxinli-backend-1.0.0.jar
```

## 开发指南

### 添加新的 API 端点

1. 创建 Controller 类
2. 创建对应的 Service 接口和实现类
3. 创建 Mapper 接口和 XML 映射文件
4. 在 Controller 中调用 Service 方法

### 添加缓存

在 Service 方法上使用注解：

```java
@Cacheable(value = "cacheName", key = "#id")
public Object getObject(Long id) {
    // 业务逻辑
}

@CacheEvict(value = "cacheName", allEntries = true)
public void updateObject(Object obj) {
    // 业务逻辑
}
```

## 性能优化

- 使用 Ehcache 进行本地缓存，减少数据库查询
- MyBatis 二级缓存已启用
- 数据库连接池使用 HikariCP，最大连接数为 20
- 异步日志处理

## 安全建议

- 修改默认数据库密码
- 在生产环境中启用 HTTPS
- 添加请求验证和授权机制
- 定期更新依赖库

## 许可证

MIT License

## 联系方式

如有问题或建议，请联系开发团队。
