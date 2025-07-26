/**
 * GUI Design System - Optimized for 8" Tablet Portrait v1.0
 */

class GUIDesignSystem {
    constructor() {
        // Current state
        this.currentTheme = 'aurora';
        this.currentSection = 'dashboard';
        this.particlesEnabled = true;
        this.effectsEnabled = true;
        
        // Chart instances
        this.charts = {};
        
        // Initialize
        this.init();
    }

    init() {
        console.log('🎨 GUI Design System v1.0 initializing...');
        
        this.setupEventListeners();
        this.initializeCharts();
        this.createParticles();
        this.applyTheme(this.currentTheme);
        this.showSection(this.currentSection);
        
        console.log('✅ GUI Design System ready!');
    }

    setupEventListeners() {
        // Navigation items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const section = item.dataset.section;
                this.showSection(section);
                
                // Update active state
                document.querySelectorAll('.nav-item').forEach(nav => {
                    nav.classList.remove('active');
                });
                item.classList.add('active');
            });
        });

        // Theme buttons
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const theme = btn.dataset.theme;
                this.applyTheme(theme);
                
                // Update active state
                document.querySelectorAll('.theme-btn').forEach(themeBtn => {
                    themeBtn.classList.remove('active');
                });
                btn.classList.add('active');
            });
        });

        // Form interactions
        this.setupFormInteractions();

        // FAB menu
        this.setupFAB();

        // Range slider
        document.querySelectorAll('.form-range').forEach(range => {
            range.addEventListener('input', (e) => {
                const value = e.target.value;
                const valueDisplay = e.target.nextElementSibling;
                if (valueDisplay) {
                    valueDisplay.textContent = value + '%';
                }
            });
        });

        // Responsive sidebar
        this.setupResponsiveSidebar();
    }

    setupFormInteractions() {
        // Demo form submission
        const demoForm = document.querySelector('.demo-form');
        if (demoForm) {
            demoForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.showNotification('Form submitted successfully!', 'success');
                this.createFormAnimation(e.target);
            });
        }

        // Input focus effects
        document.querySelectorAll('.form-input, .form-select').forEach(input => {
            input.addEventListener('focus', (e) => {
                this.createFocusEffect(e.target);
            });
        });
    }

    setupFAB() {
        const fabMenu = document.getElementById('fabMenu');
        const fabContainer = document.querySelector('.fab-container');
        
        fabMenu.addEventListener('click', () => {
            fabContainer.classList.toggle('active');
            this.createFABAnimation();
        });

        // FAB options
        const fabOptions = document.querySelectorAll('.fab-option');
        
        fabOptions[0]?.addEventListener('click', () => {
            this.toggleEffects();
        });

        fabOptions[1]?.addEventListener('click', () => {
            this.changeLayout();
        });

        fabOptions[2]?.addEventListener('click', () => {
            this.exportTheme();
        });
    }

    setupResponsiveSidebar() {
        const sidebar = document.querySelector('.sidebar');
        let touchStartX = 0;
        let touchEndX = 0;

        // Touch events for mobile sidebar toggle
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });

        // Handle swipe
        this.handleSwipe = () => {
            if (touchEndX < touchStartX - 50) {
                // Swipe left - hide sidebar
                sidebar.style.width = '60px';
            } else if (touchEndX > touchStartX + 50) {
                // Swipe right - show sidebar
                sidebar.style.width = '180px';
            }
        };
    }

    showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });

        // Show selected section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionId;
            
            // Section-specific initialization
            if (sectionId === 'charts') {
                this.updateCharts();
            }
            
            this.createSectionTransition();
        }
    }

    applyTheme(theme) {
        const appContainer = document.querySelector('.app-container');
        appContainer.setAttribute('data-theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        
        // Update header info
        const themeInfo = document.querySelector('.info-item:last-child');
        if (themeInfo) {
            const themeNames = {
                aurora: 'Aurora',
                cyber: 'Cyber',
                ocean: 'Ocean',
                sunset: 'Sunset',
                forest: 'Forest',
                galaxy: 'Galaxy'
            };
            themeInfo.innerHTML = `<span class="info-item">🎭 ${themeNames[theme]} Theme</span>`;
        }
        
        // Create theme transition effect
        this.createThemeTransition();
    }

    initializeCharts() {
        // Performance Chart
        const performanceCanvas = document.getElementById('performanceChart');
        if (performanceCanvas) {
            const ctx = performanceCanvas.getContext('2d');
            this.createLineChart(ctx, 'performance');
        }

        // Analytics Chart
        const analyticsCanvas = document.getElementById('analyticsChart');
        if (analyticsCanvas) {
            const ctx = analyticsCanvas.getContext('2d');
            this.createBarChart(ctx, 'analytics');
        }

        // Distribution Chart
        const distributionCanvas = document.getElementById('distributionChart');
        if (distributionCanvas) {
            const ctx = distributionCanvas.getContext('2d');
            this.createPieChart(ctx, 'distribution');
        }
    }

    createLineChart(ctx, chartId) {
        const canvas = ctx.canvas;
        const width = canvas.width = canvas.offsetWidth;
        const height = canvas.height = canvas.offsetHeight;
        
        // Generate sample data
        const data = [];
        for (let i = 0; i < 12; i++) {
            data.push(Math.random() * 100);
        }
        
        // Draw chart
        ctx.clearRect(0, 0, width, height);
        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary');
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        data.forEach((value, index) => {
            const x = (width / (data.length - 1)) * index;
            const y = height - (value / 100) * height;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Add gradient fill
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, getComputedStyle(document.documentElement).getPropertyValue('--primary') + '40');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.fill();
        
        this.charts[chartId] = { data, type: 'line' };
    }

    createBarChart(ctx, chartId) {
        const canvas = ctx.canvas;
        const width = canvas.width = canvas.offsetWidth;
        const height = canvas.height = canvas.offsetHeight;
        
        // Generate sample data
        const data = [];
        for (let i = 0; i < 6; i++) {
            data.push(Math.random() * 100);
        }
        
        // Draw chart
        ctx.clearRect(0, 0, width, height);
        const barWidth = (width / data.length) * 0.8;
        const barSpacing = (width / data.length) * 0.2;
        
        data.forEach((value, index) => {
            const x = (barWidth + barSpacing) * index + barSpacing / 2;
            const barHeight = (value / 100) * (height - 20);
            const y = height - barHeight;
            
            // Create gradient
            const gradient = ctx.createLinearGradient(0, y, 0, height);
            gradient.addColorStop(0, getComputedStyle(document.documentElement).getPropertyValue('--primary'));
            gradient.addColorStop(1, getComputedStyle(document.documentElement).getPropertyValue('--secondary'));
            
            ctx.fillStyle = gradient;
            ctx.fillRect(x, y, barWidth, barHeight);
        });
        
        this.charts[chartId] = { data, type: 'bar' };
    }

    createPieChart(ctx, chartId) {
        const canvas = ctx.canvas;
        const width = canvas.width = canvas.offsetWidth;
        const height = canvas.height = canvas.offsetHeight;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 2 - 20;
        
        // Generate sample data
        const data = [30, 25, 20, 15, 10];
        const colors = ['--primary', '--secondary', '--accent', '--success', '--warning'];
        
        // Draw chart
        ctx.clearRect(0, 0, width, height);
        let currentAngle = -Math.PI / 2;
        
        data.forEach((value, index) => {
            const sliceAngle = (value / 100) * Math.PI * 2;
            
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            ctx.lineTo(centerX, centerY);
            ctx.closePath();
            
            ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue(colors[index]);
            ctx.fill();
            
            currentAngle += sliceAngle;
        });
        
        this.charts[chartId] = { data, type: 'pie' };
    }

    updateCharts() {
        // Animate chart updates
        Object.keys(this.charts).forEach(chartId => {
            const chart = this.charts[chartId];
            if (chart.type === 'line' || chart.type === 'bar') {
                // Update with new random data
                setTimeout(() => {
                    const canvas = document.getElementById(chartId + 'Chart');
                    if (canvas) {
                        const ctx = canvas.getContext('2d');
                        if (chart.type === 'line') {
                            this.createLineChart(ctx, chartId);
                        } else if (chart.type === 'bar') {
                            this.createBarChart(ctx, chartId);
                        }
                    }
                }, 100);
            }
        });
    }

    createParticles() {
        const container = document.getElementById('particleContainer');
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            container.appendChild(particle);
        }
    }

    createFocusEffect(element) {
        const rect = element.getBoundingClientRect();
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.background = getComputedStyle(document.documentElement).getPropertyValue('--primary');
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.left = rect.left + rect.width / 2 + 'px';
        ripple.style.top = rect.top + rect.height / 2 + 'px';
        ripple.style.opacity = '0.5';
        ripple.style.pointerEvents = 'none';
        ripple.style.transition = 'all 0.5s ease-out';
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.style.width = '100px';
            ripple.style.height = '100px';
            ripple.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
            ripple.remove();
        }, 500);
    }

    createFormAnimation(form) {
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach((input, index) => {
            setTimeout(() => {
                input.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    input.style.transform = 'scale(1)';
                }, 200);
            }, index * 50);
        });
    }

    createSectionTransition() {
        if (!this.effectsEnabled) return;
        
        const section = document.querySelector('.content-section.active');
        if (section) {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                section.style.transition = 'all 0.5s ease-out';
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 10);
        }
    }

    createThemeTransition() {
        if (!this.effectsEnabled) return;
        
        const elements = document.querySelectorAll('.stat-card, .data-card, .showcase-card');
        elements.forEach((element, index) => {
            element.style.transition = 'none';
            element.style.transform = 'scale(0.9)';
            element.style.opacity = '0';
            
            setTimeout(() => {
                element.style.transition = 'all 0.5s ease-out';
                element.style.transform = 'scale(1)';
                element.style.opacity = '1';
            }, index * 50);
        });
    }

    createFABAnimation() {
        const fab = document.querySelector('.fab');
        fab.style.transform = 'rotate(180deg) scale(1.1)';
        
        setTimeout(() => {
            fab.style.transform = 'rotate(360deg) scale(1)';
        }, 300);
    }

    toggleEffects() {
        this.effectsEnabled = !this.effectsEnabled;
        this.particlesEnabled = !this.particlesEnabled;
        
        const particleContainer = document.getElementById('particleContainer');
        particleContainer.style.display = this.particlesEnabled ? 'block' : 'none';
        
        this.showNotification(
            `Effects ${this.effectsEnabled ? 'enabled' : 'disabled'}`,
            this.effectsEnabled ? 'success' : 'info'
        );
    }

    changeLayout() {
        const contentArea = document.querySelector('.content-area');
        const currentPadding = window.getComputedStyle(contentArea).padding;
        
        if (currentPadding === '24px') {
            contentArea.style.padding = '12px';
            this.showNotification('Compact layout activated', 'info');
        } else {
            contentArea.style.padding = '24px';
            this.showNotification('Normal layout activated', 'info');
        }
    }

    exportTheme() {
        const theme = {
            name: this.currentTheme,
            colors: {
                primary: getComputedStyle(document.documentElement).getPropertyValue('--primary'),
                secondary: getComputedStyle(document.documentElement).getPropertyValue('--secondary'),
                accent: getComputedStyle(document.documentElement).getPropertyValue('--accent'),
                bgPrimary: getComputedStyle(document.documentElement).getPropertyValue('--bg-primary'),
                bgSecondary: getComputedStyle(document.documentElement).getPropertyValue('--bg-secondary'),
                bgTertiary: getComputedStyle(document.documentElement).getPropertyValue('--bg-tertiary')
            }
        };
        
        const blob = new Blob([JSON.stringify(theme, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `gui-theme-${this.currentTheme}.json`;
        a.click();
        
        this.showNotification('Theme exported successfully!', 'success');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            background: ${type === 'success' ? 'var(--success)' : 'var(--primary)'};
            color: white;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
            z-index: 2000;
            animation: slideIn 0.3s ease-out;
            cursor: pointer;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        notification.addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        });
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease-out';
                setTimeout(() => notification.remove(), 300);
            }
        }, 3000);
    }

    // Initialize demo data
    initializeDemoData() {
        // Update stats with random changes
        setInterval(() => {
            if (this.currentSection === 'dashboard') {
                const statValues = document.querySelectorAll('.stat-value');
                statValues.forEach(value => {
                    const currentValue = value.textContent;
                    if (currentValue.includes('$')) {
                        const num = parseInt(currentValue.replace(/[$,]/g, ''));
                        const change = Math.floor(Math.random() * 1000) - 500;
                        value.textContent = '$' + (num + change).toLocaleString();
                    } else if (currentValue.includes('%')) {
                        const num = parseFloat(currentValue);
                        const change = (Math.random() * 2 - 1).toFixed(1);
                        value.textContent = (num + parseFloat(change)).toFixed(1) + '%';
                    }
                });
            }
        }, 5000);
    }
}

// Create global animations
const style = document.createElement('style');
style.textContent = `
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
document.head.appendChild(style);

// Initialize application
let guiSystem;

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎨 GUI Design System - Optimized for 8" Tablet Portrait v1.0');
    guiSystem = new GUIDesignSystem();
    guiSystem.initializeDemoData();
});

// Export for debugging
window.GUIDesignSystem = GUIDesignSystem;