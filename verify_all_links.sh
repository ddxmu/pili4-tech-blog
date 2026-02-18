#!/bin/bash

echo "🔍 完整验证所有文章链接..."
echo ""

echo "⏳ 等待GitHub Pages构建完成..."
echo "   构建通常需要1-2分钟，我们等待90秒..."
sleep 90
echo ""

echo "📋 测试所有文章链接状态:"
echo ""

# 测试所有文章链接
articles=(
    "openclaw-multi-agent-architecture.html"
    "openclaw-api-security.html"
    "openclaw-complete-guide.html"
    "home-assistant-health-check.html"
)

all_pass=true

for article in "${articles[@]}"; do
    url="https://ddxmu.github.io/pili4-tech-blog/posts/${article}"
    echo -n "测试: ${article} ... "
    
    # 获取HTTP状态码
    status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    
    if [ "$status" = "200" ]; then
        echo "✅ 正常 (200)"
        # 检查页面是否有内容
        content_length=$(curl -s "$url" | wc -c)
        if [ "$content_length" -lt 100 ]; then
            echo "   ⚠️ 警告: 页面内容较少 (${content_length}字节)"
        else
            echo "   📄 内容长度: ${content_length}字节"
        fi
    elif [ "$status" = "404" ]; then
        echo "❌ 404错误 - 文章不存在"
        all_pass=false
    elif [ "$status" = "301" ] || [ "$status" = "302" ]; then
        echo "🔄 重定向 ($status)"
        location=$(curl -s -I "$url" | grep -i "location:" | head -1)
        echo "   重定向到: $location"
    else
        echo "⚠️ 异常状态: $status"
        all_pass=false
    fi
done

echo ""
echo "🏠 测试首页:"
home_url="https://ddxmu.github.io/pili4-tech-blog/"
home_status=$(curl -s -o /dev/null -w "%{http_code}" "$home_url")
echo "首页状态: $home_status"

if [ "$home_status" = "200" ]; then
    echo "✅ 首页正常"
    # 检查首页中的文章链接
    echo ""
    echo "🔗 检查首页中的文章链接数量:"
    link_count=$(curl -s "$home_url" | grep -c "href=\"/posts/")
    echo "   找到 $link_count 个文章链接"
    
    if [ "$link_count" -eq 4 ]; then
        echo "✅ 首页包含4个文章链接 (正确)"
    else
        echo "⚠️ 首页文章链接数量异常: $link_count (应该是4)"
    fi
fi

echo ""
echo "📊 验证结果:"
if $all_pass; then
    echo "🎉 所有测试通过！首页点击文章应该正常工作了！"
    echo ""
    echo "💡 测试步骤:"
    echo "   1. 访问: https://ddxmu.github.io/pili4-tech-blog/"
    echo "   2. 点击任意文章标题"
    echo "   3. 应该正常跳转到文章页面"
    echo "   4. 文章页面应该显示完整内容"
    echo "   5. 可以点击'返回首页'回到首页"
else
    echo "❌ 部分测试失败，需要进一步排查"
    echo ""
    echo "🔧 可能的问题:"
    echo "   1. GitHub Pages构建还未完成 (等待更久)"
    echo "   2. 浏览器缓存问题 (清除缓存)"
    echo "   3. 文章HTML文件有问题 (检查内容)"
    echo "   4. 链接路径错误 (检查首页HTML)"
fi

echo ""
echo "🕒 当前时间: $(date)"
echo "⏳ 如果还有问题，可能需要等待更长时间让构建完成"