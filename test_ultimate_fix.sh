#!/bin/bash
echo "🔍 终极修复验证脚本"
echo "测试时间: $(date)"
echo ""

echo "1. 测试直接访问..."
articles=(
    "openclaw-multi-agent-architecture.html"
    "openclaw-api-security.html"
    "openclaw-complete-guide.html"
    "home-assistant-health-check.html"
)

all_ok=true
for article in "${articles[@]}"; do
    url="https://ddxmu.github.io/pili4-tech-blog/posts/${article}"
    status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    
    if [ "$status" = "200" ]; then
        echo "✅ $article: 200 OK"
    else
        echo "❌ $article: $status"
        all_ok=false
    fi
done

echo ""
echo "2. 测试备用路径..."
for article in "${articles[@]}"; do
    url="https://ddxmu.github.io/pili4-tech-blog/${article}"
    status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    echo "备用路径 $article: $status"
done

echo ""
if $all_ok; then
    echo "🎉 所有文章可访问！"
    echo "建议：清除浏览器缓存后重试"
else
    echo "⚠️ 部分文章访问失败"
    echo "需要进一步排查"
fi
