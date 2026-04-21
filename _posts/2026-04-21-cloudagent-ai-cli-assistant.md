---
layout: post
title: "CloudAgent 发布：本地 AI CLI 助手"
date: 2026-04-21 12:00:00 +0800
permalink: /posts/cloudagent-ai-cli-assistant/
excerpt: "一款运行在远程服务器上的 AI CLI 助手，本地终端直接调用，蓝绿色界面，支持 REPL 交互和单次对话两种模式。"
tags: [CloudAgent, AI, CLI, MiniMax]
---

# CloudAgent 发布：本地 AI CLI 助手

今天正式发布 **CloudAgent**，一款运行在远程服务器上的 AI CLI 助手。通过本地终端的 `cloudagent` 命令即可直接调用，蓝绿色系交互界面，支持 REPL 交互模式和单次对话模式。

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
  正在思考...

  ...
```

## 系统架构

```
┌─────────────┐    SSH      ┌──────────────────┐
│ 本地终端    │ ──────────► │ 远程服务器      │
│ cloudagent  │             │ 103.38.83.53    │
└─────────────┘             │ /opt/cloudagent │
                            │ Bun Runtime     │
                            └──────────────────┘
```

## 安装步骤

### 第一步：上传源码到服务器

从 GitHub Release 下载源码压缩包，上传到服务器：

```bash
scp cloudagent-v1.0.0.tar.gz root@103.38.83.53:/opt/
ssh root@103.38.83.53 "cd /opt && tar xzf cloudagent-v1.0.0.tar.gz"
```

### 第二步：安装本地 wrapper

在本地 Mac/Linux 终端执行：

```bash
# 保存 wrapper 脚本
sudo tee /usr/local/bin/cloudagent > /dev/null << 'WRAPPER'
#!/bin/bash
REMOTE_HOST="103.38.83.53"
REMOTE_USER="root"
REMOTE_KEY="$HOME/.ssh/id_rsa"
REMOTE_PATH="/opt/cloudagent"

if [ $# -eq 0 ]; then
  exec ssh -qtt -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null \
    "$REMOTE_USER@$REMOTE_HOST" \
    "source ~/.bashrc && cd $REMOTE_PATH && bun run --bun src/cli.ts"
else
  exec ssh -qt -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null \
    "$REMOTE_USER@$REMOTE_HOST" \
    "source ~/.bashrc && cd $REMOTE_PATH && bun run --bun src/cli.ts \$@"
fi
WRAPPER
sudo chmod +x /usr/local/bin/cloudagent
```

### 第三步：配置 API Key

```bash
cloudagent login
# 按提示输入：
# API URL: https://api.minimaxi.com/v1
# API Key: 你的 MiniMax API Key
# Model: MiniMax-M2.7
```

配置保存在远程服务器的 `~/.cloudagent/config.json`。

### 第四步：开始使用

```bash
# 交互式 REPL（主要方式）
cloudagent

# 单次对话
cloudagent "帮我写一个 hello world"

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

默认权限：Read/Glob/Grep/Bash/Edit/Write 无需确认即可使用。

## 技术细节

- **运行时**：Bun（直接运行 TypeScript，无需编译）
- **API**：MiniMax MCP 兼容接口 + OpenAI 兼容
- **会话管理**：自动保存对话历史到 `~/.cloudagent/sessions/`
- **权限控制**：基于 alwaysAllow/alwaysDeny 的白名单模式

## 下载地址

源码和安装包已发布在 GitHub Release：
**https://github.com/ddxmu/cloudagent/releases**

---

有问题欢迎留言交流！
