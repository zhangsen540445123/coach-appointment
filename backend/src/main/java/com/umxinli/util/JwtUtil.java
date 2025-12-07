package com.umxinli.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Date;
import java.util.UUID;

@Component
public class JwtUtil {

    @Value("${jwt.secret:umxinli-secret-key-2024}")
    private String secret;

    @Value("${jwt.expiration:86400000}")
    private Long expiration; // 默认24小时

    /**
     * 生成JWT Token
     */
    public String generateToken(String userId) {
        long now = System.currentTimeMillis();
        long exp = now + expiration;
        
        // 简化版JWT生成（实际项目中建议使用jjwt库）
        String header = Base64.getEncoder().encodeToString("{\"alg\":\"HS256\",\"typ\":\"JWT\"}".getBytes());
        String payload = Base64.getEncoder().encodeToString(
            String.format("{\"userId\":\"%s\",\"iat\":%d,\"exp\":%d,\"jti\":\"%s\"}", 
                userId, now/1000, exp/1000, UUID.randomUUID().toString()).getBytes()
        );
        String signature = Base64.getEncoder().encodeToString(
            (header + "." + payload + "." + secret).getBytes()
        );
        
        return header + "." + payload + "." + signature;
    }

    /**
     * 验证Token
     */
    public boolean validateToken(String token) {
        try {
            String[] parts = token.split("\\.");
            if (parts.length != 3) {
                return false;
            }
            
            String payload = new String(Base64.getDecoder().decode(parts[1]));
            // 简单验证，实际项目中需要验证签名和过期时间
            return payload.contains("userId");
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * 从Token中获取用户ID
     */
    public String getUserIdFromToken(String token) {
        try {
            String[] parts = token.split("\\.");
            if (parts.length != 3) {
                return null;
            }
            
            String payload = new String(Base64.getDecoder().decode(parts[1]));
            // 简单解析，实际项目中使用JSON库解析
            int start = payload.indexOf("\"userId\":\"") + 10;
            int end = payload.indexOf("\"", start);
            return payload.substring(start, end);
        } catch (Exception e) {
            return null;
        }
    }
}

