package com.umxinli.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/file")
@CrossOrigin
public class FileController {

    private static final Logger log = LoggerFactory.getLogger(FileController.class);

    @Value("${file.upload-dir:/upload/images}")
    private String uploadDir;

    // 静态资源目录（打包在jar中的图片）
    private static final String STATIC_IMAGES_PATH = "static/images/";

    /**
     * 获取图片文件
     * 优先从上传目录查找，如果不存在则从静态资源目录查找
     */
    @GetMapping("/image/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        log.info("Getting image: {}", filename);
        try {
            // 防止路径遍历攻击
            if (filename.contains("..") || filename.contains("/") || filename.contains("\\")) {
                log.warn("Invalid filename: {}", filename);
                return ResponseEntity.badRequest().build();
            }

            // 首先尝试从上传目录查找
            Path uploadFilePath = Paths.get(uploadDir, filename);
            File uploadFile = uploadFilePath.toFile();

            if (uploadFile.exists()) {
                log.info("Found image in upload directory: {}", filename);
                Resource resource = new FileSystemResource(uploadFile);
                String contentType = getContentType(filename);

                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filename + "\"")
                        .contentType(MediaType.parseMediaType(contentType))
                        .body(resource);
            }

            // 如果上传目录没有，尝试从静态资源目录查找
            try {
                ClassPathResource staticResource = new ClassPathResource(STATIC_IMAGES_PATH + filename);
                if (staticResource.exists()) {
                    log.info("Found image in static resources: {}", filename);
                    String contentType = getContentType(filename);

                    return ResponseEntity.ok()
                            .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filename + "\"")
                            .contentType(MediaType.parseMediaType(contentType))
                            .body(staticResource);
                }
            } catch (Exception e) {
                log.debug("Image not found in static resources: {}", filename);
            }

            log.warn("File not found: {}", filename);
            return ResponseEntity.notFound().build();

        } catch (Exception e) {
            log.error("Error getting image: {}", filename, e);
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * 上传图片文件
     */
    @PostMapping("/upload")
    public ResponseEntity<Map<String, Object>> uploadImage(@RequestParam("file") MultipartFile file) {
        log.info("Uploading file: {}", file.getOriginalFilename());
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            // 验证文件
            if (file.isEmpty()) {
                response.put("code", 400);
                response.put("msg", "File is empty");
                return ResponseEntity.badRequest().body(response);
            }

            // 验证文件类型
            String contentType = file.getContentType();
            if (!isValidImageType(contentType)) {
                response.put("code", 400);
                response.put("msg", "Invalid file type");
                return ResponseEntity.badRequest().body(response);
            }

            // 验证文件大小（最大 10MB）
            if (file.getSize() > 10 * 1024 * 1024) {
                response.put("code", 400);
                response.put("msg", "File size exceeds 10MB");
                return ResponseEntity.badRequest().body(response);
            }

            // 创建上传目录
            File uploadDirectory = new File(uploadDir);
            if (!uploadDirectory.exists()) {
                uploadDirectory.mkdirs();
            }

            // 生成唯一文件名
            String originalFilename = file.getOriginalFilename();
            String filename = System.currentTimeMillis() + "_" + originalFilename;
            Path filePath = Paths.get(uploadDir, filename);

            // 保存文件
            Files.write(filePath, file.getBytes());

            log.info("File uploaded successfully: {}", filename);

            response.put("code", 200);
            response.put("msg", "success");
            response.put("data", new HashMap<String, Object>() {{
                put("filename", filename);
                put("url", "/api/file/image/" + filename);
                put("size", file.getSize());
            }});

            return ResponseEntity.ok(response);

        } catch (IOException e) {
            log.error("Error uploading file", e);
            response.put("code", 500);
            response.put("msg", "Upload failed");
            return ResponseEntity.internalServerError().body(response);
        }
    }

    /**
     * 获取所有图片列表
     */
    @GetMapping("/images/list")
    public ResponseEntity<Map<String, Object>> listImages() {
        log.info("Listing all images");
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            File directory = new File(uploadDir);
            
            if (!directory.exists()) {
                response.put("code", 200);
                response.put("msg", "success");
                response.put("data", new ArrayList<>());
                return ResponseEntity.ok(response);
            }

            List<Map<String, Object>> images = new ArrayList<>();
            File[] files = directory.listFiles();

            if (files != null) {
                for (File file : files) {
                    if (file.isFile() && isImageFile(file.getName())) {
                        Map<String, Object> imageInfo = new HashMap<>();
                        imageInfo.put("filename", file.getName());
                        imageInfo.put("url", "/api/file/image/" + file.getName());
                        imageInfo.put("size", file.length());
                        imageInfo.put("lastModified", file.lastModified());
                        images.add(imageInfo);
                    }
                }
            }

            response.put("code", 200);
            response.put("msg", "success");
            response.put("data", images);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Error listing images", e);
            response.put("code", 500);
            response.put("msg", "Failed to list images");
            return ResponseEntity.internalServerError().body(response);
        }
    }

    /**
     * 删除图片文件
     */
    @DeleteMapping("/image/{filename}")
    public ResponseEntity<Map<String, Object>> deleteImage(@PathVariable String filename) {
        log.info("Deleting image: {}", filename);
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            // 防止路径遍历攻击
            if (filename.contains("..") || filename.contains("/") || filename.contains("\\")) {
                response.put("code", 400);
                response.put("msg", "Invalid filename");
                return ResponseEntity.badRequest().body(response);
            }

            Path filePath = Paths.get(uploadDir, filename);
            File file = filePath.toFile();

            if (!file.exists()) {
                response.put("code", 404);
                response.put("msg", "File not found");
                return ResponseEntity.status(404).body(response);
            }

            if (file.delete()) {
                log.info("File deleted successfully: {}", filename);
                response.put("code", 200);
                response.put("msg", "success");
                return ResponseEntity.ok(response);
            } else {
                response.put("code", 500);
                response.put("msg", "Failed to delete file");
                return ResponseEntity.internalServerError().body(response);
            }

        } catch (Exception e) {
            log.error("Error deleting image", e);
            response.put("code", 500);
            response.put("msg", "Error deleting file");
            return ResponseEntity.internalServerError().body(response);
        }
    }

    /**
     * 获取图片内容类型
     */
    private String getContentType(String filename) {
        String extension = filename.substring(filename.lastIndexOf(".")).toLowerCase();
        
        switch (extension) {
            case ".png":
                return "image/png";
            case ".jpg":
            case ".jpeg":
                return "image/jpeg";
            case ".gif":
                return "image/gif";
            case ".webp":
                return "image/webp";
            case ".svg":
                return "image/svg+xml";
            case ".bmp":
                return "image/bmp";
            case ".ico":
                return "image/x-icon";
            default:
                return "application/octet-stream";
        }
    }

    /**
     * 验证是否为有效的图片类型
     */
    private boolean isValidImageType(String contentType) {
        if (contentType == null) {
            return false;
        }
        
        return contentType.startsWith("image/");
    }

    /**
     * 检查是否为图片文件
     */
    private boolean isImageFile(String filename) {
        String extension = filename.substring(filename.lastIndexOf(".")).toLowerCase();
        
        return extension.matches("\\.(png|jpg|jpeg|gif|webp|svg|bmp|ico)$");
    }
}
