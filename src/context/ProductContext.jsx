import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS as INITIAL_PRODUCTS } from '../data/products';

const ProductContext = createContext();

const STORAGE_KEY = 'mf_conveni_products';
const ADMIN_AUTH_KEY = 'mf_conveni_admin_auth';
const ADMIN_PASSWORD_KEY = 'mf_conveni_admin_password';
const DEFAULT_ADMIN_PASSWORD = 'admin123';

export function ProductProvider({ children }) {
  // Inicialização de produtos com persistência em localStorage
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Erro ao ler produtos do localStorage:', e);
    }
    return INITIAL_PRODUCTS;
  });

  // Autenticação de Administrador
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Sincronizar produtos com localStorage sempre que alterar
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Erro ao gravar produtos no localStorage:', e);
    }
  }, [products]);

  // Acesso seguro e discreto ao painel administrativo (URL #admin, ?admin ou atalho Ctrl+Shift+A)
  useEffect(() => {
    const handleUrlTrigger = () => {
      const hasHash = window.location.hash.toLowerCase() === '#admin';
      const searchParams = new URLSearchParams(window.location.search);
      const hasParam = searchParams.get('admin') !== null;
      if (hasHash || hasParam) {
        setIsAdminModalOpen(true);
      }
    };

    const handleKeyDown = (e) => {
      // Atalho de teclado: Ctrl + Shift + A (ou Command + Shift + A no Mac)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminModalOpen(prev => !prev);
      }
    };

    handleUrlTrigger();
    window.addEventListener('hashchange', handleUrlTrigger);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', handleUrlTrigger);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Login do Administrador
  const loginAdmin = (inputPassword) => {
    const currentPassword = localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_ADMIN_PASSWORD;
    if (inputPassword.trim() === currentPassword) {
      setIsAdminAuthenticated(true);
      try {
        sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
      } catch (e) {
        // Ignora erro de sessionStorage
      }
      return { success: true };
    }
    return { success: false, message: 'Senha incorreta. Tente novamente.' };
  };

  // Logout do Administrador
  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem(ADMIN_AUTH_KEY);
    } catch (e) {
      // Ignora erro
    }
  };

  // Adicionar novo produto
  const addProduct = (newProductData) => {
    const newId = newProductData.id || `prod-${Date.now()}`;
    const productToAdd = {
      ...newProductData,
      id: newId,
      price: Number(newProductData.price) || 0,
      oldPrice: newProductData.oldPrice ? Number(newProductData.oldPrice) : null,
      rating: Number(newProductData.rating) || 5.0,
      isCold: Boolean(newProductData.isCold)
    };

    setProducts(prev => [productToAdd, ...prev]);
    return productToAdd;
  };

  // Editar produto existente
  const updateProduct = (id, updatedData) => {
    setProducts(prev =>
      prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            ...updatedData,
            price: Number(updatedData.price) || 0,
            oldPrice: updatedData.oldPrice ? Number(updatedData.oldPrice) : null,
            rating: Number(updatedData.rating) || item.rating || 5.0,
            isCold: Boolean(updatedData.isCold)
          };
        }
        return item;
      })
    );
  };

  // Excluir produto
  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(item => item.id !== id));
  };

  // Restaurar produtos padrão
  const resetToDefaultProducts = () => {
    setProducts(INITIAL_PRODUCTS);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        resetToDefaultProducts,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        isAdminModalOpen,
        setIsAdminModalOpen
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts deve ser usado dentro de um ProductProvider');
  }
  return context;
}
