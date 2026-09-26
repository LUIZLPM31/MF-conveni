import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PRODUCTS as INITIAL_PRODUCTS } from '../data/products';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const ProductContext = createContext();

const STORAGE_KEY = 'mf_conveni_products';
const ADMIN_AUTH_KEY = 'mf_conveni_admin_auth';
const ADMIN_PASSWORD_KEY = 'mf_conveni_admin_password';
const DEFAULT_ADMIN_PASSWORD = 'admin123';

// Helper para converter formato do banco Supabase (snake_case) para formato do React (camelCase)
const mapFromDatabase = (item) => ({
  id: String(item.id),
  name: item.name,
  category: item.category,
  price: Number(item.price) || 0,
  oldPrice: item.old_price != null ? Number(item.old_price) : null,
  unit: item.unit || 'Unidade',
  badge: item.badge || '',
  isCold: item.is_cold !== false,
  rating: Number(item.rating) || 5.0,
  description: item.description || '',
  image: item.image || '',
  createdAt: item.created_at
});

// Helper para converter formato do React para o banco Supabase (snake_case)
const mapToDatabase = (item) => ({
  id: String(item.id),
  name: item.name,
  category: item.category,
  price: Number(item.price) || 0,
  old_price: item.oldPrice ? Number(item.oldPrice) : null,
  unit: item.unit || 'Unidade',
  badge: item.badge || null,
  is_cold: Boolean(item.isCold),
  rating: Number(item.rating) || 5.0,
  description: item.description || '',
  image: item.image || '',
  updated_at: new Date().toISOString()
});

