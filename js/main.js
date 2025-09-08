// 初始化AOS动画库
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// 创建自定义粒子效果
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: ${['#00d4ff', '#ff006e', '#ffbe0b'][Math.floor(Math.random() * 3)]};
            border-radius: 50%;
            opacity: ${Math.random() * 0.5 + 0.3};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s linear infinite;
        `;
        
        particlesContainer.appendChild(particle);
    }
}

// 动态数字更新
function animateNumbers() {
    // 在线玩家：1200~4000，每秒随机±1~10
    let onlinePlayers = Math.floor(Math.random() * (4000 - 1200 + 1)) + 1200;
    const onlinePlayersEl = document.querySelector('[data-online="online-players"]');
    
    // 日交易量：7.36亿~89.51亿，每秒随机增加0.01亿~0.02亿
    let dailyTrading = (Math.random() * (89.51 - 7.36) + 7.36).toFixed(2);
    const dailyTradingEl = document.querySelector('[data-trading="daily-trading"]');
    
    // 下载量：200000~250000
    let downloadCount = Math.floor(Math.random() * (250000 - 200000 + 1)) + 200000;
    const downloadCountEl = document.querySelector('[data-downloads="download-count"]');
    
    // 初始显示
    if (onlinePlayersEl) onlinePlayersEl.textContent = onlinePlayers;
    if (dailyTradingEl) dailyTradingEl.textContent = dailyTrading;
    if (downloadCountEl) downloadCountEl.textContent = downloadCount.toLocaleString();
    
    // 每秒更新
    setInterval(() => {
        // 在线玩家随机±1~10
        onlinePlayers += Math.floor(Math.random() * 20) - 10;
        onlinePlayers = Math.max(1200, Math.min(4000, onlinePlayers));
        if (onlinePlayersEl) onlinePlayersEl.textContent = onlinePlayers;
        
        // 日交易量随机增加0.01~0.02亿
        const increment = (Math.random() * 0.01 + 0.01).toFixed(2);
        dailyTrading = (parseFloat(dailyTrading) + parseFloat(increment)).toFixed(2);
        dailyTrading = Math.min(89.51, parseFloat(dailyTrading)).toFixed(2);
        if (dailyTradingEl) dailyTradingEl.textContent = dailyTrading+'亿';
        
        // 下载量随机增加1~50
        // downloadCount += Math.floor(Math.random() * 50) + 1;
        // downloadCount = Math.min(250000, downloadCount);
        // if (downloadCountEl) downloadCountEl.textContent = downloadCount.toLocaleString();
    }, 2000);
}

// 股票图表动画
function initStockChart() {
    const canvas = document.getElementById('heroChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = 280;
    canvas.height = 200;
    
    // 生成模拟股票数据
    const generateData = () => {
        const data = [];
        let price = 100;
        for (let i = 0; i < 50; i++) {
            price += (Math.random() - 0.5) * 5;
            data.push(price);
        }
        return data;
    };
    
    const data = generateData();
    const maxPrice = Math.max(...data);
    const minPrice = Math.min(...data);
    const priceRange = maxPrice - minPrice;
    
    function drawChart() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 绘制网格
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.1)';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 10; i++) {
            const y = (i / 10) * canvas.height;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
        
        // 绘制K线
        ctx.strokeStyle = '#00d4ff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        data.forEach((price, index) => {
            const x = (index / (data.length - 1)) * canvas.width;
            const y = canvas.height - ((price - minPrice) / priceRange) * canvas.height;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // 绘制渐变填充
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, 'rgba(0, 212, 255, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 212, 255, 0.05)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        
        data.forEach((price, index) => {
            const x = (index / (data.length - 1)) * canvas.width;
            const y = canvas.height - ((price - minPrice) / priceRange) * canvas.height;
            ctx.lineTo(x, y);
        });
        
        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        ctx.fill();
    }
    
    drawChart();
    
    // 实时更新图表
    setInterval(() => {
        data.shift();
        const lastPrice = data[data.length - 1];
        const newPrice = lastPrice + (Math.random() - 0.5) * 3;
        data.push(newPrice);
        drawChart();
    }, 2000);
}

// 滚动视差效果
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// 导航栏滚动效果
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.9)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
        
        // 隐藏/显示导航栏
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// 平滑滚动
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 鼠标跟随效果
function initMouseFollow() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(0, 212, 255, 0.8), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // 鼠标悬停效果
    const hoverElements = document.querySelectorAll('a, button, .feature-card');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform += ' scale(1.5)';
            cursor.style.background = 'radial-gradient(circle, rgba(255, 190, 11, 0.9), transparent)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
            cursor.style.background = 'radial-gradient(circle, rgba(0, 212, 255, 0.8), transparent)';
        });
    });
}

// 加载动画（已禁用）
function initLoadingAnimation() {
    // 不再显示加载动画，页面直接加载
}

// 页面可见性API - 节能模式
function initVisibilityAPI() {
    let animationPaused = false;
    
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // 页面隐藏时暂停动画
            if (window.pJSDom && window.pJSDom[0]) {
                window.pJSDom[0].pJS.particles.move.enable = false;
                animationPaused = true;
            }
        } else {
            // 页面显示时恢复动画
            if (window.pJSDom && window.pJSDom[0] && animationPaused) {
                window.pJSDom[0].pJS.particles.move.enable = true;
                animationPaused = false;
            }
        }
    });
}

// 性能优化 - 节流函数
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

// 初始化所有功能
document.addEventListener('DOMContentLoaded', () => {
    initLoadingAnimation();
    
    // 延迟初始化以确保页面完全加载
    setTimeout(() => {
        createParticles();
        animateNumbers();
        initStockChart();
        initParallax();
        initNavbarScroll();
        initSmoothScroll();
        initMouseFollow();
        initVisibilityAPI();
    }, 100);
});

// 错误处理
window.addEventListener('error', (e) => {
    console.error('JavaScript错误:', e.error);
});

// 性能监控
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`页面加载完成，耗时: ${loadTime.toFixed(2)}ms`);
});