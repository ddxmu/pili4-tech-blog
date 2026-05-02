---
layout: post
title: "Hermes Agent Installation Guide — Windows (WSL2) & Linux"
date: 2025-01-15
categories: [AI Tools, Installation]
permalink: /pili4-tech-blog/posts/hermes-agent-installation/
---

# Hermes Agent Installation Guide — Windows (WSL2) & Linux

**Quick Summary:** Hermes Agent does not support native Windows. Windows users must first install WSL2/Ubuntu, then install Hermes inside the Ubuntu terminal. Linux users install directly in the terminal.

## 1. Pre-Installation Checklist

### Windows Requirements
- Windows 10 2004 or later, or Windows 11
- Ability to open PowerShell as Administrator

### Linux Requirements
- Terminal access (Ctrl+Alt+T on Ubuntu)
- Git and Curl pre-installed (recommended)

### Model / API Key
After installation you will need to select an AI provider: Nous Portal, OpenRouter, OpenAI, Anthropic, etc.

**Security Notice:** Your API Key is like a password — do not share screenshots or post it in public documents.

## 2. Windows Installation (via WSL2)

### Step 1: Install WSL2

Search PowerShell in the Start Menu, right-click and select **"Run as Administrator"**, then run:

```
> wsl --install
```

Restart your PC when prompted.

### Step 2: Open Ubuntu

Find Ubuntu in the Start Menu and launch it. On first launch you will create a username and password (password input is invisible — this is normal).

### Step 3: Install Git and Curl

```bash
$ sudo apt update
$ sudo apt install -y git curl
```

### Step 4: Install Hermes Agent

Run the official install command inside the Ubuntu terminal:

```bash
$ curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
```

**Do not close the window during installation.**

### Step 5: Refresh Terminal and Launch Setup

If you get "hermes: command not found", refresh the environment:

```bash
$ source ~/.bashrc
$ hermes setup
```

## 3. Linux Installation

### Step 1: Open Terminal

Press **Ctrl + Alt + T** on Ubuntu, or search "Terminal" in your app menu on other distros.

### Step 2: Install Git and Curl

Ubuntu/Debian:

```bash
$ sudo apt update
$ sudo apt install -y git curl
```

Other distros: use your package manager (dnf, pacman, etc.)

### Step 3: Run Official Install Script

```bash
$ curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
```

### Step 4: Select Model and Launch

```bash
$ source ~/.bashrc
$ hermes model
$ hermes --tui
```

## 4. Model / API Key Configuration

For beginners, interactive setup is recommended:

```bash
$ hermes setup
$ hermes model
```

- **Provider:** If unsure, choose Nous Portal or OpenRouter. If you already have an OpenAI or Anthropic account, use that provider.
- **API Key:** Copy from your provider's dashboard and paste into the terminal (characters may not display — just press Enter).
- **Model:** Official requirement is at least 64K context. Beginners can just use the wizard's recommended option.

**Success Criteria:** After running `hermes` or `hermes --tui`, you should receive a normal reply message.

## 5. Troubleshooting

| Problem | Solution |
|---|---|
| `hermes: command not found` | Run `source ~/.bashrc` or restart the terminal |
| API key not set | Run `hermes model` or `hermes setup` to re-enter |
| Command fails on Windows | Confirm you are inside Ubuntu/WSL terminal, NOT CMD or PowerShell |
| Something else broken | Run `hermes doctor` to check configuration |
| Want to reconfigure | Run `hermes setup` |

## 6. Reference Links

- Hermes Agent Official Site: https://hermes-agent.nousresearch.com/
- Installation Docs: https://hermes-agent.nousresearch.com/docs/getting-started/installation
- Quick Start: https://hermes-agent.nousresearch.com/docs/getting-started/quickstar
- Microsoft WSL Install: https://learn.microsoft.com/en-us/windows/wsl/install
