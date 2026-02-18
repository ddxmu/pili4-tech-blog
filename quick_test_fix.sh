#!/bin/bash

echo "🚀 快速测试修复状态..."
echo ""

echo "📋 当前配置状态:"
echo "1. permalink配置:"
grep "permalink" _config.yml
echo ""
echo "2. 首页文章链接格式:"
grep -n "href.*posts/" index.md | grep -v "tag" | head -3
echo ""
echo "3. 文章front matter:"
head -5 posts/2026-02-18-openclaw-api-security.md
echo ""
echo "4. 测试文章URL (使用pretty格式):"
echo "   安全指南: /posts/openclaw-api-security/"
echo "   多智能体: /posts/openclaw-multi-agent-architecture/"
echo "   完全指南: /posts/openclaw-complete-guide/"
echo "   健康检查: /posts/home-assistant-health-check/"
echo ""
echo "⏳ 等待构建开始..."
sleep 30
echo ""
echo "🔍 测试文章链接:"
test_urls=(
    "/posts/openclaw-api-security/"
    "/posts/openclaw-multi-agent-architecture/"
    "/posts/openclaw-complete-guide/"
    "/posts/home-assistant-health-check/"
)

for path in "${test_urls[@]}"; do
    url="https://ddxmu.github.io/pili4-tech-blog${path}"
    echo -n "测试: $path ... "
    status=$(curl -s -I "$url" | head -1 | awk '{print $2}')
    
    if [ "$status" = "200" ]; then
        echo "✅ 正常 (200)"
    elif [ "$status" = "404" ]; then
        echo "❌ 404错误"
        echo "   尝试: $url"
    elif [ "$status" = "301" ] || [ "$status" = "302" ]; then
        echo "🔄 重定向 ($status)"
        location=$(curl -s -I "$url" | grep -i "location:" | head -1)
        echo "   重定向到: $location"
    else
        echo "⚠️ 状态: $status"
    fi
done

echo ""
echo "🏠 测试首页:"
home_url="https://ddxmu.github.io/pili4-tech-blog/"
home_status=$(curl -s -I "$home_url" | head -1 | awk '{print $2}')
echo "首页状态: $home_status"

echo ""
echo "📊 修复总结:"
echo "✅ 1. 确认post.html布局文件存在"
echo "✅ 2. 使用permalink: pretty (默认配置)"
echo "✅ 3. 首页链接更新为pretty格式"
echo "✅ 4. 修复已推送"
echo "⏳ 5. 等待GitHub Pages构建完成"
echo ""
echo "💡 如果还是404:"
echo "   1. 清除浏览器缓存 (Ctrl+Shift+R)"
echo "   2. 使用隐身模式测试"
echo "   3. 等待2-3分钟构建完成"
echo "   4. 检查GitHub Actions构建状态"