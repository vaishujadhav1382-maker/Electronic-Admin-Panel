# 📘 ProductHub Admin Panel - User Guide

## 🎯 Quick Navigation

### **How to Access the Sidebar**

The sidebar should now be **visible on desktop by default**. On mobile/tablet:
1. Look for the **☰ hamburger menu icon** in the top-left corner
2. Click it to open the sidebar
3. Click anywhere outside or the X button to close

### **Sidebar Navigation Menu**

```
📱 ProductHub
   ├─ 📊 Dashboard     → Overview stats and charts
   ├─ 👥 Employees     → Manage employees (ADD EMPLOYEES HERE)
   ├─ 📦 Products      → Manage products (VIEW & ADD PRODUCTS HERE)
   └─ ⚙️ Settings      → App settings
```

---

## 1️⃣ **How to Add Employees**

### Step-by-Step:

**Step 1:** Click **"Employees"** in the sidebar
- Look for the user icon (👥)

**Step 2:** Click the **"Add Employee"** button (top-right, orange button)

**Step 3:** Fill in the form:
```
Employee Name:     Rajesh Kumar
Mobile Number:     +91 9876543210
Email ID:          rajesh.kumar@company.com
Password:          emp123
```

**Step 4:** Click **"Add Employee"**

✅ **Result:** The employee will appear in the table with:
- Name
- Mobile Number
- Email ID
- Login ID (same as email)
- Password (visible in table)
- Edit/Delete buttons

---

## 2️⃣ **How to View Products in List/Table View**

### Step-by-Step:

**Step 1:** Click **"Products"** in the sidebar
- Look for the package icon (📦)

**Step 2:** Toggle between views using the **view switcher** (top-right):
- **Grid Icon (⊞)** = Card View (visual product cards)
- **List Icon (☰)** = Table View (detailed list)

### **Table View Shows:**
```
┌─────────────────┬─────────┬──────────┬───────┬──────────┬───────┬────────┬─────────┐
│ Product         │ Company │ Category │ Price │ Discount │ Stock │ Rating │ Actions │
├─────────────────┼─────────┼──────────┼───────┼──────────┼───────┼────────┼─────────┤
│ [Image] Name    │ Godrej  │ Air Con  │ ₹30k  │ 20% OFF  │ 25    │ ⭐ 4.5 │ ✏️ 🗑️   │
└─────────────────┴─────────┴──────────┴───────┴──────────┴───────┴────────┴─────────┘
```

### **Card View Shows:**
- Product image with discount badge
- Product name and description
- Company and category
- Price (green) with strikethrough min price
- Star rating
- Stock quantity
- Edit/Delete buttons

---

## 3️⃣ **How to Add Products (Hierarchy Structure)**

### Step-by-Step:

**Step 1:** Go to **Products** page

**Step 2:** Click **"Add Product"** button (top-right)

**Step 3:** Fill the form following the hierarchy:

```
1. SELECT COMPANY (Brand):
   └─ Dropdown: LG, Samsung, Whirlpool, Godrej, Haier, Voltas, etc.

2. SELECT CATEGORY (Product Type):
   └─ Dropdown: TV, Refrigerator, Washing Machine, Air Conditioner, Microwave, Dishwasher

3. SELECT SUBCATEGORY (Model Type):
   └─ Dropdown changes based on category selected:
      • Air Conditioner → Standard, Premium, Inverter, Split AC, Window AC
      • Refrigerator → Standard, Premium, Single Door, Double Door, etc.
      • TV → Standard, Premium, LED, OLED, QLED, Smart TV
      • And so on...

4. FILL PRODUCT DETAILS:
   ├─ Product Name:        "Godrej Air Conditioner Standard"
   ├─ Description:         "Good quality features..."
   ├─ Price:               30000
   ├─ Min Allowed Price:   24000 (Discount auto-calculated: 20%)
   ├─ Incentive:           1500
   ├─ Rating:              4.2
   ├─ Stock:               25
   └─ Image URL:           https://example.com/image.jpg
```

**Step 4:** Click **"Add Product"**

---

## 4️⃣ **Product Hierarchy Examples**

### Example 1: Godrej Air Conditioner
```
Company:      Godrej
Category:     Air Conditioner
Subcategory:  Standard OR Premium
Product:      Godrej Air Conditioner Standard
```