export function ProductProvider({ children }) {
  // Inicialização de produtos com persistência em localStorage (fallback rápido)
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

  // Estados de banco de dados
  const [isDatabaseConnected, setIsDatabaseConnected] = useState(false);
  const [isLoadingDatabase, setIsLoadingDatabase] = useState(false);
  const [databaseError, setDatabaseError] = useState(null);

  // Autenticação de Administrador
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Função para carregar produtos do Supabase
  const fetchProductsFromDatabase = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase) {
      setIsDatabaseConnected(false);
      return;
    }

    try {
      setIsLoadingDatabase(true);
      setDatabaseError(null);

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Erro ao consultar Supabase (usando fallback local):', error.message);
        setDatabaseError(error.message);
        setIsDatabaseConnected(false);
      } else if (data && data.length > 0) {
        const mapped = data.map(mapFromDatabase);
        setProducts(mapped);
        setIsDatabaseConnected(true);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mapped));
      } else {
        // Banco conectado, mas tabela vazia
        setIsDatabaseConnected(true);
      }
    } catch (err) {
      console.warn('Falha de conexão com o banco de dados:', err);
      setDatabaseError(err.message);
      setIsDatabaseConnected(false);
    } finally {
      setIsLoadingDatabase(false);
    }
  }, []);

  // Carregar produtos ao montar o provider
  useEffect(() => {
    fetchProductsFromDatabase();
  }, [fetchProductsFromDatabase]);

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

  // Login do Administrador (Checa no Supabase se ativo, com fallback local)
  const loginAdmin = async (inputPassword) => {
    const trimmed = inputPassword.trim();

    // Se o Supabase estiver configurado, checar na tabela admin_auth
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('admin_auth')
          .select('password')
          .eq('id', 'primary_admin')
          .maybeSingle();

        if (!error && data && data.password) {
          if (trimmed === data.password) {
            setIsAdminAuthenticated(true);
            sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
            localStorage.setItem(ADMIN_PASSWORD_KEY, data.password);
            return { success: true };
          }
          return { success: false, message: 'Senha incorreta no banco de dados. Tente novamente.' };
        }
      } catch (err) {
        console.warn('Erro ao validar login no Supabase, tentando local:', err);
      }
    }

    // Fallback: Checa localStorage ou padrão 'admin123'
    const currentPassword = localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_ADMIN_PASSWORD;
    if (trimmed === currentPassword) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
      return { success: true };
    }

    return { success: false, message: 'Senha incorreta. Tente novamente.' };
  };

  // Alterar senha do Administrador (Salva no Supabase e no localStorage)
  const changeAdminPassword = async (newPassword) => {
    const trimmed = newPassword.trim();
    if (!trimmed || trimmed.length < 6) {
      return { success: false, message: 'A nova senha deve ter no mínimo 6 caracteres.' };
    }

    let savedInDatabase = false;

    // Salvar no Supabase se ativo
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('admin_auth')
          .upsert({
            id: 'primary_admin',
            password: trimmed,
            updated_at: new Date().toISOString()
          });

        if (!error) {
          savedInDatabase = true;
        } else {
          console.warn('Erro ao atualizar senha no Supabase:', error.message);
        }
      } catch (err) {
        console.warn('Erro ao conectar ao Supabase para atualizar senha:', err);
      }
    }

    // Atualiza localmente
    localStorage.setItem(ADMIN_PASSWORD_KEY, trimmed);

    return { 
      success: true, 
      message: savedInDatabase 
        ? 'Senha salva com sucesso no Banco de Dados (Supabase)!' 
        : 'Senha atualizada localmente com sucesso!' 
    };
  };

  // Logout do Administrador
  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem(ADMIN_AUTH_KEY);
    } catch {
      // Ignora erro
    }
  };

  // Adicionar novo produto (no Supabase e no State local)
  const addProduct = async (newProductData) => {
    const newId = newProductData.id || `prod-${Date.now()}`;
    const productToAdd = {
      ...newProductData,
      id: newId,
      price: Number(newProductData.price) || 0,
      oldPrice: newProductData.oldPrice ? Number(newProductData.oldPrice) : null,
      rating: Number(newProductData.rating) || 5.0,
      isCold: Boolean(newProductData.isCold)
    };

    // 1. Atualiza estado imediatamente (UI otimista)
    setProducts(prev => [productToAdd, ...prev]);

    // 2. Persiste no Supabase se configurado
    if (isSupabaseConfigured && supabase) {
      try {
        const dbPayload = mapToDatabase(productToAdd);
        const { error } = await supabase.from('products').insert([dbPayload]);
        if (error) {
          console.error('Erro ao adicionar produto no Supabase:', error);
          setDatabaseError(error.message);
        }
      } catch (err) {
        console.error('Falha de rede ao inserir no Supabase:', err);
      }
    }

    return productToAdd;
  };

  // Editar produto existente (no Supabase e no State local)
  const updateProduct = async (id, updatedData) => {
    const updatedProduct = {
      ...updatedData,
      id,
      price: Number(updatedData.price) || 0,
      oldPrice: updatedData.oldPrice ? Number(updatedData.oldPrice) : null,
      rating: Number(updatedData.rating) || 5.0,
      isCold: Boolean(updatedData.isCold)
    };

    // 1. Atualiza estado imediatamente
    setProducts(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updatedProduct } : item))
    );

    // 2. Atualiza no Supabase se configurado
    if (isSupabaseConfigured && supabase) {
      try {
        const dbPayload = mapToDatabase(updatedProduct);
        const { error } = await supabase
          .from('products')
          .update(dbPayload)
          .eq('id', id);

        if (error) {
          console.error('Erro ao atualizar produto no Supabase:', error);
          setDatabaseError(error.message);
        }
      } catch (err) {
        console.error('Falha de rede ao atualizar no Supabase:', err);
      }
    }
  };

  // Excluir produto (no Supabase e no State local)
  const deleteProduct = async (id) => {
    // 1. Remove da UI imediatamente
    setProducts(prev => prev.filter(item => item.id !== id));

    // 2. Remove do Supabase se configurado
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', id);

        if (error) {
          console.error('Erro ao deletar produto no Supabase:', error);
          setDatabaseError(error.message);
        }
      } catch (err) {
        console.error('Falha de rede ao deletar no Supabase:', err);
      }
    }
  };

  // Sincronizar catálogo inicial para o Supabase (para popular o banco com 1 clique)
  const syncInitialCatalogToSupabase = async () => {
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, message: 'Supabase não está configurado no arquivo .env.' };
    }

    try {
      setIsLoadingDatabase(true);
      const rows = INITIAL_PRODUCTS.map(mapToDatabase);
      const { error } = await supabase
        .from('products')
        .upsert(rows, { onConflict: 'id' });

      if (error) {
        setIsLoadingDatabase(false);
        return { success: false, message: `Erro ao sincronizar: ${error.message}` };
      }

      await fetchProductsFromDatabase();
      return { success: true, message: `${rows.length} produtos sincronizados com sucesso no Supabase!` };
    } catch (err) {
      setIsLoadingDatabase(false);
      return { success: false, message: `Falha na requisição: ${err.message}` };
    }
  };

  // Restaurar produtos padrão localmente
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
        syncInitialCatalogToSupabase,
        isDatabaseConnected,
        isLoadingDatabase,
        databaseError,
        isSupabaseConfigured,
        refetchProducts: fetchProductsFromDatabase,
        isAdminAuthenticated,
        loginAdmin,
        changeAdminPassword,
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
