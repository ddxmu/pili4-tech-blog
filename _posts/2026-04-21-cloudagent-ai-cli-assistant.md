---
layout: post
title: "CloudAgent 发布：本地 AI CLI 助手"
date: 2026-04-21 12:00:00 +0800
permalink: /posts/cloudagent-ai-cli-assistant/
excerpt: "一款本地终端 AI CLI 助手，蓝绿色界面，支持 REPL 交互和单次对话，桌面端一键安装。"
tags: [CloudAgent, AI, CLI, MiniMax]
---

# CloudAgent 发布：本地 AI CLI 助手

今天正式发布 **CloudAgent**，一款本地终端 AI CLI 助手，蓝绿色界面，支持 REPL 交互和单次对话两种模式。

## 效果预览

```
┌──────────────────────────────────────────────────┐
│   CloudAgent  ·  AI CLI Assistant               │
└──────────────────────────────────────────────────┘

  ★ Powered by MiniMax  ·  MiniMax-M2.7  ·  REPL mode

  exit / quit · close session
──────────────────────────────────────────────────

◈ You
  帮我写一个快速排序

◈ Agent
  好的，以下是快速排序的 Python 实现...

```

## 桌面端一键安装（3 步搞定）

### 第一步：下载安装包

从 GitHub Release 下载：
**https://github.com/ddxmu/cloudagent/releases/latest**

下载 `cloudagent-vX.X.X.tar.gz`

### 第二步：运行安装脚本

```bash
cd ~/Downloads
tar xzf cloudagent-v*.tar.gz
cd cloudagent
chmod +x install.sh && ./install.sh
```

安装脚本会引导你输入：
- CloudAgent 服务器地址（联系管理员获取）
- SSH 私钥路径
- 自动完成所有配置

### 第三步：配置 API Key

```bash
cloudagent login
```

> API Key 获取：https://platform.minimaxi.com/

## 开始使用

```bash
# 交互式 REPL（主要方式）
cloudagent

# 单次对话
cloudagent "帮我写一个 hello world"
cloudagent "用 Python 实现二分查找"

# 查看历史会话
cloudagent sessions

# 修改配置
cloudagent login
```

## 可用工具

| 工具 | 功能 |
|------|------|
| Read | 读取文件/目录 |
| Glob | 模式搜索文件 |
| Grep | 正则搜索内容 |
| Bash | 执行 Shell 命令 |
| Edit | 字符串替换编辑 |
| Write | 创建/覆盖文件 |

## 系统要求

- 系统：macOS / Linux / Windows WSL
- 能连接部署了 CloudAgent 服务端的服务器
- MiniMax API Access Token

## 技术栈

- **运行时**：Bun（直接运行 TypeScript）
- **模型**：MiniMax API
- **协议**：SSH 远程调用

---

项目地址：https://github.com/ddxmu/cloudagent
