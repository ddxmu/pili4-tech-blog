// 首页交互功能
document.addEventListener('DOMContentLoaded', function() {
    // 1. 文章过滤功能
    initArticleFilter();
    
    // 2. 滚动动画
    initScrollAnimations();
    
    // 3. 主题切换（如果需要）
    initThemeToggle();
    
    // 4. 阅读进度指示器
    initReadingProgress();
    
    // 5. 平滑滚动
    initSmoothScroll();
    
    // 6. 卡片悬停效果增强
    enhanceCardHover();
    
    // 7. 动态统计更新
    updateDynamicStats();
    
    // 8. 移动端菜单
    initMobileMenu();
});

// 文章过滤功能
function initArticleFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const articleCards = document.querySelectorAll('.article-card');
    
    if (!filterButtons.length || !articleCards.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 更新活动按钮
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            // 过滤文章
            articleCards.forEach(card => {
                if (filter === 'all' || card.dataset.categories.includes(filter)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// 滚动动画
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    document.querySelectorAll('.topic-card, .featured-article, .article-card').forEach(el => {
        observer.observe(el);
    });
}

// 主题切换
function initThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '🌙';
    themeToggle.title = '切换主题';
    
    themeToggle.addEventListener('click', function() {
        const isDark = document.body.classList.toggle('dark-theme');
        this.innerHTML = isDark ? '☀️' : '🌙';
        
        // 保存主题偏好
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
    
    // 检查保存的主题偏好
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '☀️';
    }
    
    // 添加到页面
    const header = document.querySelector('header') || document.body;
    header.appendChild(themeToggle);
}

// 阅读进度指示器
function initReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
        z-index: 9999;
        transition: width 0.1s;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrolled = (scrollTop / (docHeight - winHeight)) * 100;
        
        progressBar.style.width = scrolled + '%';
    });
}

// 平滑滚动
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 卡片悬停效果增强
function enhanceCardHover() {
    const cards = document.querySelectorAll('.topic-card, .featured-article, .article-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
}

// 动态统计更新
function updateDynamicStats() {
    // 更新阅读时间估计
    updateReadingTime();
    
    // 更新文章计数
    updateArticleCount();
    
    // 如果有API，可以更新实时数据
    // updateRealTimeStats();
}

function updateReadingTime() {
    const articles = document.querySelectorAll('.article-card');
    articles.forEach(article => {
        const excerpt = article.querySelector('.article-excerpt');
        if (excerpt) {
            const wordCount = excerpt.textContent.split(/\s+/).length;
            const readingTime = Math.ceil(wordCount / 200); // 假设200字/分钟
            
            const timeElement = article.querySelector('.meta-item:nth-child(2)');
            if (timeElement && timeElement.textContent.includes('分钟')) {
                timeElement.textContent = `⏱️ ${readingTime}分钟阅读`;
            }
        }
    });
}

function updateArticleCount() {
    const articleCount = document.querySelectorAll('.article-card').length;
    const countElements = document.querySelectorAll('.stat-number:first-child');
    
    countElements.forEach(el => {
        if (el.textContent === '4') { // 假设当前显示4篇
            el.textContent = articleCount;
        }
    });
}

// 移动端菜单
function initMobileMenu() {
    if (window.innerWidth > 768) return;
    
    const menuToggle = document.createElement('button');
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.innerHTML = '☰';
    menuToggle.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        background: var(--primary-color);
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: var(--shadow-lg);
    `;
    
    document.body.appendChild(menuToggle);
    
    const nav = document.querySelector('nav') || createMobileNav();
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('show');
        this.innerHTML = nav.classList.contains('show') ? '✕' : '☰';
    });
    
    function createMobileNav() {
        const nav = document.createElement('nav');
        nav.style.cssText = `
            position: fixed;
            top: 0;
            right: -300px;
            width: 300px;
            height: 100vh;
            background: white;
            box-shadow: var(--shadow-xl);
            z-index: 999;
            transition: right 0.3s ease;
            padding: 80px 20px 20px;
        `;
        
        nav.innerHTML = `
            <a href="/" style="display: block; padding: 10px; color: var(--secondary-color); text-decoration: none;">首页</a>
            <a href="/posts/" style="display: block; padding: 10px; color: var(--secondary-color); text-decoration: none;">所有文章</a>
            <a href="/about/" style="display: block; padding: 10px; color: var(--secondary-color); text-decoration: none;">关于</a>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid var(--gray-medium);">
                <div style="font-size: 0.9rem; color: var(--gray-dark); margin-bottom: 10px;">快速筛选:</div>
                <div class="mobile-filters" style="display: flex; flex-direction: column; gap: 10px;"></div>
            </div>
        `;
        
        document.body.appendChild(nav);
        return nav;
    }
}

// 工具函数：防抖
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 工具函数：节流
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 添加CSS动画类
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .dark-theme {
        --light-color: #2c3e50;
        --gray-light: #34495e;
        --gray-medium: #4a6572;
        --gray-dark: #bdc3c7;
        --dark-color: #ecf0f1;
        background: #1a252f;
        color: #ecf0f1;
    }
    
    .dark-theme .topic-card,
    .dark-theme .featured-article,
    .dark-theme .article-card,
    .dark-theme .author-card,
    .dark-theme .status-card {
        background: #2c3e50;
        color: #ecf0f1;
    }
    
    .dark-theme .article-excerpt,
    .dark-theme .author-bio,
    .dark-theme .status-label {
        color: #bdc3c7;
    }
    
    .mobile-menu-toggle {
        display: none;
    }
    
    @media (max-width: 768px) {
        .mobile-menu-toggle {
            display: block;
        }
        
        nav.show {
            right: 0 !important;
        }
    }
`;

document.head.appendChild(style);

// 性能监控
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const timing = performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            
            if (loadTime < 1000) {
                console.log('🚀 页面加载时间:', loadTime + 'ms', '- 优秀!');
            } else if (loadTime < 3000) {
                console.log('⚡ 页面加载时间:', loadTime + 'ms', '- 良好!');
            } else {
                console.log('🐢 页面加载时间:', loadTime + 'ms', '- 需要优化');
            }
        }, 0);
    });
}

// 错误监控
window.addEventListener('error', function(e) {
    console.error('❌ 页面错误:', e.error);
    // 在实际项目中，这里可以发送错误到监控服务
});

// 离线支持
window.addEventListener('online', function() {
    showNotification('✅ 网络已恢复', 'success');
});

window.addEventListener('offline', function() {
    showNotification('⚠️ 网络已断开，部分功能可能受限', 'warning');
});

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#27ae60' : '#f39c12'};
        color: white;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// 添加动画样式
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyle);