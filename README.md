# 📱 Electronic Products Admin Panel

A modern, professional, and attractive Admin Panel built with React.js and Tailwind CSS for managing electronic products and employees.

## ✨ Features

### 🧑‍💼 Employee Management
- Add, edit, and delete employees
- Auto-generate login credentials (Email = Login ID)
- Search and filter functionality
- Responsive table view with modal forms

### 📦 Product Management
- Hierarchical product organization (Company → Category → Subcategory → Product)
- Card and table view toggle
- Excel file upload (.xlsx) for bulk product import
- Auto-calculated discount percentages
- Image upload support

### 📊 Dashboard
- Summary statistics (Total Employees, Products, etc.)
- Visual charts using Recharts
- Quick overview of active offers and top categories

### 🎨 Design Features
- Orange (#FF6600) primary theme
- Smooth animations with Framer Motion
- Dark mode toggle
- Fully responsive (Desktop + Tablet)
- Modern UI with Lucide icons

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm build
```

## 🔐 Default Login Credentials

- **Email**: admin@example.com
- **Password**: admin123

## 📂 Project Structure

```
product-admin/
├── public/
│   └── index.html
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/          # Page components
│   ├── context/        # State management
│   ├── utils/          # Helper functions
│   ├── App.js
│   └── index.js
└── package.json
```

## 🛠️ Tech Stack

- **React.js** - Frontend framework
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Framer Motion** - Animations
- **Recharts** - Charts and graphs
- **Lucide React** - Icons
- **XLSX** - Excel file processing

## 📝 Notes

- This is a **frontend-only** application with mock data
- No backend or database integration
- All data is stored in component state (resets on refresh)
- Excel upload uses the `xlsx` package for parsing

## 🌙 Dark Mode

Toggle dark mode using the button in the top navbar. The preference is saved in localStorage.

---

Built with ❤️ using React.js and Tailwind CSS
