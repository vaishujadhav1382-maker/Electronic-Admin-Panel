import React, { createContext, useState, useContext, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, writeBatch, setDoc, collectionGroup, deleteField } from 'firebase/firestore';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

// Mock data
const initialEmployees = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    mobile: '+91 9876543210',
    loginId: '+91 9876543210',
    password: 'emp123',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    mobile: '+91 9876543211',
    loginId: '+91 9876543211',
    password: 'emp456',
  },
  {
    id: 3,
    name: 'Amit Patel',
    mobile: '+91 9876543212',
    loginId: '+91 9876543212',
    password: 'emp789',
  },
];

const initialProducts = [];

export const AppProvider = ({ children }) => {
  // Authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Theme
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  // Product alerts setting
  const [productAlertsEnabled, setProductAlertsEnabled] = useState(() => {
    const saved = localStorage.getItem('productAlertsEnabled');
    return saved ? JSON.parse(saved) : true;
  });

  // Employees
  const [employees, setEmployees] = useState(initialEmployees);
  const [employeesLoading, setEmployeesLoading] = useState(false);
  const [employeesError, setEmployeesError] = useState(null);

  // Products
  const [products, setProducts] = useState(initialProducts);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsError, setProductsError] = useState(null);

  // Load products and employees from Firebase on mount
  useEffect(() => {
    fetchProducts();
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setEmployeesLoading(true);
      setEmployeesError(null);
      const employeesData = [];
      const emailDocs = [];

      // Primary path
      try {
        const qsPrimary = await getDocs(collection(db, 'admin-data', 'root', 'employees'));
        qsPrimary.forEach((snap) => {
          const data = snap.data() || {};
          const { email, ...rest } = data;
          if (email !== undefined) emailDocs.push(snap.ref);
          employeesData.push({ id: snap.id, ...rest });
        });
      } catch (_) { /* ignore and try fallback */ }

      // Fallback legacy path
      try {
        const qsFallback = await getDocs(collection(db, 'company', 'admin-data', 'employees'));
        qsFallback.forEach((snap) => {
          const data = snap.data() || {};
          const { email, ...rest } = data;
          if (email !== undefined) emailDocs.push(snap.ref);
          employeesData.push({ id: snap.id, ...rest });
        });
      } catch (_) { /* ignore */ }

      // Remove 'email' field from Firestore docs in both paths (one-time cleanup)
      if (emailDocs.length > 0) {
        const chunkSize = 400; // stay under 500 writes per batch
        for (let i = 0; i < emailDocs.length; i += chunkSize) {
          const batch = writeBatch(db);
          emailDocs.slice(i, i + chunkSize).forEach((ref) => batch.update(ref, { email: deleteField() }));
          await batch.commit();
        }
      }

      setEmployees(employeesData);
    } catch (err) {
      console.error('Error fetching employees:', err);
      setEmployeesError('Failed to fetch employees');
    } finally {
      setEmployeesLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setProductsLoading(true);
      setProductsError(null);
      // Fetch from any 'products' collection group and filter client-side to leaf docs
      const querySnapshot = await getDocs(collectionGroup(db, 'products'));
      const productsData = [];
      querySnapshot.forEach((snap) => {
        const data = snap.data() || {};

        // Normalize fields so UI can always use name and minPrice
        const rawPrice =
          typeof data.price === 'number'
            ? data.price
            : typeof data.productPrice === 'number'
              ? data.productPrice
              : 0;

        const rawMinPrice =
          typeof data.minPrice === 'number'
            ? data.minPrice
            : typeof data.bottomPrice === 'number'
              ? data.bottomPrice
              : 0;

        const normalizedName = data.name || data.productName || '';

        const discount = rawPrice && rawMinPrice
          ? ((rawPrice - rawMinPrice) / rawPrice * 100)
          : 0;

        productsData.push({
          id: snap.id,
          path: snap.ref.path,
          ...data,
          name: normalizedName,
          price: rawPrice,
          minPrice: rawMinPrice,
          discount,
        });
      });
      const leafOnly = productsData.filter(p =>
        typeof p.path === 'string' &&
        p.path.includes('/categories/') &&
        p.path.includes('/subcategories/') &&
        /\/products\//.test(p.path) &&
        typeof p.price === 'number'
      );
      setProducts(leafOnly);
    } catch (err) {
      console.error('Error fetching products:', err);
      setProductsError('Failed to fetch products');
    } finally {
      setProductsLoading(false);
    }
  };

  // Companies, Categories, Subcategories (matching mobile app structure)
  const [companies] = useState(['LG', 'Samsung', 'Whirlpool', 'Godrej', 'Haier', 'Voltas', 'Blue Star', 'Carrier']);
  const [categories] = useState(['TV', 'Refrigerator', 'Washing Machine', 'Air Conditioner', 'Microwave', 'Dishwasher']);
  const [subcategories] = useState({
    'Air Conditioner': ['Standard', 'Premium', 'Inverter', 'Split AC', 'Window AC'],
    'Refrigerator': ['Standard', 'Premium', 'Single Door', 'Double Door', 'Side by Side', 'French Door'],
    'Washing Machine': ['Standard', 'Premium', 'Front Load', 'Top Load', 'Semi-Automatic'],
    'TV': ['Standard', 'Premium', 'LED', 'OLED', 'QLED', 'Smart TV'],
    'Microwave': ['Standard', 'Premium', 'Solo', 'Grill', 'Convection'],
    'Dishwasher': ['Standard', 'Premium', 'Built-in', 'Portable'],
  });

  // Dark mode effect
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Persist product alerts setting
  useEffect(() => {
    localStorage.setItem('productAlertsEnabled', JSON.stringify(productAlertsEnabled));
  }, [productAlertsEnabled]);

  // Auth functions
  const login = (mobile, password) => {
    // Mock login - accept admin credentials (10-digit mobile number)
    if (mobile === '9876543210' && password === 'admin123') {
      const user = { mobile, name: 'Admin User', role: 'admin' };
      setCurrentUser(user);
      setIsAuthenticated(true);
      return { success: true };
    }
    return { success: false, error: 'Invalid mobile number or password' };
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  // Employee CRUD
  const addEmployee = async (employee) => {
    try {
      setEmployeesLoading(true);
      setEmployeesError(null);
      const { email: _omitEmail, ...rest } = employee || {};
      const employeeData = {
        ...rest,
        role: 'employee', // Default role
        createdAt: new Date().toISOString(), // Timestamp
        loginId: employee.mobile, // Use mobile number for login
        password: employee.password, // Use admin-provided password
      };
      const docRef = await addDoc(collection(db, 'admin-data','root', 'employees'), employeeData);
      const newEmployee = {
        id: docRef.id,
        ...employeeData,
      };
      setEmployees(prev => [...prev, newEmployee]);
      return newEmployee;
    } catch (err) {
      console.error('Error adding employee:', err);
      setEmployeesError('Failed to add employee');
      throw err;
    } finally {
      setEmployeesLoading(false);
    }
  };

  const updateEmployee = async (id, updatedData) => {
    try {
      setEmployeesLoading(true);
      setEmployeesError(null);
      const { email: _omitEmailUpd, ...restUpd } = updatedData || {};
      const employeeData = {
        ...restUpd,
        loginId: updatedData.mobile,
        updatedAt: new Date().toISOString() // Add update timestamp
        // Note: role and createdAt are preserved from existing data
      };
      
      const employeeRef = doc(db, 'admin-data','root', 'employees', id);
      await updateDoc(employeeRef, employeeData);
      
      setEmployees(employees.map(emp => 
        emp.id === id ? { ...emp, ...employeeData } : emp
      ));
    } catch (err) {
      console.error('Error updating employee:', err);
      setEmployeesError('Failed to update employee');
      throw err;
    } finally {
      setEmployeesLoading(false);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      setEmployeesLoading(true);
      setEmployeesError(null);
      await deleteDoc(doc(db, 'admin-data','root', 'employees', id));
      setEmployees(employees.filter(emp => emp.id !== id));
    } catch (err) {
      console.error('Error deleting employee:', err);
      setEmployeesError('Failed to delete employee');
      throw err;
    } finally {
      setEmployeesLoading(false);
    }
  };

  // Product CRUD
  const addProduct = async (product) => {
    try {
      setProductsLoading(true);
      setProductsError(null);

      // Store only legacy Firestore fields; UI will normalize on read
      const productData = {
        productName: product.name,
        bottomPrice: product.minPrice,
        price: product.price,
        company: product.company,
        category: product.category,
        subcategory: product.subcategory,
        incentive: product.incentive,
      };

      const company = (product.company || 'Unknown').trim();
      const category = (product.category || 'Unknown').trim();
      const subcategory = (product.subcategory || 'Unknown').trim();

      // Ensure parent documents exist
      const companyRef = doc(collection(db, 'admin-data', 'root', 'products'), company);
      await setDoc(companyRef, { name: company }, { merge: true });

      const categoryRef = doc(collection(companyRef, 'categories'), category);
      await setDoc(categoryRef, { name: category }, { merge: true });

      const subcatRef = doc(collection(categoryRef, 'subcategories'), subcategory);
      await setDoc(subcatRef, { name: subcategory }, { merge: true });

      const productsCol = collection(subcatRef, 'products');
      const docRef = await addDoc(productsCol, productData);

      const newPath = docRef.path;
      const newProduct = { id: docRef.id, path: newPath, ...productData };
      setProducts(prev => [...prev, newProduct]);
      return newProduct;
    } catch (err) {
      console.error('Error adding product:', err);
      setProductsError('Failed to add product');
      throw err;
    } finally {
      setProductsLoading(false);
    }
  };

  const updateProduct = async (id, updatedData) => {
    try {
      setProductsLoading(true);
      setProductsError(null);
      const discount = updatedData.price && updatedData.minPrice 
        ? ((updatedData.price - updatedData.minPrice) / updatedData.price * 100).toFixed(2)
        : null;
      
      const productData = {
        ...updatedData,
        productName: updatedData.name,
        bottomPrice: updatedData.minPrice,
        discount: discount ? parseFloat(discount) : updatedData.discount
      };

      // Find product path from state
      const existing = products.find(p => p.id === id);
      if (!existing || !existing.path) {
        throw new Error('Product path not found for update');
      }
      const productRef = doc(db, ...existing.path.split('/'));
      await updateDoc(productRef, productData);

      setProducts(products.map(prod => (prod.id === id ? { ...prod, ...productData } : prod)));
    } catch (err) {
      console.error('Error updating product:', err);
      setProductsError('Failed to update product');
      throw err;
    } finally {
      setProductsLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      setProductsLoading(true);
      setProductsError(null);
      const existing = products.find(p => p.id === id);
      if (!existing || !existing.path) {
        throw new Error('Product path not found for delete');
      }
      await deleteDoc(doc(db, ...existing.path.split('/')));
      setProducts(products.filter(prod => prod.id !== id));
    } catch (err) {
      console.error('Error deleting product:', err);
      setProductsError('Failed to delete product');
      throw err;
    } finally {
      setProductsLoading(false);
    }
  };

  const deleteAllProducts = async () => {
    try {
      setProductsLoading(true);
      setProductsError(null);
      const batch = writeBatch(db);
      const querySnapshot = await getDocs(collectionGroup(db, 'products'));
      let ops = 0;
      querySnapshot.forEach((snap) => {
        const pathStr = snap.ref.path;
        if (
          pathStr.includes('/categories/') &&
          pathStr.includes('/subcategories/') &&
          /\/products\//.test(pathStr)
        ) {
          batch.delete(snap.ref);
          ops++;
        }
      });
      if (ops > 0) await batch.commit();
      setProducts([]);
    } catch (err) {
      console.error('Error deleting all products:', err);
      setProductsError('Failed to delete all products');
      throw err;
    } finally {
      setProductsLoading(false);
    }
  };

  // Delete entire company hierarchy: categories, subcategories, and products
  const deleteCompanyHierarchy = async (company) => {
    if (!company) return;
    try {
      setProductsLoading(true);
      setProductsError(null);

      const companyRef = doc(collection(db, 'admin-data', 'root', 'products'), company);
      const batch = writeBatch(db);

      // Since Firestore batches are limited, perform a full recursive deletion with fresh snapshots
      const categoriesSnap2 = await getDocs(collection(companyRef, 'categories'));
      for (const catDoc of categoriesSnap2.docs) {
        const categoryRef = catDoc.ref;
        const subcatsSnap = await getDocs(collection(categoryRef, 'subcategories'));
        for (const subDoc of subcatsSnap.docs) {
          const subcatRef = subDoc.ref;
          const prodsSnap = await getDocs(collection(subcatRef, 'products'));
          prodsSnap.forEach((prodDoc) => {
            batch.delete(prodDoc.ref);
          });
          batch.delete(subcatRef);
        }
        batch.delete(categoryRef);
      }

      batch.delete(companyRef);
      await batch.commit();
      await fetchProducts();
    } catch (err) {
      console.error('Error deleting company hierarchy:', err);
      setProductsError('Failed to delete company');
      throw err;
    } finally {
      setProductsLoading(false);
    }
  };

  // Delete a single category and its subcategories/products for a given company
  const deleteCategoryHierarchy = async (company, category) => {
    if (!company || !category) return;
    try {
      setProductsLoading(true);
      setProductsError(null);

      const companyRef = doc(collection(db, 'admin-data', 'root', 'products'), company);
      const categoryRef = doc(collection(companyRef, 'categories'), category);
      const batch = writeBatch(db);

      const subcatsSnap = await getDocs(collection(categoryRef, 'subcategories'));
      for (const subDoc of subcatsSnap.docs) {
        const subcatRef = subDoc.ref;
        const prodsSnap = await getDocs(collection(subcatRef, 'products'));
        prodsSnap.forEach((prodDoc) => {
          batch.delete(prodDoc.ref);
        });
        batch.delete(subcatRef);
      }

      batch.delete(categoryRef);
      await batch.commit();
      await fetchProducts();
    } catch (err) {
      console.error('Error deleting category hierarchy:', err);
      setProductsError('Failed to delete category');
      throw err;
    } finally {
      setProductsLoading(false);
    }
  };

  // Delete a single subcategory and all its products for a given company/category
  const deleteSubcategoryHierarchy = async (company, category, subcategory) => {
    if (!company || !category || !subcategory) return;
    try {
      setProductsLoading(true);
      setProductsError(null);

      const companyRef = doc(collection(db, 'admin-data', 'root', 'products'), company);
      const categoryRef = doc(collection(companyRef, 'categories'), category);
      const subcatRef = doc(collection(categoryRef, 'subcategories'), subcategory);
      const batch = writeBatch(db);

      const prodsSnap = await getDocs(collection(subcatRef, 'products'));
      prodsSnap.forEach((prodDoc) => {
        batch.delete(prodDoc.ref);
      });

      batch.delete(subcatRef);
      await batch.commit();
      await fetchProducts();
    } catch (err) {
      console.error('Error deleting subcategory hierarchy:', err);
      setProductsError('Failed to delete subcategory');
      throw err;
    } finally {
      setProductsLoading(false);
    }
  };

  const importProductsFromExcel = async (excelProducts) => {
    try {
      setProductsLoading(true);
      setProductsError(null);
      const batch = writeBatch(db);
      let count = 0;

      for (const product of excelProducts) {
        const company = (product.company || 'Unknown').trim();
        const category = (product.category || 'Unknown').trim();
        const subcategory = (product.subcategory || 'Unknown').trim();

        // Store only legacy Firestore fields; UI will normalize on read
        const productData = {
          productName: product.name,
          bottomPrice: product.minPrice,
          price: product.price,
          company: product.company,
          category: product.category,
          subcategory: product.subcategory,
          incentive: product.incentive,
        };

        const companyRef = doc(collection(db, 'admin-data', 'root', 'products'), company);
        batch.set(companyRef, { name: company }, { merge: true });

        const categoryRef = doc(collection(companyRef, 'categories'), category);
        batch.set(categoryRef, { name: category }, { merge: true });

        const subcatRef = doc(collection(categoryRef, 'subcategories'), subcategory);
        batch.set(subcatRef, { name: subcategory }, { merge: true });

        const prodRef = doc(collection(subcatRef, 'products'));
        batch.set(prodRef, productData);
        count++;
      }

      await batch.commit();
      await fetchProducts();
      return count;
    } catch (err) {
      console.error('Error importing products:', err);
      setProductsError('Failed to import products');
      throw err;
    } finally {
      setProductsLoading(false);
    }
  };

  const value = {
    // Auth
    isAuthenticated,
    currentUser,
    login,
    logout,
    
    // Theme
    darkMode,
    setDarkMode,
    productAlertsEnabled,
    setProductAlertsEnabled,
    
    // Employees
    employees,
    employeesLoading,
    employeesError,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    fetchEmployees,
    
    // Products
    products,
    productsLoading,
    productsError,
    addProduct,
    updateProduct,
    deleteProduct,
    deleteAllProducts,
    importProductsFromExcel,
    fetchProducts,
    
    // Dropdowns
    companies,
    categories,
    subcategories,
    deleteCompanyHierarchy,
    deleteCategoryHierarchy,
    deleteSubcategoryHierarchy,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

