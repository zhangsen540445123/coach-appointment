# Nginx Gateway Configuration

## 📁 目录结构

```
nginx-gate/
├── nginx.conf              # Nginx主配置文件
├── conf.d/                 # 站点配置目录
│   └── default.conf        # 默认站点配置（HTTPS + API代理）
├── ssl/                    # SSL证书目录
│   ├── cert.pem           # SSL证书文件
│   └── key.pem            # SSL私钥文件
├── logs/                   # 日志目录
│   └── .gitkeep           # 保持目录存在
└── README.md              # 本说明文件
```

## ⚙️ 配置说明

### 1. 主配置文件 (nginx.conf)

包含以下核心配置：
- **基础设置**: 工作进程、连接数、日志格式
- **性能优化**: Gzip压缩、缓存设置
- **安全配置**: 请求限制、上游服务器配置
- **模块加载**: 包含conf.d目录下的所有配置

### 2. 站点配置 (conf.d/default.conf)

#### HTTP 重定向
- 监听80端口
- 自动重定向所有HTTP请求到HTTPS

#### HTTPS 服务
- 监听443端口，启用SSL和HTTP/2
- SSL证书配置
- 安全头设置
- API代理配置

#### 关键功能
- **健康检查**: `/health` 端点
- **API代理**: `/api/*` 路由到后端服务
- **CORS支持**: 微信小程序跨域配置
- **速率限制**: API和登录端点限流
- **错误处理**: 自定义错误页面

### 3. SSL证书 (ssl/)

- `cert.pem`: SSL证书文件
- `key.pem`: SSL私钥文件

**安全注意事项**:
- 私钥文件权限应设置为600
- 证书文件权限应设置为644
- 定期检查证书过期时间

### 4. 日志目录 (logs/)

运行时nginx会在此目录生成：
- `access.log`: 访问日志
- `error.log`: 错误日志

## 🔧 配置特性

### 安全配置
- **SSL/TLS**: 支持TLS 1.2和1.3
- **安全头**: X-Frame-Options, X-XSS-Protection等
- **速率限制**: API调用和登录限制
- **CORS**: 微信小程序跨域支持

### 性能优化
- **Gzip压缩**: 文本内容压缩
- **连接复用**: Keep-alive连接
- **缓存设置**: SSL会话缓存
- **缓冲配置**: 代理缓冲优化

### 代理配置
- **负载均衡**: 上游服务器配置
- **健康检查**: 后端服务状态监控
- **超时设置**: 连接、发送、读取超时
- **头部转发**: 客户端信息传递

## 🚀 使用方法

### 1. 启动服务
```bash
docker-compose up -d
```

### 2. 访问服务
- **HTTPS**: https://localhost
- **API**: https://localhost/api
- **健康检查**: https://localhost/health

### 3. 查看日志
```bash
# 实时查看nginx日志
docker logs -f goal-manage-nginx-gateway

# 查看访问日志
tail -f nginx-gate/logs/access.log

# 查看错误日志
tail -f nginx-gate/logs/error.log
```

### 4. 重新加载配置
```bash
# 测试配置文件语法
docker exec goal-manage-nginx-gateway nginx -t

# 重新加载配置（无需重启）
docker exec goal-manage-nginx-gateway nginx -s reload

# 重启nginx容器
docker-compose restart goal-manage-nginx-gateway
```

## 🔍 故障排除

### 常见问题

1. **SSL证书错误**
   ```
   nginx: [emerg] cannot load certificate
   ```
   - 检查证书文件是否存在
   - 验证文件权限和路径

2. **配置语法错误**
   ```
   nginx: [emerg] unexpected "}" in /etc/nginx/conf.d/default.conf
   ```
   - 使用 `nginx -t` 测试配置
   - 检查括号和分号匹配

3. **代理连接失败**
   ```
   connect() failed (111: Connection refused)
   ```
   - 确认后端服务正在运行
   - 检查网络连接和端口

### 调试命令

```bash
# 检查nginx进程
docker exec goal-manage-nginx-gateway ps aux | grep nginx

# 查看监听端口
docker exec goal-manage-nginx-gateway netstat -tlnp

# 测试SSL证书
openssl s_client -connect localhost:443 -servername localhost

# 检查配置文件
docker exec goal-manage-nginx-gateway cat /etc/nginx/nginx.conf
```

## 📝 自定义配置

### 添加新站点
1. 在 `conf.d/` 目录创建新的 `.conf` 文件
2. 配置server块
3. 重新加载nginx配置

### 修改SSL设置
1. 更新 `default.conf` 中的SSL配置
2. 替换 `ssl/` 目录中的证书文件
3. 重新加载配置

### 调整性能参数
1. 修改 `nginx.conf` 中的worker设置
2. 调整缓冲区大小
3. 优化超时时间

## 🔗 相关文档

- [Nginx官方文档](https://nginx.org/en/docs/)
- [SSL配置指南](../SSL_SETUP.md)
- [Docker Compose配置](../docker-compose.yml)
- [项目主文档](../README.md)