### Example 2: Samsung Refrigerator
```
Company:      Samsung
Category:     Refrigerator
Subcategory:  Double Door
Product:      Samsung 253L Double Door Refrigerator
```

### Example 3: LG Washing Machine
```
Company:      LG
Category:     Washing Machine
Subcategory:  Front Load
Product:      LG 7Kg Front Load Washing Machine
```

---

## 5️⃣ **Search & Filter Features**

### **Search Employees:**
- Go to Employees page
- Use search box at top
- Search by: Name, Email, or Mobile Number

### **Search Products:**
- Go to Products page
- Use search box at top
- Search by: Product Name, Company, or Category

---

## 6️⃣ **Dashboard Overview**

The dashboard shows:

### **📊 Stats Cards:**
- Total Employees (count)
- Total Products (count)
- Total Stock (sum of all product stocks)
- Total Incentives (₹ sum)

### **📈 Charts:**
1. **Products by Category** (Pie Chart)
   - Visual breakdown of product categories

2. **Price Range Distribution** (Bar Chart)
   - Products grouped by price ranges (10k-20k, 20k-30k, etc.)

3. **Stock Inventory by Company** (Horizontal Bar Chart)
   - Stock levels per brand

4. **Top Rated Products** (List)
   - Top 5 products sorted by rating

---

## 7️⃣ **Excel Upload for Bulk Products**

### Step-by-Step:

**Step 1:** Go to **Products** page

**Step 2:** Click **"Import Excel"** button (top-right)

**Step 3:** Select your `.xlsx` file

**Excel File Format Required:**
```
| Company | Category | Subcategory | Product Name | Description | Price | Min Price | Incentive | Rating | Stock | Image |
|---------|----------|-------------|--------------|-------------|-------|-----------|-----------|--------|-------|-------|
| Godrej  | Air Con  | Standard    | Godrej AC    | Good...     | 30000 | 24000     | 1500      | 4.2    | 25    | url   |
```

See `EXCEL_TEMPLATE_FORMAT.md` for detailed format.

---

## 8️⃣ **Editing & Deleting**

### **Edit Employee/Product:**
1. Find the item in the table
2. Click the **✏️ Edit** button
3. Modify the fields in the modal
4. Click **"Update"**

### **Delete Employee/Product:**
1. Find the item in the table
2. Click the **🗑️ Delete** button
3. Confirm deletion in the popup
4. Item is removed

---

## 9️⃣ **Dark Mode**

- Click the **🌙 Moon/☀️ Sun** icon in the top-right navbar
- Toggle between light and dark themes
- Your preference is saved automatically

---

## 🔟 **Common Actions Quick Reference**

| Action | Location | Button |
|--------|----------|--------|
| Add Employee | Employees page → Top-right | Orange "Add Employee" button |
| Add Product | Products page → Top-right | Orange "Add Product" button |
| Import Excel | Products page → Top-right | Gray "Import Excel" button |
| Switch View | Products page → Top-right | Grid/List toggle buttons |
| Search | Employee/Products page → Top | Search input box |
| Edit Item | Any table row | Blue ✏️ icon |
| Delete Item | Any table row | Red 🗑️ icon |
| Toggle Sidebar | Top-left navbar | ☰ Menu icon (mobile) |
| Dark Mode | Top-right navbar | 🌙 Moon icon |
| Logout | Top-right navbar | Red logout icon |

---

## ❓ Troubleshooting

### **Sidebar Not Visible?**
- On desktop: Refresh the page (it should show automatically)
- On mobile/tablet: Click the ☰ hamburger menu icon

### **Can't See Products Table?**
- Make sure you're on the "Products" page (click Products in sidebar)
- Toggle the view mode (Grid ⊞ vs List ☰)

### **Employee Password Not Showing?**
- The password is visible in the employee table
- You can edit it by clicking the Edit button

---

## 📞 Support

For help, check:
- `README.md` - Project overview
- `INSTALLATION_GUIDE.md` - Setup instructions
- `EXCEL_TEMPLATE_FORMAT.md` - Excel import format

---

**Built with ❤️ using React.js and Tailwind CSS**
