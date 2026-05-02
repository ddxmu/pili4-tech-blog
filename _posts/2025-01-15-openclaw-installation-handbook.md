---
layout: post
title: "OpenClaw Installation Handbook — Windows / Linux / macOS"
date: 2025-01-15
categories: [AI Tools, Installation]
permalink: /pili4-tech-blog/posts/openclow-installation-handbook/
---

# OpenClaw Installation Handbook — Windows / Linux / macOS

OpenClaw is a self-hosted AI gateway that runs on your computer or server, connecting AI assistants through a browser console and chat software integrations. This guide covers Windows, Linux, and macOS installation, local model deployment, and third-party chat integrations.

**Official Node.js requirement:** Node 24 (recommended), or Node 22.14+. The install script usually handles Node automatically.

**Key first step after installation:** Run `openclaw onboard` to configure your model/API key and start the Gateway. For local models, use Ollama or LM Studio. For chat integrations, configure Channels like Telegram, Discord, or WhatsApp.

## Method 1: Windows — Native PowerShell (Recommended)

### Step 1: Open PowerShell

Search "PowerShell" in the Start Menu, right-click and select **"Run as Administrator"**.

### Step 2: Run Install Command

```powershell
> iwr -useb https://openclaw.ai/install.ps1 | iex
```

### Step 3: Onboarding

```powershell
> openclaw onboard --install-daemon
```

### Step 4: Check Status & Open Dashboard

```powershell
> openclaw gateway status
> openclaw dashboard
```

## Method 2: Windows — WSL2 (Full Linux Experience)

This method runs the CLI, Gateway, and full toolchain in a Linux environment for better stability.

### Step 1: Install WSL2 + Ubuntu

In **PowerShell (Admin)**:

```powershell
> wsl --install
> wsl --install -d Ubuntu-24.04
```

Restart if prompted.

### Step 2: Install OpenClaw Inside Ubuntu

All subsequent commands run inside the Ubuntu/WSL terminal (not Windows CMD):

```bash
$ curl -fsSL https://openclaw.ai/install.sh | bash
```

### Step 3: Onboarding & Dashboard

```bash
$ openclaw onboard --install-daemon
$ openclaw gateway status
$ openclaw dashboard
```

## Method 3: Windows — Node.js / npm (Manual)

For users already comfortable managing Node.js. Requires Node 22.14+ (Node 24 recommended).

### Step 1: Install Node.js

Using winget:

```powershell
> winget install OpenJS.NodeJS.LTS
> node -v
```

### Step 2: Install OpenClaw via npm

```powershell
> npm install -g openclaw@latest
> openclaw onboard --install-daemon
```

### Step 3: Verify

```powershell
> openclaw --version
> openclaw doctor
> openclaw gateway status
```

## Method 4: Windows — Docker / Container

Suitable for users who want environment isolation, server deployment, or want to avoid polluting the local Node environment.

### Step 1: Install Docker Desktop

Ensure Docker Desktop is installed and running:

```bash
$ docker --version
$ docker compose version
```

### Step 2: Clone & Run Docker Setup

The setup script must be run from the OpenClaw repository root. Windows users should run this inside WSL2:

```bash
$ git clone https://github.com/openclaw/openclaw.git
$ cd openclaw
$ ./scripts/docker/setup.sh
```

### Step 3: Open Dashboard

Default local address: **http://127.0.0.1:18789/**

To reprint the address:

```bash
$ docker compose run --rm openclaw-cli dashboard --no-open
```

## Method 5: Windows — Source Code (Developer)

For developers or those who want to modify OpenClaw's source. Requires Git, Node, and pnpm.

```bash
$ git clone https://github.com/openclaw/openclaw.git
$ cd openclaw
$ pnpm install
$ pnpm ui:build
$ pnpm build
$ pnpm link --global
$ openclaw onboard --install-daemon
```

> **Note:** The script-based installation is recommended for most users. Source installation offers more flexibility but is more prone to dependency and build issues.

## Method 6: Windows — Virtual Machine or Cloud Host (Local Models)

This method uses your actual Windows machine to run large language models.

### Step 1: Install Ollama

Download from: https://ollama.com/download/windows

After installation, look for the "Llama" icon in the system tray (bottom-right corner).

*Alternative download sources (if official site is slow):* https://www.dhzyw.com/archives/7910.html

### Step 2: Enable Cross-Device Access (Critical)

If you skip this step, your VM will not be able to connect to Ollama.

1. Search "Environment Variables" in the Windows search bar, click **"Edit system environment variables"**.
2. In the popup, click **"Environment Variables"** (bottom-right button).
3. Under **System Variables**, find and edit `Path`, then add:

```
http://host.docker.internal:11434
```

This allows containers or VMs to reach the Ollama instance running on the Windows host.

## Quick Reference Commands

| Command | Description |
|---|---|
| `openclaw onboard` | Interactive setup wizard |
| `openclaw gateway status` | Check if Gateway is running |
| `openclaw dashboard` | Open browser console |
| `openclaw doctor` | Diagnose configuration issues |
| `openclaw --version` | Show installed version |

## Reference Links

- OpenClaw Official Site: https://openclaw.ai/
- GitHub Repository: https://github.com/openclaw/openclaw
- Official Documentation: https://docs.openclaw.ai/
