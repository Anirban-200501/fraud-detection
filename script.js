// ========================================
// Initialize on DOM Load
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initGSAPAnimations();
    initCounters();
    initCharts();
    initTransactionsTable();
    initOTPSimulation();
    initMiniCharts();
});

// ========================================
// Floating Particles Background
// ========================================
function initParticles() {
    const container = document.getElementById('particles-container');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        
        // Random colors
        const colors = ['#3b82f6', '#ff6b35', '#8b5cf6', '#10b981'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        container.appendChild(particle);
    }
}

// ========================================
// GSAP Animations
// ========================================
function initGSAPAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero section animation
    const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    heroTimeline
        .from('.hero-badge', { opacity: 0, y: 30, duration: 0.6 })
        .from('.hero-text h1', { opacity: 0, y: 40, duration: 0.8 }, '-=0.3')
        .from('.hero-text p', { opacity: 0, y: 30, duration: 0.6 }, '-=0.4')
        .from('.stat-item', { 
            opacity: 0, 
            y: 30, 
            duration: 0.6, 
            stagger: 0.15 
        }, '-=0.3')
        .from('.ai-brain', { 
            opacity: 0, 
            scale: 0.8, 
            duration: 1 
        }, '-=0.8');
    
    // Overview cards animation
    gsap.from('.overview-card', {
        scrollTrigger: {
            trigger: '.overview-section',
            start: 'top 80%'
        },
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.1
    });
    
    // Chart cards animation
    gsap.from('.chart-card', {
        scrollTrigger: {
            trigger: '.analytics-section',
            start: 'top 80%'
        },
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.15
    });
    
    // Pipeline animation
    gsap.from('.pipeline-step', {
        scrollTrigger: {
            trigger: '.pipeline-section',
            start: 'top 80%'
        },
        opacity: 0,
        y: 30,
        duration: 0.5,
        stagger: 0.1
    });
    
    // Alert cards animation
    gsap.from('.alert-card', {
        scrollTrigger: {
            trigger: '.alerts-section',
            start: 'top 80%'
        },
        opacity: 0,
        x: -30,
        duration: 0.5,
        stagger: 0.1
    });
    
    // Table rows animation
    gsap.from('.transactions-table tbody tr', {
        scrollTrigger: {
            trigger: '.transactions-section',
            start: 'top 80%'
        },
        opacity: 0,
        x: -20,
        duration: 0.4,
        stagger: 0.05
    });
}

