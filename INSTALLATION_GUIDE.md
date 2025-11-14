# 🚀 Installation Guide - ProductHub Admin Panel

## Prerequisites

- **Node.js** (version 14 or higher)
- **npm** or **yarn** package manager

## Installation Steps

### 1. Install Dependencies

Open a terminal in the `product-admin` directory and run:

```bash
npm install
```

This will install all required packages:
- React & React DOM
- React Router DOM
- Tailwind CSS
- Framer Motion (animations)
- Recharts (charts)
- XLSX (Excel parsing)
- Lucide React (icons)

### 2. Start the Development Server

```bash
npm start
```

The application will automatically open at **http://localhost:3000**

### 3. Login Credentials

Use these credentials to access the admin panel:

- **Email**: `admin@example.com`
- **Password**: `admin123`

## Project Structure

```
product-admin/
├── public/
│   └── index.html                  # HTML template
├── src/
│   ├── components/
│   │   ├── Layout.js              # Main layout wrapper
│   │   ├── Sidebar.js             # Sidebar navigation
│   │   └── Navbar.js              # Top navigation bar
│   ├── pages/
│   │   ├── Login.js               # Login page
│   │   ├── Dashboard.js           # Dashboard with charts
│   │   ├── Employees.js           # Employee management
│   │   ├── Products.js            # Product management
│   │   └── Settings.js            # Settings page
│   ├── context/
│   │   └── AppContext.js          # Global state management
│   ├── App.js                     # Main app component
│   ├── index.js                   # Entry point
│   └── index.css                  # Global styles with Tailwind
├── package.json                    # Dependencies
├── tailwind.config.js             # Tailwind configuration
└── postcss.config.js              # PostCSS configuration
```

## Features Overview

### ✅ Authentication
- Secure login page
- Protected routes
- Session management

### ✅ Dashboard
- Total employees and products stats
- Interactive charts (Recharts)
- Product category distribution
- Top-rated products list

### ✅ Employee Management
- Add, Edit, Delete employees
- Auto-generated login credentials
- Search and filter functionality
- Responsive table view
- Modal forms with animations

### ✅ Product Management
- Full CRUD operations
- Card and Table view toggle
- Excel file upload (.xlsx)
- Hierarchical product organization
- Auto-calculated discounts
- Image upload support
- Search functionality

### ✅ Design Features
- Orange (#FF6600) primary theme
- Dark mode toggle
- Smooth Framer Motion animations
- Fully responsive (Desktop + Tablet)
- Modern UI with Lucide icons
- Tailwind CSS styling

## Excel Upload Format

To import products via Excel, create a file with these columns:

| Company | Category | Subcategory | Product Name | Description | Price | Min Price | Incentive | Rating | Stock | Image |
|---------|----------|-------------|--------------|-------------|-------|-----------|-----------|--------|-------|-------|

See `EXCEL_TEMPLATE_FORMAT.md` for detailed format.

## Available Scripts

### `npm start`
Runs the app in development mode at http://localhost:3000

### `npm run build`
Builds the app for production to the `build` folder

### `npm test`
Launches the test runner

## Troubleshooting

### Port Already in Use
If port 3000 is occupied:
```bash
# Windows
set PORT=3001 && npm start

# Mac/Linux
PORT=3001 npm start
```

### Dependencies Not Installing
Clear cache and reinstall:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Tailwind Styles Not Working
Ensure PostCSS and Tailwind are properly configured. The CSS warnings about `@tailwind` and `@apply` are normal - they'll be processed during build.

## Tech Stack

- ⚛️ **React 18.2** - UI framework
- 🎨 **Tailwind CSS 3.4** - Utility-first CSS
- 🎭 **Framer Motion** - Animation library
- 📊 **Recharts** - Chart library
- 🗂️ **XLSX** - Excel file processing
- 🎯 **Lucide React** - Icon library
- 🛣️ **React Router v6** - Client-side routing

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

**Need Help?** Check the README.md or create an issue in the repository.

Built with ❤️ using React.js and Tailwind CSS
