# 快速启动指南

## 最简单的方式：Docker Compose（推荐）

### 一键启动

1. **确保已安装 Docker 和 Docker Compose**
   - 下载 [Docker Desktop](https://www.docker.com/products/docker-desktop)
   - 安装后会自动包含 Docker Compose

2. **双击运行启动脚本**
   ```
   docker-compose-up.bat
   ```

3. **等待服务启动**
   - MySQL 数据库初始化需要 30-60 秒
   - 后端服务启动需要 10-20 秒

4. **验证服务**
   - 打开浏览器访问：http://localhost:8080/api/orderConsult/getCityList
   - 如果返回城市列表，说明成功！

5. **停止服务**
   ```
   docker-compose-down.bat
   ```

---

## 本地开发方式

### 前置条件

- Java 8+
- Maven 3.6+
- MySQL 8.0+

### 启动步骤

1. **启动 MySQL**
   ```bash
   # Windows 服务启动
   net start MySQL80
   
   # 或使用 MySQL 客户端连接
   mysql -u root -p
   ```

2. **初始化数据库**
   ```bash
   mysql -u root -p < sql/init.sql
   ```

3. **构建项目**
   ```bash
   build.bat
   ```

4. **运行应用**
   ```bash
   run.bat
   ```

5. **验证服务**
   - 打开浏览器访问：http://localhost:8080/api/orderConsult/getCityList

---

## 常用命令

### Docker Compose 命令

```bash
# 启动所有服务
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f backend
docker-compose logs -f mysql

# 停止服务
docker-compose down

# 完全清理（包括数据）
docker-compose down -v

# 重启服务
docker-compose restart
```

### 数据库操作

```bash
# 进入 MySQL 容器
docker-compose exec mysql mysql -u root -p

# 查看数据库
show databases;

# 选择数据库
use umxinli_db;

# 查看表
show tables;

# 查看教练数据
select * from counselor;
```

### 日志查看

```bash
# 查看最后 100 行
docker-compose logs --tail=100 backend

# 实时查看
docker-compose logs -f backend

# 查看特定服务
docker-compose logs mysql
```

---

## API 测试

### 使用 curl

```bash
# 获取城市列表
curl http://localhost:8080/api/orderConsult/getCityList

# 获取轮播图
curl http://localhost:8080/api/orderConsult/getCarousel

# 获取全局设置
curl http://localhost:8080/api/global/settings

# 筛选教练
curl -X POST http://localhost:8080/api/orderConsult/filter \
  -H "Content-Type: application/json" \
  -d '{"name":null,"shortcut":null,"filter":null,"pager":{"index":1,"size":7}}'
```

### 使用 Postman

1. 打开 Postman
2. 创建新请求
3. 选择 GET 或 POST
4. 输入 URL：`http://localhost:8080/api/orderConsult/getCityList`
5. 点击 Send

---

## 故障排除

### 问题 1：Docker 无法启动

**症状**：运行 `docker-compose-up.bat` 后没有反应

**解决方案**：
1. 确保 Docker Desktop 已启动
2. 检查 Docker 是否正常运行：`docker ps`
3. 查看错误日志：`docker-compose logs`

### 问题 2：端口被占用

**症状**：错误信息 "Address already in use"

**解决方案**：
1. 查看占用端口的进程：`netstat -ano | findstr :8080`
2. 修改 `docker-compose.yml` 中的端口
3. 或停止占用端口的应用

### 问题 3：数据库连接失败

**症状**：应用启动失败，日志显示数据库连接错误

**解决方案**：
1. 检查 MySQL 是否启动：`docker-compose ps`
2. 查看 MySQL 日志：`docker-compose logs mysql`
3. 检查数据库密码是否正确

### 问题 4：内存不足

**症状**：容器频繁重启或崩溃

**解决方案**：
1. 增加 Docker 内存分配
2. 修改 `docker-compose.yml` 中的 `JAVA_OPTS`
3. 增加 JVM 堆大小：`-Xms1024m -Xmx2048m`

---

## 下一步

- 查看 [README.md](README.md) 了解项目详情
- 查看 [DEPLOYMENT.md](DEPLOYMENT.md) 了解部署选项
- 查看 API 文档了解可用的 API 端点
- 开始开发新功能！

---

## 获取帮助

- 查看日志：`docker-compose logs -f`
- 检查服务状态：`docker-compose ps`
- 查看完整文档：[DEPLOYMENT.md](DEPLOYMENT.md)
