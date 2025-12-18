$response = Invoke-RestMethod -Uri "http://localhost:8080/api/admin/dict/types" -Method Get
Write-Host "=== 字典类型列表 ==="
$response.data | Select-Object id, code, name | Format-Table -AutoSize

Write-Host "`n=== 新增的字典类型 (id >= 8) ==="
$response.data | Where-Object { $_.id -ge 8 } | Select-Object id, code, name | Format-Table -AutoSize

