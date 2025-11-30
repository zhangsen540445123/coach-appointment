# 部署指南

本文档提供了多种部署方式，选择最适合您的方式进行部署。

## 目录

1. [本地开发部署](#本地开发部署)
2. [Docker 单容器部署](#docker-单容器部署)
3. [Docker Compose 完整栈部署](#docker-compose-完整栈部署)
4. [生产环境部署](#生产环境部署)

---

## 本地开发部署

### 前置条件

- Java 8+
- Maven 3.6+
- MySQL 8.0+

### 部署步骤

#### 1. 初始化数据库

```bash
# 使用 MySQL 命令行
mysql -u root -p < sql/init.sql

# 或在 MySQL 中执行
source sql/init.sql;
```

#### 2. 修改数据库配置

编辑 `src/main/resources/application.yml`：

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/umxinli_db?useUnicode=true&characterEncoding=utf-8&useSSL=false&serverTimezone=UTC
    username: root
    password: root
```

#### 3. 构建项目

**方式一：使用批处理脚本（推荐）**

```bash
# 双击运行 build.bat
build.bat
```

**方式二：使用 Maven 命令**

```bash
mvn clean package -DskipTests
```

#### 4. 运行应用

**方式一：使用批处理脚本（推荐）**

```bash
# 双击运行 run.bat
run.bat
```

**方式二：使用 Java 命令**

```bash
java -Xms512m -Xmx1024m -jar target/umxinli-backend-1.0.0.jar
```

#### 5. 验证服务

打开浏览器访问：

```
http://localhost:8080/api/orderConsult/getCityList
```

---

## Docker 单容器部署

### 前置条件

- Docker 18.09+
- MySQL 8.0+（需要单独部署）

### 部署步骤

#### 1. 初始化数据库

在您的 MySQL 服务器上执行：

```bash
mysql -u root -p < sql/init.sql
```

#### 2. 构建 Docker 镜像

**方式一：使用批处理脚本（推荐）**

```bash
# 双击运行 docker-build.bat
docker-build.bat
```

**方式二：使用 Docker 命令**

```bash
# 先构建 JAR 文件
mvn clean package -DskipTests

# 构建 Docker 镜像
docker build -t umxinli-backend:1.0.0 .
```

#### 3. 运行 Docker 容器

```bash
docker run -d \
    --name umxinli-backend \
    -p 8080:8080 \
    -e SPRING_DATASOURCE_URL=jdbc:mysql://host.docker.internal:3306/umxinli_db?useUnicode=true&characterEncoding=utf-8&useSSL=false&serverTimezone=UTC \
    -e SPRING_DATASOURCE_USERNAME=root \
    -e SPRING_DATASOURCE_PASSWORD=root \
    umxinli-backend:1.0.0
```

#### 4. 验证服务

```bash
# 查看日志
docker logs -f umxinli-backend

# 访问 API
curl http://localhost:8080/api/orderConsult/getCityList
```

#### 5. 停止容器

```bash
docker stop umxinli-backend
docker rm umxinli-backend
```

---

## Docker Compose 完整栈部署

### 前置条件

- Docker 18.09+
- Docker Compose 1.25+

### 部署步骤

#### 1. 一键启动

**方式一：使用批处理脚本（推荐）**

```bash
# 双击运行 docker-compose-up.bat
docker-compose-up.bat
```

**方式二：使用 Docker Compose 命令**

```bash
# 构建镜像并启动所有服务
docker-compose up -d

# 或分步执行
docker-compose build
docker-compose up -d
```

#### 2. 验证服务

```bash
# 查看所有服务状态
docker-compose ps

# 查看后端日志
docker-compose logs -f backend

# 查看 MySQL 日志
docker-compose logs -f mysql

# 访问 API
curl http://localhost:8080/api/orderConsult/getCityList
```

#### 3. 停止服务

**方式一：使用批处理脚本**

```bash
# 双击运行 docker-compose-down.bat
docker-compose-down.bat
```

**方式二：使用 Docker Compose 命令**

```bash
docker-compose down
```

#### 4. 清理数据

```bash
# 删除所有容器和卷
docker-compose down -v
```

---

## 生产环境部署

### 前置条件

- Docker 18.09+
- Docker Compose 1.25+
- Linux 服务器（推荐 Ubuntu 20.04+）

### 部署步骤

#### 1. 上传文件

将后端项目上传到服务器：

```bash
scp -r backend/ user@server:/opt/umxinli/
```

#### 2. 修改配置

编辑 `docker-compose.yml`，修改以下内容：

```yaml
services:
  mysql:
    environment:
      MYSQL_ROOT_PASSWORD: your_secure_password
      MYSQL_PASSWORD: your_secure_password
  
  backend:
    environment:
      SPRING_DATASOURCE_PASSWORD: your_secure_password
```

#### 3. 启动服务

```bash
cd /opt/umxinli/backend
docker-compose up -d
```

#### 4. 配置反向代理（Nginx）

创建 `/etc/nginx/sites-available/umxinli`：

```nginx
upstream backend {
    server localhost:8080;
}

server {
    listen 80;
    server_name api.umxinli.com;

    location /api/ {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

启用配置：

```bash
sudo ln -s /etc/nginx/sites-available/umxinli /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 5. 配置 SSL 证书（可选）

使用 Let's Encrypt：

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d api.umxinli.com
```

#### 6. 监控和日志

```bash
# 查看实时日志
docker-compose logs -f backend

# 查看容器资源使用
docker stats

# 设置日志轮转
docker run --log-driver json-file --log-opt max-size=10m --log-opt max-file=3 ...
```

#### 7. 备份数据库

```bash
# 每日备份脚本
#!/bin/bash
BACKUP_DIR="/backups/mysql"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
docker-compose exec -T mysql mysqldump -u root -p$MYSQL_ROOT_PASSWORD umxinli_db > $BACKUP_DIR/umxinli_db_$TIMESTAMP.sql
```

---

## 常见问题

### Q: 如何修改端口？

编辑 `docker-compose.yml`：

```yaml
services:
  backend:
    ports:
      - "8081:8080"  # 改为 8081
```

### Q: 如何增加内存？

编辑 `docker-compose.yml`：

```yaml
services:
  backend:
    environment:
      JAVA_OPTS: "-Xms1024m -Xmx2048m"
```

### Q: 如何查看数据库？

```bash
# 进入 MySQL 容器
docker-compose exec mysql mysql -u root -p

# 输入密码后执行
use umxinli_db;
show tables;
```

### Q: 如何重启服务？

```bash
# 重启后端服务
docker-compose restart backend

# 重启所有服务
docker-compose restart
```

### Q: 如何查看日志？

```bash
# 查看最后 100 行日志
docker-compose logs --tail=100 backend

# 实时查看日志
docker-compose logs -f backend

# 查看特定时间段的日志
docker-compose logs --since 2025-01-01 backend
```

---

## 性能优化建议

1. **数据库优化**
   - 为频繁查询的字段添加索引
   - 定期执行 `ANALYZE TABLE`

2. **缓存优化**
   - 增加 Ehcache 的堆大小
   - 调整缓存过期时间

3. **JVM 优化**
   - 根据服务器内存调整 `-Xms` 和 `-Xmx`
   - 使用 G1GC：`-XX:+UseG1GC`

4. **数据库连接池**
   - 调整 `maximum-pool-size` 和 `minimum-idle`

---

## 安全建议

1. 修改所有默认密码
2. 启用 HTTPS/SSL
3. 配置防火墙规则
4. 定期更新依赖库
5. 启用日志审计
6. 配置备份和恢复策略

---

## 支持

如有问题，请查看日志或联系开发团队。
