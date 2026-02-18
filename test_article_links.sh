#!/bin/bash

echo "🔍 测试文章链接修复状态..."
echo ""

# 等待构建开始
echo "⏳ 等待30秒让GitHub Pages构建开始..."
sleep 30

# 测试所有文章链接
echo "📋 测试所有文章链接:"
echo ""

articles=(
    "2026/02/18/openclaw-multi-agent-architecture.html"
    "2026/02/18/openclaw-api-security.html" 
    "2026/02/12/openclaw-complete-guide.html"
    "2026/02/12/home-assistant-health-check.html"
)

for article in "${articles[@]}"; do
    url="https://ddxmu.github.io/pili4-tech-blog/${article}"
    echo -n "测试: ${article} ... "
    
    status=$(curl -s -I "$url" | head -1 | awk '{print $2}')
    
    if [ "$status" = "200" ]; then
        echo "✅ 正常 (200)"
    elif [ "$status" = "404" ]; then
        echo "❌ 404错误"
        echo "   尝试访问: $url"
    else
        echo "⚠️ 状态: $status"
    fi
done

echo ""
echo "🏠 测试首页:"
home_status=$(curl -s -I "https://ddxmu.github.io/pili4-tech-blog/" | head -1 | awk '{print $2}')
echo "首页状态: $home_status"

echo ""
echo "📊 修复总结:"
echo "1. 已修复Jekyll配置冲突 (移除重复permalink配置)"
echo "2. 已修复首页文章链接格式"
echo "3. 已推送修复到GitHub"
echo "4. 等待GitHub Pages构建完成"
echo ""
echo "⏳ 构建通常需要1-2分钟..."
echo "   如果还是404，可能需要等待更久或清除浏览器缓存"