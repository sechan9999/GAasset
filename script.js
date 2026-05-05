// --- State Management ---
const state = {
    theme: localStorage.getItem('theme') || 'light',
    activeTab: 'overview',
    charts: {},
    map: null,
    lastUpdated: new Date().toLocaleDateString()
};

// --- Data Definition (Single Source of Truth - P0) ---
const marketData = {
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
            lat: 34.0029, lng: -84.1446,
            color: '#3b82f6',
            bgColor: 'rgba(59,130,246,0.1)',
            trend: [420000, 435000, 460000, 510000, 560000, 590000, 580000, 575000, 570000, 585000, 595000, 607213],
            radar: [85, 70, 65, 75, 90],
            insight: 'Premium market segment. High stability with 6% appreciation. Ideal for long-term investment equity.'
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
            lat: 34.0515, lng: -84.0713,
            color: '#10b981',
            bgColor: 'rgba(16,185,129,0.1)',
            trend: [400000, 415000, 440000, 490000, 540000, 575000, 580000, 585000, 582000, 580000, 578000, 575458],
            radar: [80, 75, 80, 70, 55],
            insight: 'High velocity market. Fast turnover (38 days) suggests strong buyer demand despite minor price corrections.'
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
            lat: 33.7121, lng: -84.1052,
            color: '#f59e0b',
            bgColor: 'rgba(245,158,11,0.1)',
            trend: [180000, 190000, 210000, 245000, 275000, 280000, 272000, 268000, 265000, 258000, 252000, 248457],
            radar: [35, 45, 40, 45, 30],
            insight: 'Value segment. Significant buyer leverage with 76 days on market. High yield potential for rental conversion.'
        },
        {
            zip: '30518',
            city: 'Sugar Hill',
            value: 485200,
            yoy: 4.5,
            sqft: 205,
            sqftPrev: 196,
            dom: 35,
            status: 'competitive',
            statusText: 'Competitive',
            county: 'Gwinnett',
            lat: 34.1032, lng: -84.0416,
            color: '#ec4899',
            bgColor: 'rgba(236, 72, 153, 0.1)',
            trend: [340000, 355000, 380000, 410000, 440000, 465000, 460000, 462000, 465000, 475000, 480000, 485200],
            radar: [65, 68, 75, 70, 72],
            insight: 'Strong growth corridor. Sugar Hill/Buford remains highly desirable with resilient demand and fast turnover.'
        }
    ]
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderDynamicContent();
    initCharts();
    initMap();
    setupEventListeners();
    updateMortgage();
});

