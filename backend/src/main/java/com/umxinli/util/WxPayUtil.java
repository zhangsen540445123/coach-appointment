package com.umxinli.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.KeyManagerFactory;
import javax.net.ssl.SSLContext;
import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.security.KeyStore;
import java.security.MessageDigest;
import java.util.*;

/**
 * 微信支付工具类
 */
public class WxPayUtil {
    
    private static final Logger log = LoggerFactory.getLogger(WxPayUtil.class);
    
    /**
     * 生成随机字符串
     */
    public static String generateNonceStr() {
        return UUID.randomUUID().toString().replace("-", "");
    }
    
    /**
     * 生成商户订单号
     */
    public static String generateOutTradeNo() {
        return "PAY" + System.currentTimeMillis() + new Random().nextInt(1000);
    }
    
    /**
     * MD5签名
     */
    public static String signMD5(Map<String, String> params, String apiKey) {
        String stringA = createLinkString(params);
        String stringSignTemp = stringA + "&key=" + apiKey;
        return md5(stringSignTemp).toUpperCase();
    }
    
    /**
     * HMAC-SHA256签名
     */
    public static String signHMACSHA256(Map<String, String> params, String apiKey) throws Exception {
        String stringA = createLinkString(params);
        String stringSignTemp = stringA + "&key=" + apiKey;
        Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
        SecretKeySpec secret_key = new SecretKeySpec(apiKey.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
        sha256_HMAC.init(secret_key);
        byte[] array = sha256_HMAC.doFinal(stringSignTemp.getBytes(StandardCharsets.UTF_8));
        StringBuilder sb = new StringBuilder();
        for (byte item : array) {
            sb.append(Integer.toHexString((item & 0xFF) | 0x100).substring(1, 3));
        }
        return sb.toString().toUpperCase();
    }
    
    /**
     * 创建签名字符串
     */
    public static String createLinkString(Map<String, String> params) {
        List<String> keys = new ArrayList<>(params.keySet());
        Collections.sort(keys);
        StringBuilder sb = new StringBuilder();
        for (String key : keys) {
            String value = params.get(key);
            if (value != null && !value.isEmpty() && !"sign".equals(key)) {
                sb.append(key).append("=").append(value).append("&");
            }
        }
        if (sb.length() > 0) {
            sb.deleteCharAt(sb.length() - 1);
        }
        return sb.toString();
    }
    
    /**
     * MD5加密
     */
    public static String md5(String str) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] array = md.digest(str.getBytes(StandardCharsets.UTF_8));
            StringBuilder sb = new StringBuilder();
            for (byte b : array) {
                sb.append(Integer.toHexString((b & 0xFF) | 0x100).substring(1, 3));
            }
            return sb.toString();
        } catch (Exception e) {
            return "";
        }
    }
    
    /**
     * Map转XML
     */
    public static String mapToXml(Map<String, String> params) {
        StringBuilder sb = new StringBuilder("<xml>");
        for (Map.Entry<String, String> entry : params.entrySet()) {
            sb.append("<").append(entry.getKey()).append(">")
              .append("<![CDATA[").append(entry.getValue()).append("]]>")
              .append("</").append(entry.getKey()).append(">");
        }
        sb.append("</xml>");
        return sb.toString();
    }
    
    /**
     * XML转Map
     */
    public static Map<String, String> xmlToMap(String xml) {
        Map<String, String> map = new HashMap<>();
        try {
            // 简单的XML解析
            String content = xml.replace("<xml>", "").replace("</xml>", "");
            String[] items = content.split("</");
            for (String item : items) {
                if (item.contains("<")) {
                    int tagStart = item.lastIndexOf("<") + 1;
                    int tagEnd = item.indexOf(">");
                    if (tagStart > 0 && tagEnd > tagStart) {
                        String tag = item.substring(tagStart, tagEnd);
                        String value = item.substring(0, tagStart - 1)
                                .replace("<![CDATA[", "").replace("]]>", "").trim();
                        if (!tag.isEmpty()) {
                            map.put(tag, value);
                        }
                    }
                }
            }
        } catch (Exception e) {
            log.error("XML解析失败", e);
        }
        return map;
    }
    
    /**
     * 发送POST请求
     */
    public static String httpPost(String urlStr, String data) throws Exception {
        URL url = new URL(urlStr);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setDoOutput(true);
        conn.setDoInput(true);
        conn.setRequestProperty("Content-Type", "application/xml; charset=UTF-8");
        conn.setConnectTimeout(30000);
        conn.setReadTimeout(30000);

        try (OutputStream os = conn.getOutputStream()) {
            os.write(data.getBytes(StandardCharsets.UTF_8));
        }

        StringBuilder response = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(conn.getInputStream(), StandardCharsets.UTF_8))) {
            String line;
            while ((line = reader.readLine()) != null) {
                response.append(line);
            }
        }
        return response.toString();
    }

    /**
     * 发送带证书的POST请求（用于退款等需要双向证书的接口）
     * @param urlStr 请求URL
     * @param data 请求数据
     * @param certPath 证书路径（PKCS12格式，通常是.p12文件）
     * @param mchId 商户号（作为证书密码）
     * @return 响应内容
     */
    public static String postWithCert(String urlStr, String data, String certPath, String mchId) throws Exception {
        // 加载证书
        KeyStore keyStore = KeyStore.getInstance("PKCS12");
        try (FileInputStream fis = new FileInputStream(certPath)) {
            keyStore.load(fis, mchId.toCharArray());
        }

        // 初始化KeyManagerFactory
        KeyManagerFactory kmf = KeyManagerFactory.getInstance(KeyManagerFactory.getDefaultAlgorithm());
        kmf.init(keyStore, mchId.toCharArray());

        // 初始化SSLContext
        SSLContext sslContext = SSLContext.getInstance("TLS");
        sslContext.init(kmf.getKeyManagers(), null, new java.security.SecureRandom());

        // 发送请求
        URL url = new URL(urlStr);
        HttpsURLConnection conn = (HttpsURLConnection) url.openConnection();
        conn.setSSLSocketFactory(sslContext.getSocketFactory());
        conn.setRequestMethod("POST");
        conn.setDoOutput(true);
        conn.setDoInput(true);
        conn.setRequestProperty("Content-Type", "application/xml; charset=UTF-8");
        conn.setConnectTimeout(30000);
        conn.setReadTimeout(30000);

        try (OutputStream os = conn.getOutputStream()) {
            os.write(data.getBytes(StandardCharsets.UTF_8));
        }

        StringBuilder response = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(conn.getInputStream(), StandardCharsets.UTF_8))) {
            String line;
            while ((line = reader.readLine()) != null) {
                response.append(line);
            }
        }
        return response.toString();
    }
}

