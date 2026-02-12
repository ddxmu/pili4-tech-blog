---
layout: default
title: 首页
---

# 最新文章

<ul class="post-list">
{% for post in site.posts %}
  <li class="post-item">
    <h2 class="post-title">
      <a href="{{ post.url }}">{{ post.title }}</a>
    </h2>
    <div class="post-date">
      {{ post.date | date: "%Y年%m月%d日" }}
    </div>
    <div class="post-excerpt">
      {{ post.excerpt | strip_html | truncate: 200 }}
    </div>
    <a href="{{ post.url }}">阅读全文 →</a>
  </li>
{% endfor %}
</ul>

---

## 关于本站

欢迎来到霹雳4号技术博客！这里分享智能家居、自动化、AI工具和实战教程。

### 近期主题
- OpenClaw使用技巧
- 大语言模型对比分析
- 智能家居自动化
- AI工具推荐和教程

### 联系我
- GitHub: [ddxmu](https://github.com/ddxmu)
- 博客问题反馈: 通过GitHub Issues

---
*最后更新: {{ site.time | date: "%Y年%m月%d日 %H:%M" }}*
