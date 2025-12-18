Write-Host "=== 测试字典类型 API ===" -ForegroundColor Green

try {
    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/admin/dict/types" -Method Get
    
    Write-Host "`n响应码: $($response.code)" -ForegroundColor Yellow
    Write-Host "消息: $($response.msg)" -ForegroundColor Yellow
    Write-Host "数据条数: $($response.data.Count)" -ForegroundColor Yellow
    
    Write-Host "`n=== 所有字典类型 ===" -ForegroundColor Cyan
    $response.data | Select-Object id, code, name | Format-Table -AutoSize
    
    Write-Host "`n=== 新增的字典类型 (id >= 8) ===" -ForegroundColor Cyan
    $response.data | Where-Object { [int]$_.id -ge 8 } | Select-Object id, code, name | Format-Table -AutoSize
    
    if ($response.code -eq 0) {
        Write-Host "`n✅ API 返回 code=0，前端应该能正常显示！" -ForegroundColor Green
    } else {
        Write-Host "`n❌ API 返回 code=$($response.code)，前端期望 code=0" -ForegroundColor Red
    }
} catch {
    Write-Host "`n❌ 请求失败: $_" -ForegroundColor Red
}

