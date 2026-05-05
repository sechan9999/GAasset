# 🏠 Georgia Real Estate Intelligence Dashboard

A premium, interactive market analysis tool for Georgia real estate, focusing on Gwinnett and DeKalb County (Zip codes 30097, 30024, and 30058). This dashboard provides high-fidelity data visualization for home values, price trends, and market velocity.

https://gaasset.vercel.app/

## ✨ Key Features

-   **Premium Design System**: Modern UI with glassmorphism, smooth animations, and curated color palettes.
-   **Multi-View Navigation**:
    -   **Overview**: Instant KPI snapshots for typical home values, YoY changes, and market insights.
    -   **Price Trends**: Interactive 5-year historical trend analysis and market profile radar charts.
    -   **Detailed Comparison**: Side-by-side metric comparison and market velocity tracking.
-   **Dark Mode Support**: Seamless toggle between light and dark themes with persistent user preferences.
-   **Interactive Analytics**: Powered by Chart.js for responsive and performant data visualization.
-   **Responsive Layout**: Fully optimized for desktop, tablet, and mobile viewing.

## 🛠️ Tech Stack

-   **Frontend**: HTML5, Vanilla CSS3 (Custom Design System), JavaScript (ES6+)
-   **Charts**: [Chart.js](https://www.chartjs.org/)
-   **Fonts**: Outfit & Inter (via Google Fonts)
-   **Backend**: Node.js & Express (Static File Server)
-   **Deployment**: Vercel

## 🚀 Quick Start

### Local Development

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

### Deployment to Vercel

This project is optimized for Vercel. To deploy your own instance:

1.  Push the code to your GitHub repository.
2.  Import the project into the [Vercel Dashboard](https://vercel.com/new).
3.  Vercel will automatically detect the static assets and deploy.

## 📊 Data Sources

-   **Zillow Home Value Index (ZHVI)**: Typical home values and historical trends.
-   **Redfin Market Data**: Median sale prices, inventory velocity, and market competitiveness.

## 📄 License

This project is licensed under the ISC License.

---
*Disclaimer: This dashboard is for informational purposes only and does not constitute financial or investment advice.*
