// --- State Management ---
const state = {
    theme: localStorage.getItem('theme') || 'light',
    activeTab: 'overview',
    charts: {}
};

// --- Data Definitions ---
const data = {
    months: ['Jan 2020','Jul 2020','Jan 2021','Jul 2021','Jan 2022','Jul 2022','Jan 2023','Jul 2023','Jan 2024','Jul 2024','Jan 2025','Jul 2025'],
    regions: [
        {
            zip: '30097',
            city: 'Duluth',
            value: 607213,
            yoy: 6.0,
            sqft: 212,
            sqftPrev: 229,
            dom: 47,
            status: 'moderate',
            statusText: 'Somewhat Competitive',
            county: 'Gwinnett',
            color: '#3b82f6',
            bgColor: 'rgba(59,130,246,0.1)',
            trend: [420000, 435000, 460000, 510000, 560000, 590000, 580000, 575000, 570000, 585000, 595000, 607213],
            radar: [85, 70, 65, 75, 90],
            insight: 'The premium market in Gwinnett County. Steady YoY growth of 6% despite broader market shifts.'
        },
        {
            zip: '30024',
            city: 'Suwanee',
            value: 575458,
            yoy: -0.6,
            sqft: 220,
            sqftPrev: 230,
            dom: 38,
            status: 'competitive',
            statusText: 'Competitive',
            county: 'Gwinnett',
            color: '#10b981',
            bgColor: 'rgba(16,185,129,0.1)',
            trend: [400000, 415000, 440000, 490000, 540000, 575000, 580000, 585000, 582000, 580000, 578000, 575458],
            radar: [80, 75, 80, 70, 55],
            insight: 'High demand area with the fastest inventory turnover (38 days). Maintaining high price per sqft.'
        },
        {
            zip: '30058',
            city: 'Lithonia',
            value: 248457,
            yoy: -6.5,
            sqft: 132,
            sqftPrev: 139,
            dom: 76,
            status: 'moderate',
            statusText: 'Somewhat Competitive',
            county: 'DeKalb',
            color: '#f59e0b',
            bgColor: 'rgba(245,158,11,0.1)',
            trend: [180000, 190000, 210000, 245000, 275000, 280000, 272000, 268000, 265000, 258000, 252000, 248457],
            radar: [35, 45, 40, 45, 30],
            insight: 'Affordable entry point. Currently a buyer\'s market with significant price corrections and longer DOM.'
        }
    ]
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initCharts();
    setupEventListeners();
});

function initTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
    const btn = document.querySelector('.theme-toggle');
    btn.innerHTML = state.theme === 'dark' ? '☀️ Light' : '🌙 Dark';
}

function toggleTheme() {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', state.theme);
    initTheme();
    
    // Update chart colors if necessary
    Object.values(state.charts).forEach(chart => {
        chart.options.scales.x.grid.color = state.theme === 'dark' ? '#334155' : '#e2e8f0';
        if (chart.options.scales.y) chart.options.scales.y.grid.color = state.theme === 'dark' ? '#334155' : '#e2e8f0';
        chart.update();
    });
}

function initCharts() {
    const gridColor = state.theme === 'dark' ? '#334155' : '#e2e8f0';
    const textColor = state.theme === 'dark' ? '#94a3b8' : '#64748b';

    Chart.defaults.color = textColor;
    Chart.defaults.font.family = "'Outfit', sans-serif";

    // 1. Trend Chart
    state.charts.trend = new Chart(document.getElementById('trendChart'), {
        type: 'line',
        data: {
            labels: data.months,
            datasets: data.regions.map(r => ({
                label: `${r.zip} ${r.city}`,
                data: r.trend,
                borderColor: r.color,
                backgroundColor: r.bgColor,
                fill: true,
                tension: 0.4,
                borderWidth: 3,
                pointRadius: 4,
                pointHoverRadius: 6
            }))
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top', align: 'end' },
                tooltip: {
                    padding: 12,
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleFont: { size: 14, weight: 'bold' },
                    callbacks: {
                        label: ctx => ` ${ctx.dataset.label}: $${ctx.parsed.y.toLocaleString()}`
                    }
                }
            },
            scales: {
                y: {
                    ticks: { callback: v => '$' + (v / 1000) + 'K' },
                    grid: { color: gridColor }
                },
                x: { grid: { display: false } }
            }
        }
    });

    // 2. Sqft Comparison
    state.charts.sqft = new Chart(document.getElementById('sqftChart'), {
        type: 'bar',
        data: {
            labels: data.regions.map(r => r.city),
            datasets: [
                {
                    label: 'Current $/sqft',
                    data: data.regions.map(r => r.sqft),
                    backgroundColor: data.regions.map(r => r.color),
                    borderRadius: 8
                },
                {
                    label: 'Last Year $/sqft',
                    data: data.regions.map(r => r.sqftPrev),
                    backgroundColor: data.regions.map(r => r.color + '44'),
                    borderColor: data.regions.map(r => r.color),
                    borderWidth: 1,
                    borderDash: [5, 5],
                    borderRadius: 8
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { grid: { color: gridColor } },
                x: { grid: { display: false } }
            }
        }
    });

    // 3. YoY Change
    state.charts.yoy = new Chart(document.getElementById('yoyChart'), {
        type: 'bar',
        data: {
            labels: data.regions.map(r => r.city),
            datasets: [{
                data: data.regions.map(r => r.yoy),
                backgroundColor: data.regions.map(r => r.yoy >= 0 ? '#10b981' : '#ef4444'),
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { 
                    ticks: { callback: v => v + '%' },
                    grid: { color: gridColor } 
                },
                x: { grid: { display: false } }
            }
        }
    });

    // 4. Market Distribution Radar
    state.charts.radar = new Chart(document.getElementById('radarChart'), {
        type: 'radar',
        data: {
            labels: ['Value', 'Sqft Price', 'Speed', 'Stability', 'Growth'],
            datasets: data.regions.map(r => ({
                label: r.city,
                data: r.radar,
                borderColor: r.color,
                backgroundColor: r.color + '22',
                borderWidth: 2,
                pointBackgroundColor: r.color
            }))
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: { color: gridColor },
                    grid: { color: gridColor },
                    pointLabels: { font: { size: 12 } },
                    ticks: { display: false },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            }
        }
    });
}

function setupEventListeners() {
    // Tab switching
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            switchView(tab.dataset.tab);
        });
    });
}

function switchView(view) {
    state.activeTab = view;
    
    // Update active tab button
    document.querySelectorAll('.nav-tab').forEach(t => {
        t.classList.toggle('active', t.dataset.tab === view);
    });

    // Toggle view sections
    document.querySelectorAll('.view-section').forEach(section => {
        section.classList.remove('active');
        // Small delay to allow display: none to trigger before opacity transition
        setTimeout(() => {
            if (section.id === `${view}-view`) {
                section.classList.add('active');
            }
        }, 10);
    });

    // Scroll to top when switching
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
