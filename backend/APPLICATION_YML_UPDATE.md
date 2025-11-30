# application.yml 更新说明

## 添加文件上传配置

为了支持文件上传功能，需要在 `src/main/resources/application.yml` 中添加以下配置：

### 完整的 application.yml 配置

```yaml
spring:
  application:
    name: umxinli-backend
  
  datasource:
    url: jdbc:mysql://localhost:3306/umxinli_db?useUnicode=true&characterEncoding=utf-8&useSSL=false&serverTimezone=UTC
    username: root
    password: root
    driver-class-name: com.mysql.cj.jdbc.Driver
    hikari:
      maximum-pool-size: 20
      minimum-idle: 5
      connection-timeout: 30000
      idle-timeout: 600000
      max-lifetime: 1800000

  jpa:
    hibernate:
      ddl-auto: none
    show-sql: false
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL8Dialect
        format_sql: true

  cache:
    type: ehcache
    ehcache:
      config: classpath:ehcache.xml

  # 文件上传配置
  servlet:
    multipart:
      max-file-size: 10MB
      max-request-size: 50MB
      enabled: true

  # 静态资源配置
  resources:
    static-locations: classpath:/static/
    cache:
      period: 31536000
      cachecontrol:
        max-age: 31536000
        public: true

  # Gzip 压缩配置
  compression:
    enabled: true
    min-response-size: 1024
    mime-types: text/html,text/xml,text/plain,text/css,text/javascript,application/javascript,application/json,image/png,image/jpeg,image/gif

mybatis:
  mapper-locations: classpath:mapper/*.xml
  type-aliases-package: com.umxinli.entity
  configuration:
    map-underscore-to-camel-case: true
    cache-enabled: true
    lazy-loading-enabled: true
    aggressive-lazy-loading: false
    log-impl: org.apache.ibatis.logging.slf4j.Slf4jImpl

server:
  port: 8080
  servlet:
    context-path: /api
  compression:
    enabled: true
    min-response-size: 1024

# 文件存储配置
file:
  upload-dir: src/main/resources/static/images

logging:
  level:
    root: INFO
    com.umxinli: DEBUG
    org.springframework.web: DEBUG
    org.mybatis: DEBUG
  pattern:
    console: "%d{yyyy-MM-dd HH:mm:ss} - %msg%n"
    file: "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n"
  file:
    name: logs/application.log
    max-size: 10MB
    max-history: 10
```

## 配置说明

### 文件上传配置

```yaml
spring:
  servlet:
    multipart:
      max-file-size: 10MB          # 单个文件最大大小
      max-request-size: 50MB       # 单个请求最大大小
      enabled: true                # 启用文件上传
```

### 静态资源配置

```yaml
spring:
  resources:
    static-locations: classpath:/static/  # 静态资源位置
    cache:
      period: 31536000             # 缓存时间（秒）
```

### Gzip 压缩配置

```yaml
spring:
  compression:
    enabled: true                  # 启用压缩
    min-response-size: 1024        # 最小压缩大小
    mime-types: ...                # 压缩的 MIME 类型
```

### 文件存储配置

```yaml
file:
  upload-dir: src/main/resources/static/images  # 图片存储目录
```

## 修改步骤

1. 打开 `src/main/resources/application.yml`
2. 在 `spring:` 下添加以下配置：

```yaml
  servlet:
    multipart:
      max-file-size: 10MB
      max-request-size: 50MB
      enabled: true

  resources:
    static-locations: classpath:/static/
    cache:
      period: 31536000
      cachecontrol:
        max-age: 31536000
        public: true

  compression:
    enabled: true
    min-response-size: 1024
    mime-types: text/html,text/xml,text/plain,text/css,text/javascript,application/javascript,application/json,image/png,image/jpeg,image/gif
```

3. 在文件末尾添加：

```yaml
file:
  upload-dir: src/main/resources/static/images
```

4. 保存文件并重新启动应用

## 验证配置

启动应用后，访问以下 URL 验证配置是否正确：

```bash
# 获取图片列表
curl http://localhost:8080/api/file/images/list

# 上传图片
curl -X POST http://localhost:8080/api/file/upload \
  -F "file=@/path/to/image.png"

# 获取图片
curl http://localhost:8080/api/file/image/filename.png
```

## 常见问题

### Q: 上传文件大小限制在哪里配置？

A: 在 `application.yml` 中配置：

```yaml
spring:
  servlet:
    multipart:
      max-file-size: 10MB      # 修改这里
      max-request-size: 50MB   # 修改这里
```

### Q: 如何修改图片存储目录？

A: 在 `application.yml` 中修改：

```yaml
file:
  upload-dir: /path/to/your/images/directory
```

### Q: 如何启用 Gzip 压缩？

A: 在 `application.yml` 中配置：

```yaml
spring:
  compression:
    enabled: true
    min-response-size: 1024
```

### Q: 如何设置静态资源缓存？

A: 在 `application.yml` 中配置：

```yaml
spring:
  resources:
    cache:
      period: 31536000  # 缓存 1 年
```

## 相关文件

- [application.yml](src/main/resources/application.yml) - 应用配置文件
- [FileController.java](src/main/java/com/umxinli/controller/FileController.java) - 文件控制器
- [IMAGE_MANAGEMENT.md](IMAGE_MANAGEMENT.md) - 图片管理指南

---

**最后更新**：2025-11-27

**版本**：1.0.0
