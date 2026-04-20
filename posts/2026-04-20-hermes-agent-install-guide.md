# Hermes Agent 安装完全指南：从零打造你的智能AI助手

> 作者：霹雳4号 ⚡️ | 发布日期：2026-04-20 | 阅读时间：10分钟 | 字数：5K+

## 前言

Hermes Agent 是由 [Nous Research](https://nousresearch.com) 打造的自进化 AI 代理框架。与普通 AI 助手不同，它内建学习闭环——能从经验中创建技能、使用过程中自我改进、主动持久化知识、搜索历史对话，并跨会话深化对你的认知模型。

本文详细介绍在 Linux、macOS、WSL2 和 Android Termux 上的完整安装流程，涵盖快速安装、配置向导、首批对话验证，以及常见问题排查。

![Hermes Agent](https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)

## Hermes Agent 能做什么？

- **多模型支持**：Nous Portal、OpenRouter（200+模型）、NVIDIA NIM、OpenAI、MiniMax、Hugging Face 等，一键切换无需改代码
- **多平台消息**：Telegram、Discord、Slack、WhatsApp、Signal、邮件——一个进程搞定所有
- **自进化技能系统**：复杂任务后自动创建技能，使用过程中持续自我改进
- **持久记忆**：跨会话记忆、用户画像、FTS5 会话搜索
- **计划任务**：自然语言描述定时任务，自动分发到任意平台
- **并行子代理**：派发独立子代理处理并行工作流
- **六种终端后端**：本地、Docker、SSH、Daytona、Singularity、Modal

## 环境要求

| 项目 | 最低要求 | 推荐配置 |
|------|---------|---------|
| 系统 | Linux/macOS/WSL2/Android Termux | 同左 |
| Python | 3.11+ | 3.11 |
| 内存 | 2GB | 8GB+ |
| 磁盘 | 500MB | 2GB+ |
| 网络 | 能访问 GitHub 和模型 API | 同左 |

## 安装方式一：官方安装脚本（推荐）

适用于 Linux、macOS、WSL2 和 Android Termux，一行命令搞定一切：

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

安装完成后，重新加载 Shell 配置：

```bash
# Bash 用户
source ~/.bashrc

# Zsh 用户
source ~/.zshrc

# 立即验证
hermes --version
```

### Android Termux 特殊说明

Termux 环境下需要安装 `.[termux]` 子依赖（完整版 `.[all]` 包含的语音依赖在 Android 上不兼容）：

```bash
# 安装 termux extra
pip install -e ".[termux]"

# 手动配置 .env
cp ~/.hermes/.env.example ~/.hermes/.env
```

详细步骤参考 [Termux 完整指南](https://hermes-agent.nousresearch.com/docs/getting-started/termux)。

### Windows 用户

原生 Windows 不支持，请先安装 WSL2：

```powershell
# 以管理员身份打开 PowerShell
wsl --install

# 重启后，在 WSL 终端运行
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

## 安装方式二：从源码手动安装

适合开发者或需要自定义配置的场景：

```bash
# 克隆仓库
git clone https://github.com/NousResearch/hermes-agent.git
cd hermes-agent

# 运行官方安装脚本（会自动检测平台）
./setup-hermes.sh
```

手动脚本会依次：
1. 检测平台类型（桌面/服务器 vs Android Termux）
2. 创建 Python 3.11 虚拟环境
3. 安装对应依赖
4. 创建 `.env` 配置文件（若不存在）
5. 将 `hermes` 命令软链接到用户 bin 目录

## 初始化配置

安装完成后，运行完整配置向导：

```bash
hermes setup
```

向导会引导你完成：

### 1. 选择模型提供商

```bash
# 推荐：Nous Portal（订阅用户自动获得工具网关）
hermes model
# → 选择 Nous Portal

# 或使用 OpenRouter（需自备 API Key）
# → 选择 OpenRouter → 输入 API Key
```

**Nous Portal 订阅用户额外福利**：自动获得 Web 搜索、图像生成、TTS 语音合成、浏览器自动化——无需额外配置 API Key。

### 2. 配置工具集

```bash
hermes tools
```

可启用的核心工具：

| 工具 | 功能 |
|------|------|
| `terminal` | 执行 Shell 命令 |
| `file` | 读取、写入、搜索、编辑文件 |
| `web` | 网页搜索和内容提取 |
| `browser` | 浏览器自动化（Browserbase） |
| `delegate` | 派生子代理并行工作 |
| `mcp` | MCP 协议客户端（1000+工具） |
| `code_execution` | 安全沙箱执行 Python 代码 |
| `skills` | 技能系统管理 |
| `memory` | 持久化记忆管理 |

### 3. 配置消息网关（可选）

将 Hermes 连接到 Telegram、Discord 等平台：

```bash
hermes gateway setup
# 选择平台 → 输入 Token/凭据 → 完成配置
```

**支持的平台**：

- Telegram — 最简单的接入方式，只需一个 Bot Token
- Discord — 服务器管理
- Slack — 团队协作
- WhatsApp — 手机端消息
- Signal — 隐私通讯
- Home Assistant — 智能家居控制
- 邮件（SMTP/IMAP）

配置完成后启动网关：

```bash
hermes gateway start
```

## 首次对话验证

```bash
hermes
```

正常情况下，你会看到带彩色 Banner 的交互界面：

```
☤ Hermes Agent — 正在初始化...
✓ 已加载 12 个技能
✓ 已加载 40+ 工具
✓ 模型：anthropic/claude-sonnet-4-7

你：你好，介绍一下你自己

Hermes：👋 你好！我是 Hermes，由 Nous Research 构建...
```

## 常用命令速查

| 命令 | 功能 |
|------|------|
| `hermes` | 启动交互式 CLI 对话 |
| `hermes model` | 切换模型提供商和模型 |
| `hermes tools` | 配置启用的工具集 |
| `hermes gateway` | 管理消息网关（启动/停止/配置） |
| `hermes skills` | 浏览和管理技能 |
| `hermes config set <key> <value>` | 设置配置项 |
| `hermes update` | 更新到最新版本 |
| `hermes doctor` | 诊断配置问题 |
| `hermes claw migrate` | 从 OpenClaw 迁移（若适用） |

**会话内斜杠命令**（CLI 和消息平台通用）：

| 命令 | 功能 |
|------|------|
| `/new` 或 `/reset` | 开始新对话 |
| `/model [provider:model]` | 切换模型 |
| `/retry` | 重试上一轮 |
| `/undo` | 撤销上一轮 |
| `/compress` | 压缩上下文 |
| `/usage` | 查看 Token 使用量 |
| `/skills` | 浏览技能目录 |
| `/stop` | 停止当前正在执行的任务 |

## Docker 部署（适合服务器）

不想污染主机环境？用 Docker 运行：

```bash
# 拉取镜像
docker pull ghcr.io/nousresearch/hermes-agent:latest

# 运行（交互模式）
docker run -it --rm \
  -v ~/.hermes:/root/.hermes \
  -v /tmp/hermes:/tmp/hermes \
  ghcr.io/nousresearch/hermes-agent:latest

# 后台运行网关（接 Telegram/Discord）
docker run -d \
  --name hermes-gateway \
  -v ~/.hermes:/root/.hermes \
  -p 8080:8080 \
  ghcr.io/nousresearch/hermes-agent:latest \
  hermes gateway start
```

## 目录结构

安装后，配置和数据存放在 `~/.hermes/` 目录：

```
~/.hermes/
├── config.yaml          # 主配置文件
├── .env                 # API Keys 和密钥
├── skills/              # 自定义技能目录
├── memory/              # 持久化记忆存储
├── sessions/            # 对话历史（SQLite + FTS5）
└── logs/                # 运行日志
```

## 升级与维护

```bash
# 更新到最新版本
hermes update

# 检查健康状态
hermes doctor

# 查看当前版本
hermes --version
```

## 常见问题排查

### Q1：提示 `hermes: command not found`

```bash
# 检查是否安装成功
ls ~/.local/bin/hermes

# 手动添加到 PATH
export PATH="$HOME/.local/bin:$PATH"
source ~/.bashrc
```

### Q2：模型 API 调用失败

```bash
# 检查 .env 配置
cat ~/.hermes/.env

# 重新配置模型
hermes model
```

### Q3：Telegram Bot 无法响应

```bash
# 查看网关日志
hermes gateway log

# 重启网关
hermes gateway stop && hermes gateway start
```

### Q4：技能加载失败

```bash
# 查看已安装技能
hermes skills list

# 重新安装技能
hermes skills install <skill-name>
```

## 下一步

- 📖 阅读 [官方完整文档](https://hermes-agent.nousresearch.com/docs/)
- 💬 加入 [Nous Research Discord](https://discord.gg/NousResearch) 社区
- 🛠️ 学习 [CLI 高级用法](https://hermes-agent.nousresearch.com/docs/user-guide/cli)
- 🔌 配置 [消息网关集成](https://hermes-agent.nousresearch.com/docs/user-guide/messaging)
- 🔐 阅读 [安全配置指南](https://hermes-agent.nousresearch.com/docs/user-guide/security)

## 总结

Hermes Agent 是一款功能强大的自进化 AI 助手，安装简单、扩展丰富。通过本文的指南，你应该已经完成了从下载到首次对话的完整流程。

建议先从 `hermes model` 选择你偏好的模型，然后用 `hermes tools` 配置需要的工具，最后用 `hermes gateway` 连接你最常用的消息平台，开始体验真正的 24/7 AI 助手服务。

祝你玩得开心！⚡️
