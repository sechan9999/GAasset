# 🏠 Georgia Real Estate Intelligence Dashboard v1.2

A premium, data-driven market intelligence platform for Georgia real estate, focusing on Gwinnett and DeKalb County. This dashboard features a modern "Single Source of Truth" architecture, ensuring 100% data consistency across all analytics components.

https://gaasset.vercel.app/

## 🚀 Recent Updates (Architectural Overhaul)

-   **P0: Single Source of Truth**: Completely refactored the data layer to eliminate DRY violations. All UI components (KPIs, Tables, Insights) are now dynamically rendered from a unified data object.
-   **P1: Simulated Data Pipeline**: Integrated a "Sync Data" engine that mimics real-time API fetches from Zillow and Redfin with realistic market volatility.
-   **P2: Interactive Market Map**: Added a geographic heatmap using Leaflet.js, allowing users to visualize market health across zip codes (30097, 30024, 30058, 30518).
-   **P2: Investment Tools**: Launched a Smart Mortgage Calculator to help users estimate monthly PITI payments (Principal, Interest, Taxes, and Insurance) instantly.

## ✨ Core Features

-   **Premium Glassmorphism UI**: High-fidelity design with curated color palettes, smooth animations, and dark mode support.
-   **Dynamic Analytics**: Responsive charts (Chart.js) for 5-year trends, $/sqft comparisons, and market profile radar analysis.
-   **Market Velocity Tracking**: Real-time monitoring of "Days on Market" (DOM) and inventory turnover speed.
-   **Automated Insights**: Contextual market summaries generated dynamically for each region.

## 🛠️ Tech Stack

-   **Frontend**: HTML5, Vanilla CSS3 (Custom Design System), JavaScript (ES6+)
-   **Maps**: [Leaflet.js](https://leafletjs.com/)
-   **Charts**: [Chart.js](https://www.chartjs.org/)
-   **Fonts**: Outfit & Inter (via Google Fonts)
-   **Deployment**: [Vercel](https://vercel.com/)

## 💻 Local Development

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/sechan9999/GAasset.git
    cd GAasset
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the server**:
    ```bash
    node server.js
    ```

4.  **Open in browser**:
    Navigate to `http://localhost:3000`

## 📊 Data & Accuracy

The data presented is currently simulated based on historical trends from Zillow ZHVI and Redfin Market Data. Use the **"🔄 Sync Data"** button to simulate a live update of the market environment.

---
*Disclaimer: This dashboard is for informational purposes only and does not constitute financial or investment advice.*