// --- P0: Dynamic Rendering ---
function renderDynamicContent() {
    // 1. Render KPI Cards
    const kpiContainer = document.getElementById('kpi-container');
    kpiContainer.innerHTML = marketData.regions.map(r => `
        <div class="card kpi-card" style="border-left: 6px solid ${r.color}">
            <div class="kpi-zip">ZIP ${r.zip}</div>
            <div class="kpi-area">${r.city}, GA</div>
            <div class="kpi-value">$${r.value.toLocaleString()}</div>
            <div class="kpi-change ${r.yoy >= 0 ? 'change-up' : 'change-down'}">
                <span>${r.yoy >= 0 ? '▲' : '▼'}</span> ${Math.abs(r.yoy)}% YoY
            </div>
            <div class="kpi-stats">
                <div class="stat-item">
                    <span class="stat-label">$/sqft</span>
                    <span class="stat-value">$${r.sqft}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Days on Market</span>
                    <span class="stat-value">${r.dom} days</span>
                </div>
            </div>
        </div>
    `).join('');

    // 2. Render Comparison Table
    const tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Metric</th>
                    ${marketData.regions.map(r => `<th>${r.zip} (${r.city})</th>`).join('')}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Typical Home Value</td>
                    ${marketData.regions.map(r => `<td><strong>$${r.value.toLocaleString()}</strong></td>`).join('')}
                </tr>
                <tr>
                    <td>YoY Price Change</td>
                    ${marketData.regions.map(r => `<td class="${r.yoy >= 0 ? 'change-up' : 'change-down'}">${r.yoy >= 0 ? '+' : ''}${r.yoy}%</td>`).join('')}
                </tr>
                <tr>
                    <td>Price / sqft</td>
                    ${marketData.regions.map(r => `<td>$${r.sqft}</td>`).join('')}
                </tr>
                <tr>
                    <td>Market Velocity</td>
                    ${marketData.regions.map(r => `<td>${r.dom} days</td>`).join('')}
                </tr>
                <tr>
                    <td>County</td>
                    ${marketData.regions.map(r => `<td>${r.county}</td>`).join('')}
                </tr>
            </tbody>
        </table>
    `;

    // 3. Render Insights
    const insightsContainer = document.getElementById('insights-container');
    insightsContainer.innerHTML = marketData.regions.map(r => `
        <div class="insight-item">
            <span class="insight-title" style="color: ${r.color}">${r.city} (${r.zip})</span>
            <p>${r.insight}</p>
        </div>
    `).join('');

    // 4. Render Velocity Stats
    const velocityStats = document.getElementById('velocity-stats');
    velocityStats.innerHTML = marketData.regions.map(r => `
        <div style="text-align: center; color: ${r.color};">${r.dom}<br><span style="font-size: 0.8rem; color: var(--text-muted);">${r.city}</span></div>
    `).join('');

    document.getElementById('last-updated').innerText = state.lastUpdated;
}

// --- P2: Map Integration ---
function initMap() {
    if (state.map) return;
    
    state.map = L.map('map').setView([33.9, -84.1], 10);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(state.map);

    marketData.regions.forEach(r => {
        const marker = L.circleMarker([r.lat, r.lng], {
            radius: 12,
            fillColor: r.color,
            color: "#fff",
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(state.map);

        marker.bindPopup(`
            <div style="font-family: Outfit, sans-serif;">
                <b style="color: ${r.color}">${r.city} (${r.zip})</b><br>
                Value: $${r.value.toLocaleString()}<br>
                Growth: ${r.yoy}%
            </div>
        `);
    });
}

// --- P2: Mortgage Calculator ---
function updateMortgage() {
    const price = parseFloat(document.getElementById('calc-price').value);
    const downPct = parseFloat(document.getElementById('calc-down').value);
    const rate = parseFloat(document.getElementById('calc-rate').value) / 100 / 12;
    const term = parseInt(document.getElementById('calc-term').value) * 12;

    const downPayment = price * (downPct / 100);
    const loanAmount = price - downPayment;
    
    // Principal and Interest formula
    const pi = (loanAmount * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
    
    // Simple Tax and Insurance estimate (1.2% property tax + $1000 insurance per year)
    const monthlyTax = (price * 0.012) / 12;
    const monthlyIns = 1000 / 12;
    
    const total = pi + monthlyTax + monthlyIns;

    document.getElementById('calc-payment').innerText = `$${Math.round(total).toLocaleString()}`;
    document.getElementById('calc-pi').innerText = `$${Math.round(pi).toLocaleString()}`;
    document.getElementById('calc-ti').innerText = `$${Math.round(monthlyTax + monthlyIns).toLocaleString()}`;
}

// --- P1: Simulated Data Sync ---
async function syncData() {
    const btn = document.getElementById('refresh-btn');
    btn.innerText = '⌛ Syncing...';
    btn.disabled = true;

    // Simulate API Latency
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock subtle data changes
    marketData.regions.forEach(r => {
        const change = (Math.random() - 0.5) * 1000;
        r.value += Math.round(change);
        r.trend[r.trend.length - 1] = r.value;
    });

    state.lastUpdated = new Date().toLocaleDateString();
    renderDynamicContent();
    updateCharts();
    
    btn.innerText = '✅ Updated';
    setTimeout(() => {
        btn.innerText = '🔄 Sync Data';
        btn.disabled = false;
    }, 2000);
}

// --- Charts Initialization ---
function initCharts() {
    const gridColor = state.theme === 'dark' ? '#334155' : '#e2e8f0';
    const textColor = state.theme === 'dark' ? '#94a3b8' : '#64748b';

    Chart.defaults.color = textColor;
    Chart.defaults.font.family = "'Outfit', sans-serif";

    // 1. Trend Chart
    state.charts.trend = new Chart(document.getElementById('trendChart'), {
        type: 'line',
        data: {
            labels: marketData.months,
            datasets: marketData.regions.map(r => ({
                label: r.city,
                data: r.trend,
                borderColor: r.color,
                backgroundColor: r.color + '11',
                fill: true,
                tension: 0.4,
                borderWidth: 3,
                pointRadius: 4
            }))
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'top', align: 'end' } },
            scales: {
                y: { ticks: { callback: v => '$' + (v / 1000) + 'K' }, grid: { color: gridColor } },
                x: { grid: { display: false } }
            }
        }
    });

    // 2. Sqft Comparison
    state.charts.sqft = new Chart(document.getElementById('sqftChart'), {
        type: 'bar',
        data: {
            labels: marketData.regions.map(r => r.city),
            datasets: [
                {
                    label: 'Current $/sqft',
                    data: marketData.regions.map(r => r.sqft),
                    backgroundColor: marketData.regions.map(r => r.color),
                    borderRadius: 8
                },
                {
                    label: 'Last Year $/sqft',
                    data: marketData.regions.map(r => r.sqftPrev),
                    backgroundColor: marketData.regions.map(r => r.color + '44'),
                    borderRadius: 8
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
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
            labels: marketData.regions.map(r => r.city),
            datasets: [{
                label: 'YoY Growth %',
                data: marketData.regions.map(r => r.yoy),
                backgroundColor: marketData.regions.map(r => r.yoy >= 0 ? '#10b981' : '#ef4444'),
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { ticks: { callback: v => v + '%' }, grid: { color: gridColor } },
                x: { grid: { display: false } }
            }
        }
    });

    // 4. Radar Chart
    state.charts.radar = new Chart(document.getElementById('radarChart'), {
        type: 'radar',
        data: {
            labels: ['Value', 'Sqft Price', 'Speed', 'Stability', 'Growth'],
            datasets: marketData.regions.map(r => ({
                label: r.city,
                data: r.radar,
                borderColor: r.color,
                backgroundColor: r.color + '22',
                borderWidth: 2
            }))
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: { color: gridColor },
                    grid: { color: gridColor },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    ticks: { display: false }
                }
            }
        }
    });
}

function updateCharts() {
    state.charts.trend.data.datasets.forEach((ds, i) => {
        ds.data = marketData.regions[i].trend;
    });
    state.charts.trend.update();
    
    state.charts.yoy.data.datasets[0].data = marketData.regions.map(r => r.yoy);
    state.charts.yoy.update();
    
    state.charts.sqft.data.datasets[0].data = marketData.regions.map(r => r.sqft);
    state.charts.sqft.update();
}

// --- Theme and Events ---
function initTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
}

function toggleTheme() {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', state.theme);
    initTheme();
    // Update chart colors
    const gridColor = state.theme === 'dark' ? '#334155' : '#e2e8f0';
    Object.values(state.charts).forEach(chart => {
        if (chart.options.scales.x) chart.options.scales.x.grid.color = gridColor;
        if (chart.options.scales.y) chart.options.scales.y.grid.color = gridColor;
        if (chart.options.scales.r) {
            chart.options.scales.r.angleLines.color = gridColor;
            chart.options.scales.r.grid.color = gridColor;
        }
        chart.update();
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

    // Calculator inputs
    document.querySelectorAll('.calc-inputs input, .calc-inputs select').forEach(input => {
        input.addEventListener('input', updateMortgage);
    });

    // Refresh Data
    document.getElementById('refresh-btn').addEventListener('click', syncData);
}

function switchView(view) {
    state.activeTab = view;
    document.querySelectorAll('.view-section').forEach(section => {
        section.classList.remove('active');
        if (section.id === `${view}-view`) {
            setTimeout(() => section.classList.add('active'), 10);
        }
    });

    if (view === 'overview' && state.map) {
        setTimeout(() => state.map.invalidateSize(), 300);
    }
}