// ========================================
// Animated Counters
// ========================================
function initCounters() {
    const counters = document.querySelectorAll('[data-value]');
    
    counters.forEach(counter => {
        const target = parseFloat(counter.dataset.value);
        const duration = 2000;
        const startTime = Date.now();
        
        function updateCounter() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = target * easeProgress;
            
            if (Number.isInteger(target) && target > 100) {
                counter.textContent = Math.floor(current).toLocaleString();
            } else {
                counter.textContent = current.toFixed(1);
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        // Use Intersection Observer for visibility
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// ========================================
// Mini Sparkline Charts
// ========================================
function initMiniCharts() {
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false }
        },
        scales: {
            x: { display: false },
            y: { display: false }
        },
        elements: {
            point: { radius: 0 },
            line: { tension: 0.4, borderWidth: 2 }
        }
    };
    
    // Mini chart 1 - Transactions
    new Chart(document.getElementById('miniChart1'), {
        type: 'line',
        data: {
            labels: Array(12).fill(''),
            datasets: [{
                data: [30, 45, 35, 50, 40, 55, 45, 60, 50, 70, 55, 75],
                borderColor: '#3b82f6',
                fill: true,
                backgroundColor: 'rgba(59, 130, 246, 0.1)'
            }]
        },
        options: commonOptions
    });
    
    // Mini chart 2 - Fraud
    new Chart(document.getElementById('miniChart2'), {
        type: 'line',
        data: {
            labels: Array(12).fill(''),
            datasets: [{
                data: [20, 25, 30, 22, 28, 35, 30, 25, 32, 28, 22, 18],
                borderColor: '#ff6b35',
                fill: true,
                backgroundColor: 'rgba(255, 107, 53, 0.1)'
            }]
        },
        options: commonOptions
    });
    
    // Mini chart 3 - Blocked
    new Chart(document.getElementById('miniChart3'), {
        type: 'line',
        data: {
            labels: Array(12).fill(''),
            datasets: [{
                data: [10, 15, 12, 18, 25, 20, 28, 35, 30, 38, 42, 48],
                borderColor: '#10b981',
                fill: true,
                backgroundColor: 'rgba(16, 185, 129, 0.1)'
            }]
        },
        options: commonOptions
    });
}

// ========================================
// Main Charts
// ========================================
function initCharts() {
    // Transaction Monitoring Chart
    const transactionCtx = document.getElementById('transactionChart').getContext('2d');
    
    const transactionGradient = transactionCtx.createLinearGradient(0, 0, 0, 300);
    transactionGradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
    transactionGradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
    
    const suspiciousGradient = transactionCtx.createLinearGradient(0, 0, 0, 300);
    suspiciousGradient.addColorStop(0, 'rgba(255, 107, 53, 0.3)');
    suspiciousGradient.addColorStop(1, 'rgba(255, 107, 53, 0)');
    
    new Chart(transactionCtx, {
        type: 'line',
        data: {
            labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
            datasets: [
                {
                    label: 'Legitimate',
                    data: [2400, 1800, 1200, 1500, 3200, 4500, 5200, 4800, 5500, 4200, 3800, 3200],
                    borderColor: '#3b82f6',
                    backgroundColor: transactionGradient,
                    fill: true,
                    tension: 0.4,
                    borderWidth: 2
                },
                {
                    label: 'Suspicious',
                    data: [120, 80, 45, 60, 150, 220, 180, 200, 250, 180, 150, 130],
                    borderColor: '#ff6b35',
                    backgroundColor: suspiciousGradient,
                    fill: true,
                    tension: 0.4,
                    borderWidth: 2
                },
                {
                    label: 'Blocked',
                    data: [25, 15, 10, 12, 35, 48, 42, 45, 55, 38, 32, 28],
                    borderColor: '#ef4444',
                    backgroundColor: 'transparent',
                    fill: false,
                    tension: 0.4,
                    borderWidth: 2,
                    borderDash: [5, 5]
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(15, 22, 41, 0.9)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    titleColor: '#fff',
                    bodyColor: '#94a3b8',
                    padding: 12,
                    cornerRadius: 8
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    },
                    ticks: { color: '#64748b' }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    },
                    ticks: { color: '#64748b' }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
    
    // Fraud Types Donut Chart
    const fraudTypesCtx = document.getElementById('fraudTypesChart').getContext('2d');
    
    new Chart(fraudTypesCtx, {
        type: 'doughnut',
        data: {
            labels: ['Account Takeover', 'Phishing', 'SIM Swap', 'Synthetic ID'],
            datasets: [{
                data: [34, 28, 22, 16],
                backgroundColor: ['#ff6b35', '#3b82f6', '#10b981', '#8b5cf6'],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(15, 22, 41, 0.9)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    titleColor: '#fff',
                    bodyColor: '#94a3b8',
                    padding: 12,
                    cornerRadius: 8
                }
            }
        }
    });
    
    // Risk Timeline Chart
    const riskTimelineCtx = document.getElementById('riskTimelineChart').getContext('2d');
    
    new Chart(riskTimelineCtx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: 'High Risk',
                    data: [45, 52, 38, 65, 48, 32, 28],
                    backgroundColor: '#ef4444',
                    borderRadius: 4,
                    barPercentage: 0.6
                },
                {
                    label: 'Medium Risk',
                    data: [85, 92, 78, 105, 88, 62, 55],
                    backgroundColor: '#f59e0b',
                    borderRadius: 4,
                    barPercentage: 0.6
                },
                {
                    label: 'Low Risk',
                    data: [320, 380, 290, 420, 350, 180, 150],
                    backgroundColor: '#10b981',
                    borderRadius: 4,
                    barPercentage: 0.6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(15, 22, 41, 0.9)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    titleColor: '#fff',
                    bodyColor: '#94a3b8',
                    padding: 12,
                    cornerRadius: 8
                }
            },
            scales: {
                x: {
                    stacked: true,
                    grid: { display: false },
                    ticks: { color: '#64748b' }
                },
                y: {
                    stacked: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    },
                    ticks: { color: '#64748b' }
                }
            }
        }
    });
}

