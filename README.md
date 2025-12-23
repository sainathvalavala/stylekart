# Stylekart 🛍️👗

**Stylekart** is a fully responsive fashion e-commerce web application inspired by Myntra, built using **React.js** and **Redux Toolkit**.  
The app integrates **real Myntra APIs** to fetch detailed product data and **high-resolution images** across multiple categories.

🌐 Live Demo: https://stylekart-fashion-sainath.vercel.app/  
🔗 Myntra API Repo: https://github.com/sainathvalavala/myntraApi

---
## 🎥 Demo Videos

### 🖥 Desktop View
[![Stylekart Desktop Demo](screenshots/stylekart-desktop.png)](https://youtu.be/kqm2gwXwneI)

▶️ Desktop demo showcasing product browsing, filtering logic, product details, and cart flow using real Myntra APIs.

---

### 📱 Mobile View
[![Stylekart Mobile Demo](screenshots/stylekart-mobile.png)](https://www.youtube.com/shorts/uB0zGP71XQI)

▶️ Mobile-responsive demo highlighting navigation, filtering, and optimized UI for smaller screens.

## 🚀 Project Overview

Stylekart demonstrates a **production-style frontend architecture** using **Redux Toolkit + RTK Query** to manage global state and fetch data from **multiple real-world APIs**.

The application is **fully responsive**, delivering a seamless shopping experience across **mobile, tablet, and desktop** devices.

---

## 🛠 Tech Stack

- **React.js** – Component-based UI development  
- **Redux Toolkit** – Centralized state management  
- **RTK Query** – API fetching, caching & synchronization  
- **React Router** – Client-side routing  
- **Tailwind CSS** – Responsive, utility-first styling  
- **Vercel** – Deployment & hosting  

---

## 🔄 Real Myntra API Integration

Stylekart consumes **real Myntra APIs** from a custom API service:

🔗 https://github.com/sainathvalavala/myntraApi

### APIs Used:
- 👔 Men’s fashion products  
- 👗 Women’s fashion products  
- 🧒 Kids’ clothing  
- 💄 Beauty & personal care products  

### API Highlights:
✔ Real Myntra product data  
✔ High-resolution product images  
✔ Pricing, discounts & ratings  
✔ Category & gender-based APIs  
✔ Optimized for frontend consumption  

---

## 🧠 State Management & Data Flow

Redux Toolkit with RTK Query is used to:

- Fetch data from **multiple Myntra APIs**
- Cache responses to improve performance
- Prevent unnecessary network requests
- Maintain clean, scalable, and reusable architecture
- Separate UI logic from data handling

---

## 📱 Responsive Design

Stylekart is **fully responsive** and optimized for:

- 📱 Mobile devices  
- 📲 Tablets  
- 🖥 Desktop screens  

Responsive behavior is achieved using:
- Tailwind CSS responsive utilities
- Flexible grid layouts
- Mobile-first design approach

---

## ✨ Key Features
- Fully responsive e-commerce UI
- Real Myntra API integration with high-resolution images
- Category-wise product listings (Men, Women, Kids, Beauty)
- Dynamic filtering by brand, category, and price
- Reusable filter components
- Redux-powered cart & wishlist
- Optimized state management with RTK Query


---

## 📁 Project Structure

```bash
stylekart/
├── node_modules/
├── public/
├── src/
│   ├── app/
│   │   └── store.js                 # Redux store configuration
│   │
│   ├── assets/                      # Images & static assets
│   │
│   ├── components/                 # Reusable UI components
│   │   ├── bottomBar/
│   │   ├── filters/
│   │   ├── footer/
│   │   ├── home/
│   │   ├── navbar/
│   │   ├── products/
│   │   └── wishlist/
│   │
│   ├── features/                   # Redux Toolkit feature slices
│   │   ├── cart/
│   │   │   └── cartSlice.js
│   │   └── wishlist/
│   │
│   ├── pages/                      # Route-based pages
│   │   ├── Home.jsx
│   │   ├── Men.jsx
│   │   ├── Women.jsx
│   │   ├── Kids.jsx
│   │   ├── BeautyProducts.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Cart.jsx
│   │   └── Wishlist.jsx
│   │
│   ├── services/                   # RTK Query API services
│   │   ├── beautyApi/
│   │   ├── homePageApi/
│   │   ├── kidsApi/
│   │   └── productsApi/
│   │
│   ├── utils/                      # Helper utilities
│   │   └── getProductId.js
│   │
│   ├── App.css
│   ├── index.css
│   └── main.jsx                    # App entry point
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

This project follows a feature-based architecture using Redux Toolkit and RTK Query,
ensuring scalability, clean separation of concerns, and efficient API management.


## ⚙️ Getting Started

Follow these steps to run the project locally on your machine.

### Clone the Repository
```bash
git clone https://github.com/sainathvalavala/stylekart.git
cd stylekart
```
### Install Dependencies
```bash
npm install
```
### Start the development Server
```bash
npm run dev
```

