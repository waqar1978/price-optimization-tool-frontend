# 🏷️ Price Optimization Tool – Frontend

This is the **frontend interface** for the *Price Optimization Tool*, designed for business users to manage products, visualize demand forecasts, and receive optimized pricing recommendations.

Built with **React (TypeScript)** and **Vite**, the frontend offers a responsive, data-driven UI for interacting with the Django REST API backend.

For the backend part of this project, see the [Price Optimization Tool Backend](https://github.com/shahsad-kp/price-optimization-tool-backend).

---

## 🚀 Features

- **Product Management**
    - Add, view, edit, and delete products.
    - Filter and search products by name, category, etc.

- **Demand Forecast Visualization**
    - View forecasted demand vs selling price using interactive charts.
    - Visualized via Chart.js or Recharts.

- **Pricing Optimization**
    - Display optimized product prices in a tabular format.
    - Fetch optimized data directly from backend API.

- **Clean & Responsive UI**
    - Fully responsive layout using Tailwind CSS.
    - UI based on Figma-inspired mockups from assessment.

---

## 🧰 Tech Stack

- **Frontend Framework:** React + TypeScript + Vite
- **UI Styling:** Tailwind CSS
- **State Management:** React Query / Context API
- **Charting:** Chart.js or Recharts
- **API Communication:** Axios (REST API)
- **Routing:** React Router DOM

---

## ⚙️ How to Run

### 1️⃣ Clone Repository
```bash
git clone https://github.com/yourusername/price-optimization-tool.git
cd price-optimization-tool/frontend
```
### 2️⃣ Install Dependencies
```bash
npm install
```
### 3️⃣ Configure Environment
Create a `.env` file in the frontend root directory:
```dotenv
VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1/
```
### 4️⃣ Run Development Server
```bash
npm run dev
```
Access the app at http://localhost:5173/.

### 5️⃣ Build for Production
```bash
npm run build
```
The production-ready files will be in the `dist` folder.