// ========================================
// Live Transactions Table
// ========================================
function initTransactionsTable() {
    const transactions = [
        { id: 'TXN847291', user: 'Rahul Sharma', avatar: 'Felix', amount: '₹45,000', type: 'UPI', risk: 78, status: 'review' },
        { id: 'TXN847290', user: 'Priya Patel', avatar: 'Aneka', amount: '₹12,500', type: 'NEFT', risk: 23, status: 'approved' },
        { id: 'TXN847289', user: 'Amit Kumar', avatar: 'Max', amount: '₹89,000', type: 'UPI', risk: 92, status: 'blocked' },
        { id: 'TXN847288', user: 'Sneha Gupta', avatar: 'Lily', amount: '₹5,200', type: 'IMPS', risk: 15, status: 'approved' },
        { id: 'TXN847287', user: 'Vikram Singh', avatar: 'Jack', amount: '₹1,50,000', type: 'RTGS', risk: 65, status: 'pending' },
        { id: 'TXN847286', user: 'Neha Reddy', avatar: 'Sophie', amount: '₹28,000', type: 'UPI', risk: 45, status: 'review' }
    ];
    
    const tbody = document.getElementById('transactionsBody');
    
    transactions.forEach((tx, index) => {
        const riskClass = tx.risk < 30 ? 'low' : tx.risk < 50 ? 'medium' : tx.risk < 75 ? 'high' : 'critical';
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><span class="tx-id">${tx.id}</span></td>
            <td>
                <div class="tx-user">
                    <img src="[api.dicebear.com](https://api.dicebear.com/7.x/avataaars/svg?seed=${tx.avatar})" alt="${tx.user}">
                    <span>${tx.user}</span>
                </div>
            </td>
            <td><span class="tx-amount">${tx.amount}</span></td>
            <td><span class="tx-type">${tx.type}</span></td>
            <td>
                <div class="risk-score">
                    <div class="risk-bar">
                        <div class="risk-fill ${riskClass}" style="width: ${tx.risk}%"></div>
                    </div>
                    <span class="risk-value">${tx.risk}</span>
                </div>
            </td>
            <td><span class="status-badge ${tx.status}">${tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}</span></td>
            <td><button class="tx-action-btn"><i class="fas fa-eye"></i></button></td>
        `;
        
        tbody.appendChild(row);
    });
    
    // Simulate live updates
    setInterval(() => {
        const rows = tbody.querySelectorAll('tr');
        if (rows.length > 0) {
            const randomRow = rows[Math.floor(Math.random() * rows.length)];
            randomRow.style.background = 'rgba(59, 130, 246, 0.1)';
            setTimeout(() => {
                randomRow.style.background = '';
            }, 500);
        }
    }, 3000);
}

// ========================================
// OTP Simulation
// ========================================
function initOTPSimulation() {
    const otpDigits = document.querySelectorAll('.otp-digit');
    const verifyBtn = document.getElementById('verifyOtpBtn');
    const timerEl = document.getElementById('otpTimer');
    
    let timeLeft = 120;
    
    // Timer countdown
    const timerInterval = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
        }
    }, 1000);
    
    // Simulate OTP entry
    let currentDigit = 0;
    const otp = '847291';
    
    function fillNextDigit() {
        if (currentDigit < 6) {
            otpDigits[currentDigit].value = otp[currentDigit];
            otpDigits[currentDigit].classList.add('filled');
            currentDigit++;
            
            if (currentDigit < 6) {
                setTimeout(fillNextDigit, 300 + Math.random() * 200);
            } else {
                // All digits filled - trigger verification
                setTimeout(() => {
                    verifyBtn.textContent = 'Verifying...';
                    
                    setTimeout(() => {
                        verifyBtn.textContent = '✓ Payment Successful';
                        verifyBtn.classList.add('success');
                        
                        // Reset after 3 seconds
                        setTimeout(() => {
                            currentDigit = 0;
                            otpDigits.forEach(digit => {
                                digit.value = '';
                                digit.classList.remove('filled');
                            });
                            verifyBtn.textContent = 'Verify & Pay';
                            verifyBtn.classList.remove('success');
                            
                            // Restart simulation
                            setTimeout(fillNextDigit, 2000);
                        }, 3000);
                    }, 1500);
                }, 500);
            }
        }
    }
    
    // Start simulation after a delay
    setTimeout(fillNextDigit, 2000);
    
    // Handle manual input
    otpDigits.forEach((digit, index) => {
        digit.addEventListener('input', (e) => {
            if (e.target.value.length === 1 && index < 5) {
                otpDigits[index + 1].focus();
            }
        });
        
        digit.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                otpDigits[index - 1].focus();
            }
        });
    });
}

// ========================================
// Risk Gauge Animation
// ========================================
function animateGauge() {
    const gaugeFill = document.querySelector('.gauge-fill');
    const gaugeDot = document.querySelector('.gauge-dot');
    
    if (gaugeFill && gaugeDot) {
        const riskValue = 23; // 0-100
        const strokeDasharray = 126;
        const strokeDashoffset = strokeDasharray - (strokeDasharray * riskValue / 100);
        
        gaugeFill.style.strokeDashoffset = strokeDashoffset;
        
        // Calculate dot position
        const angle = (riskValue / 100) * 180 - 180;
        const radians = angle * Math.PI / 180;
        const cx = 50 + 40 * Math.cos(radians);
        const cy = 50 + 40 * Math.sin(radians);
        
        gaugeDot.setAttribute('cx', cx);
        gaugeDot.setAttribute('cy', cy);
        
        // Color based on risk
        const color = riskValue < 30 ? '#10b981' : riskValue < 60 ? '#f59e0b' : '#ef4444';
        gaugeDot.style.fill = color;
    }
}

// Initialize gauge animation
setTimeout(animateGauge, 1000);

// ========================================
// Interactive Hover Effects
// ========================================
document.querySelectorAll('.overview-card, .chart-card, .alert-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        gsap.to(this, {
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    card.addEventListener('mouseleave', function() {
        gsap.to(this, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// ========================================
// Search Functionality
// ========================================
const searchInput = document.querySelector('.search-container input');

searchInput.addEventListener('focus', function() {
    gsap.to('.search-container', {
        width: 450,
        duration: 0.3,
        ease: 'power2.out'
    });
});

searchInput.addEventListener('blur', function() {
    gsap.to('.search-container', {
        width: 400,
        duration: 0.3,
        ease: 'power2.out'
    });
});

// ========================================
// Keyboard Shortcuts
// ========================================
document.addEventListener('keydown', (e) => {
    // Cmd/Ctrl + K for search
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }
});

// ========================================
// Filter Buttons
// ========================================
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Animate chart update
        gsap.fromTo('.chart-container canvas', 
            { opacity: 0.5 },
            { opacity: 1, duration: 0.5 }
        );
    });
});

// ========================================
// Alert Pulse Animation
// ========================================
function pulseAlerts() {
    const criticalAlerts = document.querySelectorAll('.alert-card.critical');
    
    criticalAlerts.forEach(alert => {
        gsap.to(alert, {
            boxShadow: '0 0 30px rgba(239, 68, 68, 0.4)',
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut'
        });
    });
}

pulseAlerts();

// ========================================
// Mobile Menu Toggle
// ========================================
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('open');
}

// Add SVG gradient for gauge (dynamically)
const svgNS = '[w3.org](http://www.w3.org/2000/svg)';
const gaugeContainer = document.querySelector('.risk-gauge svg');

if (gaugeContainer) {
    const defs = document.createElementNS(svgNS, 'defs');
    const gradient = document.createElementNS(svgNS, 'linearGradient');
    gradient.setAttribute('id', 'gaugeGradient');
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '100%');
    gradient.setAttribute('y2', '0%');
    
    const stop1 = document.createElementNS(svgNS, 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', '#10b981');
    
    const stop2 = document.createElementNS(svgNS, 'stop');
    stop2.setAttribute('offset', '50%');
    stop2.setAttribute('stop-color', '#f59e0b');
    
    const stop3 = document.createElementNS(svgNS, 'stop');
    stop3.setAttribute('offset', '100%');
    stop3.setAttribute('stop-color', '#ef4444');
    
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    gradient.appendChild(stop3);
    defs.appendChild(gradient);
    gaugeContainer.insertBefore(defs, gaugeContainer.firstChild);
}

// ========================================
// Real-time Data Simulation
// ========================================
setInterval(() => {
    // Simulate transaction counter updates
    const transactionCounter = document.querySelector('.overview-cards .overview-card:first-child .card-value');
    if (transactionCounter) {
        const currentValue = parseInt(transactionCounter.textContent.replace(/,/g, ''));
        const newValue = currentValue + Math.floor(Math.random() * 10);
        transactionCounter.textContent = newValue.toLocaleString();
    }
}, 5000);

// ========================================
// Smooth Scroll for Navigation
// ========================================
document.querySelectorAll('.sidebar-nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => item.classList.remove('active'));
        this.parentElement.classList.add('active');
    });
});
