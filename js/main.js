// 初始化AOS动画库
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// 创建增强粒子背景
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;

    // 创建更高级的粒子效果
    const particleCount = 80;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 1;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${Math.random() > 0.5 ? '#00D4FF' : '#FFBE0B'};
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            animation: float ${duration}s ${delay}s infinite linear;
            box-shadow: 0 0 ${size * 2}px ${Math.random() > 0.5 ? '#00D4FF' : '#FFBE0B'};
            opacity: ${Math.random() * 0.5 + 0.3};
        `;
        
        particlesContainer.appendChild(particle);
        particles.push(particle);
    }

    // 添加连接线效果
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    document.body.appendChild(canvas);

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function drawConnections() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const p1 = particles[i];
                const p2 = particles[j];
                
                const x1 = parseFloat(p1.style.left);
                const y1 = parseFloat(p1.style.top);
                const x2 = parseFloat(p2.style.left);
                const y2 = parseFloat(p2.style.top);
                
                const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 212, 255, ${0.3 * (1 - distance / 150)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(drawConnections);
    }
    
    drawConnections();
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
    if (onlinePlayersEl) onlinePlayersEl.textContent = onlinePlayers.toLocaleString();
    if (dailyTradingEl) dailyTradingEl.textContent = dailyTrading + '亿';
    if (downloadCountEl) downloadCountEl.textContent = downloadCount.toLocaleString();
    
    // 每秒更新
    setInterval(() => {
        // 在线玩家随机±1~10
        onlinePlayers += Math.floor(Math.random() * 20) - 10;
        onlinePlayers = Math.max(1200, Math.min(4000, onlinePlayers));
        if (onlinePlayersEl) onlinePlayersEl.textContent = onlinePlayers.toLocaleString();
        
        // 日交易量随机增加0.01~0.02亿
        const increment = (Math.random() * 0.01 + 0.01).toFixed(2);
        dailyTrading = (parseFloat(dailyTrading) + parseFloat(increment)).toFixed(2);
        dailyTrading = Math.min(89.51, parseFloat(dailyTrading)).toFixed(2);
        if (dailyTradingEl) dailyTradingEl.textContent = dailyTrading + '亿';
        
        // 下载量随机增加1~50
        // downloadCount += Math.floor(Math.random() * 1) + 1;
        // downloadCount = Math.min(250000, downloadCount);
        // if (downloadCountEl) downloadCountEl.textContent = downloadCount.toLocaleString();
    }, 2000);
}

// 增强版股票图表动画
function initStockChart() {
    const canvas = document.getElementById('heroChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = 260;
    canvas.height = 110;
    
    // 生成K线数据 (开盘, 收盘, 最高, 最低)
    const generateKLineData = () => {
        const data = [];
        let basePrice = 100;
        
        for (let i = 0; i < 30; i++) {
            const volatility = 2 + Math.random() * 3;
            const trend = (Math.random() - 0.5) * 1;
            
            const open = basePrice + (Math.random() - 0.5) * 2;
            const close = open + (Math.random() - 0.5) * volatility + trend;
            const high = Math.max(open, close) + Math.random() * volatility;
            const low = Math.min(open, close) - Math.random() * volatility;
            
            data.push({
                open: Math.max(50, Math.min(150, open)),
                close: Math.max(50, Math.min(150, close)),
                high: Math.max(50, Math.min(150, high)),
                low: Math.max(50, Math.min(150, low))
            });
            
            basePrice = close;
        }
        return data;
    };
    
    let kLineData = generateKLineData();
    
    // 计算价格范围
    const allPrices = kLineData.flatMap(d => [d.high, d.low]);
    const maxPrice = Math.max(...allPrices);
    const minPrice = Math.min(...allPrices);
    const priceRange = maxPrice - minPrice;
    const padding = priceRange * 0.1;
    
    const chartTop = 5;
    const chartBottom = canvas.height - 5;
    const chartHeight = chartBottom - chartTop;
    
    function drawKLineChart() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 创建渐变背景
        const gradient = ctx.createLinearGradient(0, chartTop, 0, chartBottom);
        gradient.addColorStop(0, 'rgba(0, 212, 255, 0.05)');
        gradient.addColorStop(1, 'rgba(0, 212, 255, 0.01)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, chartTop, canvas.width, chartHeight);
        
        // 绘制网格背景
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.1)';
        ctx.lineWidth = 1;
        
        // 水平网格线
        for (let i = 0; i <= 5; i++) {
            const y = chartTop + (i / 5) * chartHeight;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
        
        // 垂直网格线
        for (let i = 0; i <= kLineData.length; i += 5) {
            const x = (i / (kLineData.length - 1)) * canvas.width;
            ctx.beginPath();
            ctx.moveTo(x, chartTop);
            ctx.lineTo(x, chartBottom);
            ctx.stroke();
        }
        
        // 绘制K线
        const candleWidth = Math.max(1, (canvas.width / kLineData.length) * 0.6);
        const candleSpacing = canvas.width / kLineData.length;
        
        kLineData.forEach((candle, index) => {
            const x = index * candleSpacing + candleSpacing / 2;
            
            // 将价格转换为y坐标
            const yHigh = chartBottom - ((candle.high - minPrice + padding) / (priceRange + 2 * padding)) * chartHeight;
            const yLow = chartBottom - ((candle.low - minPrice + padding) / (priceRange + 2 * padding)) * chartHeight;
            const yOpen = chartBottom - ((candle.open - minPrice + padding) / (priceRange + 2 * padding)) * chartHeight;
            const yClose = chartBottom - ((candle.close - minPrice + padding) / (priceRange + 2 * padding)) * chartHeight;
            
            // 判断涨跌
            const isRising = candle.close >= candle.open;
            const color = isRising ? '#00ff88' : '#ff006e';
            
            // 绘制上下影线
            ctx.strokeStyle = color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x, yHigh);
            ctx.lineTo(x, yLow);
            ctx.stroke();
            
            // 绘制实体
            const bodyTop = Math.min(yOpen, yClose);
            const bodyHeight = Math.abs(yOpen - yClose);
            
            // 添加渐变效果
            const bodyGradient = ctx.createLinearGradient(x - candleWidth/2, bodyTop, x + candleWidth/2, bodyTop + bodyHeight);
            if (isRising) {
                bodyGradient.addColorStop(0, '#00ff88');
                bodyGradient.addColorStop(1, '#00d9c5');
            } else {
                bodyGradient.addColorStop(0, '#ff006e');
                bodyGradient.addColorStop(1, '#ff4757');
            }
            
            ctx.fillStyle = bodyGradient;
            
            if (bodyHeight < 1) {
                // 如果实体太小，画一条线
                ctx.fillRect(x - candleWidth/2, bodyTop, candleWidth, 1);
            } else {
                ctx.fillRect(x - candleWidth/2, bodyTop, candleWidth, bodyHeight);
            }
            
            // 添加发光效果
            ctx.shadowColor = color;
            ctx.shadowBlur = 5;
            ctx.fillRect(x - candleWidth/2, bodyTop, candleWidth, bodyHeight);
            ctx.shadowBlur = 0;
        });
        
        // 绘制价格标签
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '10px Orbitron';
        ctx.textAlign = 'right';
        ctx.fillText(maxPrice.toFixed(1), canvas.width - 5, chartTop + 10);
        ctx.fillText(minPrice.toFixed(1), canvas.width - 5, chartBottom - 5);
    }
    
    drawKLineChart();
    
    // 实时更新图表 - 添加新K线
    setInterval(() => {
        // 移除最旧的K线
        kLineData.shift();
        
        // 添加新的K线
        const lastCandle = kLineData[kLineData.length - 1];
        const volatility = 2 + Math.random() * 3;
        const trend = (Math.random() - 0.5) * 1;
        
        const open = lastCandle.close + (Math.random() - 0.5) * 1;
        const close = open + (Math.random() - 0.5) * volatility + trend;
        const high = Math.max(open, close) + Math.random() * volatility;
        const low = Math.min(open, close) - Math.random() * volatility;
        
        kLineData.push({
            open: Math.max(50, Math.min(150, open)),
            close: Math.max(50, Math.min(150, close)),
            high: Math.max(50, Math.min(150, high)),
            low: Math.max(50, Math.min(150, low))
        });
        
        drawKLineChart();
    }, 2000); // 改为2秒更新一次，更流畅
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

// 移动端菜单功能
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!mobileMenuToggle || !navLinks) {
        console.log('移动端菜单元素未找到');
        return;
    }
    
    console.log('初始化移动端菜单');
    
    // 创建关闭按钮（如果不存在）
    let closeButton = navLinks.querySelector('.mobile-menu-close');
    if (!closeButton) {
        closeButton = document.createElement('div');
        closeButton.className = 'mobile-menu-close';
        closeButton.innerHTML = '<i class="fas fa-times"></i>';
        navLinks.appendChild(closeButton);
    }
    
    // 切换菜单
    function toggleMenu(e) {
        e.stopPropagation();
        console.log('切换菜单状态');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }
    
    // 确保事件监听器只添加一次
    mobileMenuToggle.removeEventListener('click', toggleMenu);
    closeButton.removeEventListener('click', toggleMenu);
    
    mobileMenuToggle.addEventListener('click', toggleMenu);
    closeButton.addEventListener('click', toggleMenu);
    
    // 点击菜单项后关闭菜单
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // 点击菜单外部关闭菜单
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// 初始化所有功能
document.addEventListener('DOMContentLoaded', () => {
    initLoadingAnimation();
    createParticles();
    animateNumbers();
    initStockChart();
    initParallax();
    initNavbarScroll();
    initSmoothScroll();
    initMouseFollow();
    initVisibilityAPI();
    initMobileMenu();
    initAdvancedInteractions(); // 添加高级交互动画
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

// 添加高级交互动画效果
function initAdvancedInteractions() {
    // 为所有按钮添加高级悬停效果
    const buttons = document.querySelectorAll('.cta-button, .download-button, .btn-buy, .btn-sell');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.boxShadow = '0 15px 40px rgba(0, 217, 197, 0.6)';
            this.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
        
        // 添加点击波纹效果
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // 为卡片添加3D悬停效果
    const cards = document.querySelectorAll('.feature-card, .gameplay-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateX(5deg)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0deg)';
        });
    });
    
    // 添加滚动视差增强效果
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.dataset.parallax) || 0.5;
            const direction = element.dataset.direction || 'vertical';
            
            if (direction === 'horizontal') {
                const xPos = scrolled * speed;
                element.style.transform = `translateX(${xPos}px)`;
            } else {
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            }
        });
    });
    
    // 添加数字滚动动画增强版
    const animatedNumbers = document.querySelectorAll('[data-animate-number]');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = parseInt(target.dataset.animateNumber);
                const duration = parseInt(target.dataset.duration) || 2000;
                
                animateNumber(target, 0, finalNumber, duration);
                numberObserver.unobserve(target);
            }
        });
    }, observerOptions);
    
    animatedNumbers.forEach(number => {
        numberObserver.observe(number);
    });
}

// 增强版数字动画
function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    const range = end - start;
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // 使用缓动函数
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + range * easeOutQuart);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}