import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Edit3, 
  Trash2, 
  Lock, 
  Search, 
  RefreshCw, 
  Check, 
  AlertCircle, 
  Image as ImageIcon, 
  Snowflake, 
  Package, 
  ShieldCheck,
  Database,
  KeyRound,
  CheckCircle2,
  ExternalLink,
  HelpCircle
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { CATEGORIES } from '../data/products';

const SAMPLE_IMAGES = [
  { label: 'Cerveja Long Neck', url: 'https://images.unsplash.com/photo-1618886614638-80e3c15cd819?w=600&auto=format&fit=crop&q=80' },
  { label: 'Cerveja Lata / Copo', url: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&auto=format&fit=crop&q=80' },
  { label: 'Whisky / Destilado', url: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=600&auto=format&fit=crop&q=80' },
  { label: 'Gin / Taça', url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80' },
  { label: 'Vodka & Energético', url: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?w=600&auto=format&fit=crop&q=80' },
  { label: 'Petisco / Salgadinho', url: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&auto=format&fit=crop&q=80' },
  { label: 'Gelo / Carvão', url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80' }
];

const INITIAL_FORM_STATE = {
  name: '',
  category: 'cervejas',
  price: '',
  oldPrice: '',
  unit: 'Unidade 350ml',
  badge: '',
  isCold: true,
  description: '',
  image: 'https://images.unsplash.com/photo-1618886614638-80e3c15cd819?w=600&auto=format&fit=crop&q=80',
  rating: 5.0
};

export default function AdminModal() {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetToDefaultProducts,
    syncInitialCatalogToSupabase,
    isDatabaseConnected,
    isLoadingDatabase,
    isSupabaseConfigured,
    refetchProducts,
    isAdminAuthenticated,
    loginAdmin,
    changeAdminPassword,
    logoutAdmin,
    isAdminModalOpen,
    setIsAdminModalOpen
  } = useProducts();

  // Estados locais
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'credentials' | 'database'
  const [passwordInput, setPasswordInput] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [searchAdmin, setSearchAdmin] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('todos');

  // Estado do formulário de criação/edição de produtos
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [formError, setFormError] = useState('');
  const [successToast, setSuccessToast] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // Estados de alteração de credenciais
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  // Estado de sincronização
  const [syncStatusMsg, setSyncStatusMsg] = useState('');

  if (!isAdminModalOpen) return null;

  const showToast = (message) => {
    setSuccessToast(message);
    setTimeout(() => setSuccessToast(''), 3000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    try {
      const res = await loginAdmin(passwordInput);
      if (!res.success) {
        setLoginError(res.message);
      } else {
        setPasswordInput('');
        showToast('Login de administrador realizado com sucesso!');
      }
    } catch {
      setLoginError('Falha ao autenticar. Tente novamente.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSavePassword = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (newPassword.length < 6) {
      setPasswordError('A nova senha deve ter no mínimo 6 caracteres.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('As senhas digitadas não coincidem.');
      return;
    }

    setIsSavingPassword(true);
    try {
      const res = await changeAdminPassword(newPassword);
      if (res.success) {
        setPasswordSuccess(res.message);
        setNewPassword('');
        setConfirmPassword('');
        showToast(res.message);
      } else {
        setPasswordError(res.message);
      }
    } catch {
      setPasswordError('Erro ao atualizar senha.');
    } finally {
      setIsSavingPassword(false);
    }
  };

  const handleSyncToSupabase = async () => {
    setSyncStatusMsg('Sincronizando produtos com o Supabase...');
    const res = await syncInitialCatalogToSupabase();
    setSyncStatusMsg(res.message);
    showToast(res.message);
    setTimeout(() => setSyncStatusMsg(''), 5000);
  };

  const openCreateForm = () => {
    setIsEditing(true);
    setCurrentEditId(null);
    setFormData(INITIAL_FORM_STATE);
    setFormError('');
  };

  const openEditForm = (product) => {
    setIsEditing(true);
    setCurrentEditId(product.id);
    setFormData({
      name: product.name,
      category: product.category || 'cervejas',
      price: product.price ? String(product.price) : '',
      oldPrice: product.oldPrice ? String(product.oldPrice) : '',
      unit: product.unit || '',
      badge: product.badge || '',
      isCold: Boolean(product.isCold),
      description: product.description || '',
      image: product.image || '',
      rating: product.rating || 5.0
    });
    setFormError('');
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name.trim()) {
      setFormError('Por favor, informe o nome do produto.');
      return;
    }

    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      setFormError('Por favor, informe um preço válido (ex: 8.90).');
      return;
    }

    if (currentEditId) {
      await updateProduct(currentEditId, formData);
      showToast(`Produto "${formData.name}" atualizado no catálogo!`);
    } else {
      await addProduct(formData);
      showToast(`Produto "${formData.name}" adicionado com sucesso!`);
    }

    setIsEditing(false);
    setCurrentEditId(null);
    setFormData(INITIAL_FORM_STATE);
  };

  const handleDeleteProduct = async (id, name) => {
    await deleteProduct(id);
    setConfirmDeleteId(null);
    showToast(`Produto "${name}" removido com sucesso!`);
  };

  const handleResetCatalog = () => {
    if (window.confirm('Tem certeza que deseja restaurar o catálogo original padrão?')) {
      resetToDefaultProducts();
      showToast('Catálogo original restaurado!');
    }
  };

  // Filtragem da lista
  const filteredProducts = products.filter(p => {
    const matchesCategory = categoryFilter === 'todos' || p.category === categoryFilter;
    const matchesSearch = 
      searchAdmin.trim() === '' ||
      p.name.toLowerCase().includes(searchAdmin.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchAdmin.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0B0F0E]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-fade-in">
      {/* Toast de Sucesso */}
      {successToast && (
        <div className="fixed top-6 right-6 z-60 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#18B66A] text-[#0B0F0E] font-black text-xs shadow-2xl shadow-[#18B66A]/30 animate-bounce">
          <Check className="w-4 h-4" />
          <span>{successToast}</span>
        </div>
      )}

      <div className="relative w-full max-w-5xl bg-[#121816] border border-[#1F2925] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header Superior do Painel */}
        <div className="p-4 sm:p-6 bg-[#0B0F0E] border-b border-[#1F2925] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#18B66A]/10 text-[#18B66A] border border-[#18B66A]/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-[#F7F7F5] tracking-tight">
                  Painel de Controle ADM
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-[#18B66A]/20 text-[#18B66A] border border-[#18B66A]/30">
                  MF Conveniências
                </span>
              </div>
              <p className="text-xs text-[#A8B0AC]">
                Gerenciamento de produtos, banco de dados e credenciais de acesso.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Status do Banco */}
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[11px] font-bold ${
              isSupabaseConfigured && isDatabaseConnected
                ? 'bg-[#18B66A]/10 text-[#18B66A] border-[#18B66A]/30'
                : 'bg-[#FFB800]/10 text-[#FFB800] border-[#FFB800]/30'
            }`}>
              <Database className="w-3.5 h-3.5" />
              <span>
                {isSupabaseConfigured && isDatabaseConnected
                  ? 'Supabase Conectado'
                  : 'Modo Local / Fallback'}
              </span>
            </div>

            {isAdminAuthenticated && (
              <button
                onClick={logoutAdmin}
                className="px-3 py-1.5 rounded-xl bg-[#0B0F0E] hover:bg-[#1F2925] text-[#A8B0AC] hover:text-red-400 text-xs font-bold transition-colors border border-[#1F2925]"
                title="Sair do modo administrador"
              >
                Sair
              </button>
            )}
            <button
              onClick={() => setIsAdminModalOpen(false)}
              className="p-2 rounded-xl bg-[#0B0F0E] hover:bg-[#1F2925] text-[#A8B0AC] hover:text-[#F7F7F5] transition-colors border border-[#1F2925]"
              title="Fechar painel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Se NÃO autenticado: Tela de Login */}
        {!isAdminAuthenticated ? (
          <div className="p-6 sm:p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#18B66A]/10 border border-[#18B66A]/20 flex items-center justify-center text-[#18B66A] mb-4 shadow-lg shadow-[#18B66A]/10">
              <Lock className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-black text-[#F7F7F5] mb-2">
              Acesso Restrito ao Administrador
            </h3>
            <p className="text-xs sm:text-sm text-[#A8B0AC] max-w-sm mb-6 leading-relaxed">
              Insira sua senha de administrador para gerenciar o catálogo, banco de dados e credenciais da conveniência.
            </p>

            <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
              <div>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Digite a senha de administrador..."
                  autoFocus
                  className="w-full px-4 py-3 bg-[#0B0F0E] border border-[#1F2925] rounded-2xl text-sm text-[#F7F7F5] placeholder-[#A8B0AC]/50 focus:outline-none focus:border-[#18B66A] text-center tracking-widest transition-all"
                />
              </div>

              {loginError && (
                <div className="flex items-center justify-center gap-1.5 text-xs text-red-400 font-medium">
                  <AlertCircle className="w-4 h-4" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3 px-4 rounded-2xl bg-[#18B66A] hover:bg-[#087A47] text-[#0B0F0E] font-black text-xs uppercase tracking-wider shadow-lg shadow-[#18B66A]/20 transition-all flex items-center justify-center gap-2"
              >
                {isLoggingIn ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verificando...</span>
                  </>
                ) : (
                  <span>Acessar Painel ADM</span>
                )}
              </button>

              <div className="pt-2">
                <p className="text-[11px] text-[#A8B0AC]/70">
                  Senha inicial padrão: <span className="text-[#18B66A] font-mono font-bold">admin123</span> (você pode alterá-la após entrar).
                </p>
              </div>
            </form>
          </div>
        ) : (
          /* PAINEL ADMINISTRATIVO AUTENTICADO */
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar space-y-6">
            
            {/* Navegação por Abas */}
            <div className="flex items-center gap-2 border-b border-[#1F2925] pb-3">
              <button
                type="button"
                onClick={() => { setActiveTab('products'); setIsEditing(false); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'products'
                    ? 'bg-[#18B66A] text-[#0B0F0E]'
                    : 'bg-[#0B0F0E] text-[#A8B0AC] hover:text-[#F7F7F5] border border-[#1F2925]'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Gerenciar Produtos ({products.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('credentials')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'credentials'
                    ? 'bg-[#18B66A] text-[#0B0F0E]'
                    : 'bg-[#0B0F0E] text-[#A8B0AC] hover:text-[#F7F7F5] border border-[#1F2925]'
                }`}
              >
                <KeyRound className="w-4 h-4" />
                <span>Credenciais do ADM</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('database')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'database'
                    ? 'bg-[#18B66A] text-[#0B0F0E]'
                    : 'bg-[#0B0F0E] text-[#A8B0AC] hover:text-[#F7F7F5] border border-[#1F2925]'
                }`}
              >
                <Database className="w-4 h-4" />
                <span>Banco de Dados</span>
              </button>
            </div>

            {/* ABA 1: GERENCIAR PRODUTOS */}
            {activeTab === 'products' && (
              <div className="space-y-6">
                {/* Barra de Ações Rápidas & Estatísticas */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0B0F0E] p-4 rounded-2xl border border-[#1F2925]">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#121816] border border-[#1F2925] text-xs text-[#A8B0AC]">
                      <Package className="w-4 h-4 text-[#18B66A]" />
                      <span>Total: <strong className="text-[#F7F7F5] font-black">{products.length}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#121816] border border-[#1F2925] text-xs text-[#A8B0AC]">
                      <Snowflake className="w-4 h-4 text-cyan-400" />
                      <span>Geladas: <strong className="text-[#F7F7F5] font-black">{products.filter(p => p.isCold).length}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={refetchProducts}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#121816] hover:bg-[#1F2925] border border-[#1F2925] text-[#A8B0AC] hover:text-[#F7F7F5] text-xs font-semibold transition-colors"
                      title="Recarregar produtos do banco"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isLoadingDatabase ? 'animate-spin' : ''}`} />
                      <span>Atualizar</span>
                    </button>

                    <button
                      type="button"
                      onClick={openCreateForm}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#18B66A] hover:bg-[#087A47] text-[#0B0F0E] font-black text-xs uppercase tracking-wider shadow-lg shadow-[#18B66A]/20 transition-all hover:scale-105"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Novo Produto</span>
                    </button>
                  </div>
                </div>

                {/* FORMULÁRIO DE CRIAÇÃO / EDIÇÃO */}
                {isEditing && (
                  <div className="p-5 sm:p-6 rounded-3xl bg-[#0B0F0E] border-2 border-[#18B66A]/40 shadow-2xl relative animate-fade-in">
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1F2925]">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-xl bg-[#18B66A]/10 text-[#18B66A]">
                          {currentEditId ? <Edit3 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                        </div>
                        <h3 className="text-base font-black text-[#F7F7F5]">
                          {currentEditId ? 'Editar Produto' : 'Cadastrar Novo Produto'}
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="p-1.5 rounded-lg bg-[#121816] text-[#A8B0AC] hover:text-[#F7F7F5] border border-[#1F2925]"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {formError && (
                      <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{formError}</span>
                      </div>
                    )}

                    <form onSubmit={handleSaveProduct} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                        {/* Nome do Produto */}
                        <div className="sm:col-span-8">
                          <label className="block text-[11px] font-bold uppercase text-[#A8B0AC] mb-1">
                            Nome do Produto *
                          </label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Ex: Cerveja Heineken Long Neck 330ml"
                            className="w-full px-3.5 py-2.5 bg-[#121816] border border-[#1F2925] rounded-xl text-xs text-[#F7F7F5] focus:outline-none focus:border-[#18B66A]"
                            required
                          />
                        </div>

                        {/* Categoria */}
                        <div className="sm:col-span-4">
                          <label className="block text-[11px] font-bold uppercase text-[#A8B0AC] mb-1">
                            Categoria *
                          </label>
                          <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-3 py-2.5 bg-[#121816] border border-[#1F2925] rounded-xl text-xs text-[#F7F7F5] focus:outline-none focus:border-[#18B66A]"
                          >
                            {CATEGORIES.filter(c => c.id !== 'todos').map(c => (
                              <option key={c.id} value={c.id}>{c.emoji} {c.label}</option>
                            ))}
                          </select>
                        </div>

                        {/* Preço Atual */}
                        <div className="sm:col-span-4">
                          <label className="block text-[11px] font-bold uppercase text-[#A8B0AC] mb-1">
                            Preço Atual (R$) *
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            placeholder="Ex: 8.99"
                            className="w-full px-3.5 py-2.5 bg-[#121816] border border-[#1F2925] rounded-xl text-xs text-[#18B66A] font-bold focus:outline-none focus:border-[#18B66A]"
                            required
                          />
                        </div>

                        {/* Preço Anterior (Promoção) */}
                        <div className="sm:col-span-4">
                          <label className="block text-[11px] font-bold uppercase text-[#A8B0AC] mb-1">
                            Preço De / Anterior (Opcional)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={formData.oldPrice}
                            onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
                            placeholder="Ex: 10.50"
                            className="w-full px-3.5 py-2.5 bg-[#121816] border border-[#1F2925] rounded-xl text-xs text-[#A8B0AC] focus:outline-none focus:border-[#18B66A]"
                          />
                        </div>

                        {/* Unidade / Volume */}
                        <div className="sm:col-span-4">
                          <label className="block text-[11px] font-bold uppercase text-[#A8B0AC] mb-1">
                            Unidade / Medida
                          </label>
                          <input
                            type="text"
                            value={formData.unit}
                            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                            placeholder="Ex: Unidade 330ml, Garrafa 2L, Saco 5kg"
                            className="w-full px-3.5 py-2.5 bg-[#121816] border border-[#1F2925] rounded-xl text-xs text-[#F7F7F5] focus:outline-none focus:border-[#18B66A]"
                          />
                        </div>

                        {/* Badge / Selo */}
                        <div className="sm:col-span-6">
                          <label className="block text-[11px] font-bold uppercase text-[#A8B0AC] mb-1">
                            Badge / Selo (Opcional)
                          </label>
                          <input
                            type="text"
                            value={formData.badge}
                            onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                            placeholder="Ex: Super Gelada, Mais Vendido, PROMO"
                            className="w-full px-3.5 py-2.5 bg-[#121816] border border-[#1F2925] rounded-xl text-xs text-[#F7F7F5] focus:outline-none focus:border-[#18B66A]"
                          />
                        </div>

                        {/* Checkbox Super Gelada */}
                        <div className="sm:col-span-6 flex items-center pt-5">
                          <label className="flex items-center gap-2.5 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={formData.isCold}
                              onChange={(e) => setFormData({ ...formData, isCold: e.target.checked })}
                              className="w-4 h-4 rounded border-[#1F2925] text-[#18B66A] focus:ring-[#18B66A] focus:ring-offset-[#0B0F0E]"
                            />
                            <span className="text-xs font-bold text-[#F7F7F5] flex items-center gap-1">
                              <Snowflake className="w-3.5 h-3.5 text-cyan-400" />
                              Item gelado no ponto (exibe selo de super gelada)
                            </span>
                          </label>
                        </div>

                        {/* Imagem do Produto */}
                        <div className="sm:col-span-12">
                          <label className="block text-[11px] font-bold uppercase text-[#A8B0AC] mb-1">
                            URL da Imagem
                          </label>
                          <div className="flex flex-col sm:flex-row gap-3 items-center">
                            <input
                              type="url"
                              value={formData.image}
                              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                              placeholder="Cole o link da foto do produto..."
                              className="w-full px-3.5 py-2.5 bg-[#121816] border border-[#1F2925] rounded-xl text-xs text-[#F7F7F5] focus:outline-none focus:border-[#18B66A]"
                            />
                            <div className="w-12 h-12 rounded-xl bg-[#121816] border border-[#1F2925] overflow-hidden flex-shrink-0 flex items-center justify-center">
                              {formData.image ? (
                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                              ) : (
                                <ImageIcon className="w-5 h-5 text-[#A8B0AC]/40" />
                              )}
                            </div>
                          </div>

                          {/* Fotos Rápidas */}
                          <div className="mt-2 flex flex-wrap gap-1.5 items-center">
                            <span className="text-[10px] text-[#A8B0AC]/60 font-semibold uppercase">Fotos rápidas:</span>
                            {SAMPLE_IMAGES.map((sample, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => setFormData({ ...formData, image: sample.url })}
                                className="px-2 py-0.5 rounded-lg bg-[#121816] hover:bg-[#1F2925] border border-[#1F2925] text-[10px] text-[#A8B0AC] hover:text-[#18B66A] transition-colors"
                              >
                                {sample.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Descrição */}
                        <div className="sm:col-span-12">
                          <label className="block text-[11px] font-bold uppercase text-[#A8B0AC] mb-1">
                            Descrição do Produto
                          </label>
                          <textarea
                            rows={2}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Ex: Cerveja puro malte gelada no ponto perfeito para o seu churrasco ou fim de semana."
                            className="w-full px-3.5 py-2 bg-[#121816] border border-[#1F2925] rounded-xl text-xs text-[#F7F7F5] focus:outline-none focus:border-[#18B66A]"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1F2925]">
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="px-4 py-2 rounded-xl bg-[#121816] hover:bg-[#1F2925] text-[#A8B0AC] hover:text-[#F7F7F5] text-xs font-bold transition-colors border border-[#1F2925]"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-xl bg-[#18B66A] hover:bg-[#087A47] text-[#0B0F0E] font-black text-xs uppercase tracking-wider shadow-lg shadow-[#18B66A]/20 transition-all"
                        >
                          {currentEditId ? 'Salvar Alterações' : 'Cadastrar no Banco'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* FILTROS E BUSCA */}
                <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
                  <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8B0AC]/60" />
                    <input
                      type="text"
                      value={searchAdmin}
                      onChange={(e) => setSearchAdmin(e.target.value)}
                      placeholder="Buscar produto por nome..."
                      className="w-full pl-9 pr-3 py-2 bg-[#0B0F0E] border border-[#1F2925] rounded-xl text-xs text-[#F7F7F5] placeholder-[#A8B0AC]/50 focus:outline-none focus:border-[#18B66A]"
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                    <span className="text-[11px] text-[#A8B0AC] font-semibold whitespace-nowrap">Categoria:</span>
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="px-3 py-1.5 bg-[#0B0F0E] border border-[#1F2925] rounded-xl text-xs text-[#F7F7F5] focus:outline-none focus:border-[#18B66A]"
                    >
                      <option value="todos">Todas as Categorias</option>
                      {CATEGORIES.filter(c => c.id !== 'todos').map(c => (
                        <option key={c.id} value={c.id}>{c.emoji} {c.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* TABELA DE PRODUTOS */}
                <div className="rounded-2xl border border-[#1F2925] overflow-hidden bg-[#0B0F0E]">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-[#A8B0AC]">
                      <thead className="bg-[#121816] text-[#A8B0AC] uppercase font-black tracking-wider text-[10px] border-b border-[#1F2925]">
                        <tr>
                          <th className="py-3 px-4">Produto</th>
                          <th className="py-3 px-3">Categoria</th>
                          <th className="py-3 px-3">Preço</th>
                          <th className="py-3 px-3">Selo / Gelada</th>
                          <th className="py-3 px-4 text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1F2925]">
                        {filteredProducts.length > 0 ? (
                          filteredProducts.map((prod) => (
                            <tr key={prod.id} className="hover:bg-[#121816]/60 transition-colors">
                              {/* Produto e foto */}
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={prod.image}
                                    alt={prod.name}
                                    className="w-10 h-10 rounded-lg object-cover bg-[#121816] flex-shrink-0"
                                  />
                                  <div className="min-w-0 max-w-xs sm:max-w-md">
                                    <span className="font-bold text-[#F7F7F5] block truncate">
                                      {prod.name}
                                    </span>
                                    <span className="text-[11px] text-[#A8B0AC]/70">
                                      {prod.unit}
                                    </span>
                                  </div>
                                </div>
                              </td>

                              {/* Categoria */}
                              <td className="py-3 px-3">
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#121816] text-[#A8B0AC] border border-[#1F2925] capitalize">
                                  {prod.category}
                                </span>
                              </td>

                              {/* Preço */}
                              <td className="py-3 px-3 font-extrabold text-[#F7F7F5] whitespace-nowrap">
                                R$ {Number(prod.price).toFixed(2).replace('.', ',')}
                                {prod.oldPrice && (
                                  <span className="block text-[10px] text-[#A8B0AC]/60 font-normal line-through">
                                    De: R$ {Number(prod.oldPrice).toFixed(2).replace('.', ',')}
                                  </span>
                                )}
                              </td>

                              {/* Selo / Gelada */}
                              <td className="py-3 px-3">
                                <div className="flex flex-wrap items-center gap-1.5">
                                  {prod.isCold && (
                                    <span className="flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0B0F0E] text-[#18B66A] border border-[#18B66A]/40">
                                      <Snowflake className="w-3 h-3" />
                                      Gelada
                                    </span>
                                  )}
                                  {prod.badge && (
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFB800]/20 text-[#FFB800] border border-[#FFB800]/30">
                                      {prod.badge}
                                    </span>
                                  )}
                                </div>
                              </td>

                              {/* Botões de Ação */}
                              <td className="py-3 px-4 text-right whitespace-nowrap">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => openEditForm(prod)}
                                    className="p-1.5 rounded-lg bg-[#121816] hover:bg-[#1F2925] text-[#A8B0AC] hover:text-[#18B66A] transition-colors border border-[#1F2925]"
                                    title="Editar produto"
                                  >
                                    <Edit3 className="w-4 h-4" />
                                  </button>

                                  {confirmDeleteId === prod.id ? (
                                    <div className="flex items-center gap-1 animate-fade-in">
                                      <button
                                        type="button"
                                        onClick={() => handleDeleteProduct(prod.id, prod.name)}
                                        className="px-2 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white text-[11px] font-bold"
                                        title="Confirmar exclusão"
                                      >
                                        Excluir
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => setConfirmDeleteId(null)}
                                        className="px-2 py-1 rounded-lg bg-[#121816] text-[#A8B0AC] text-[11px] border border-[#1F2925]"
                                      >
                                        Não
                                      </button>
                                    </div>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => setConfirmDeleteId(prod.id)}
                                      className="p-1.5 rounded-lg bg-[#121816] hover:bg-red-500/20 text-[#A8B0AC] hover:text-red-400 transition-colors border border-[#1F2925]"
                                      title="Excluir produto"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="py-8 text-center text-[#A8B0AC]/60">
                              Nenhum produto cadastrado com os filtros aplicados.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ABA 2: CREDENCIAIS DO ADMINISTRADOR */}
            {activeTab === 'credentials' && (
              <div className="max-w-xl mx-auto space-y-6 animate-fade-in">
                <div className="p-6 rounded-3xl bg-[#0B0F0E] border border-[#1F2925]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-2xl bg-[#18B66A]/10 text-[#18B66A] border border-[#18B66A]/20">
                      <KeyRound className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-[#F7F7F5]">
                        Alterar Senha do Administrador
                      </h3>
                      <p className="text-xs text-[#A8B0AC]">
                        A nova senha será salva diretamente no banco de dados e terá efeito imediato em todos os dispositivos.
                      </p>
                    </div>
                  </div>

                  {passwordSuccess && (
                    <div className="mb-4 p-3 rounded-xl bg-[#18B66A]/15 border border-[#18B66A]/40 text-[#18B66A] text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                      <span>{passwordSuccess}</span>
                    </div>
                  )}

                  {passwordError && (
                    <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{passwordError}</span>
                    </div>
                  )}

                  <form onSubmit={handleSavePassword} className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-[#A8B0AC] mb-1">
                        Nova Senha de Acesso
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Mínimo 6 caracteres..."
                        required
                        className="w-full px-3.5 py-2.5 bg-[#121816] border border-[#1F2925] rounded-xl text-xs text-[#F7F7F5] focus:outline-none focus:border-[#18B66A]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase text-[#A8B0AC] mb-1">
                        Confirmar Nova Senha
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Repita a nova senha..."
                        required
                        className="w-full px-3.5 py-2.5 bg-[#121816] border border-[#1F2925] rounded-xl text-xs text-[#F7F7F5] focus:outline-none focus:border-[#18B66A]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSavingPassword}
                      className="w-full py-3 px-4 rounded-xl bg-[#18B66A] hover:bg-[#087A47] text-[#0B0F0E] font-black text-xs uppercase tracking-wider shadow-lg shadow-[#18B66A]/20 transition-all flex items-center justify-center gap-2"
                    >
                      {isSavingPassword ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Gravando no Banco...</span>
                        </>
                      ) : (
                        <span>Salvar Nova Senha</span>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* ABA 3: STATUS DO BANCO DE DADOS & INSTRUÇÕES */}
            {activeTab === 'database' && (
              <div className="space-y-6 animate-fade-in">
                <div className="p-6 rounded-3xl bg-[#0B0F0E] border border-[#1F2925] space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-[#18B66A]/10 text-[#18B66A] border border-[#18B66A]/20">
                      <Database className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-[#F7F7F5]">
                        Conexão com Banco de Dados Supabase (PostgreSQL)
                      </h3>
                      <p className="text-xs text-[#A8B0AC]">
                        Armazenamento em nuvem de alta performance para produtos e credenciais da MF Conveniências.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {/* Card de Status */}
                    <div className="p-4 rounded-2xl bg-[#121816] border border-[#1F2925]">
                      <span className="text-[11px] font-bold text-[#A8B0AC] block mb-1">Status Atual:</span>
                      <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${
                          isSupabaseConfigured && isDatabaseConnected
                            ? 'bg-[#18B66A] animate-pulse'
                            : 'bg-[#FFB800]'
                        }`} />
                        <span className="text-sm font-bold text-[#F7F7F5]">
                          {isSupabaseConfigured && isDatabaseConnected
                            ? 'Banco de Dados Ativo e Conectado'
                            : 'Operando em Modo Local / Fallback'}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#A8B0AC] mt-2 leading-relaxed">
                        {isSupabaseConfigured && isDatabaseConnected
                          ? 'Suas alterações (adicionar, editar, excluir produtos e senha) são gravadas em tempo real na nuvem do Supabase.'
                          : 'As credenciais do Supabase ainda não foram preenchidas no arquivo .env. O sistema funciona localmente sem interrupção.'}
                      </p>
                    </div>

                    {/* Ações de Sincronização */}
                    <div className="p-4 rounded-2xl bg-[#121816] border border-[#1F2925] flex flex-col justify-between">
                      <div>
                        <span className="text-[11px] font-bold text-[#A8B0AC] block mb-1">Sincronização em Massa:</span>
                        <p className="text-[11px] text-[#A8B0AC] leading-relaxed">
                          Deseja enviar todos os itens padrão do catálogo para a tabela do Supabase de uma vez só?
                        </p>
                      </div>

                      <div className="pt-3">
                        <button
                          type="button"
                          onClick={handleSyncToSupabase}
                          disabled={!isSupabaseConfigured}
                          className={`w-full py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                            isSupabaseConfigured
                              ? 'bg-[#18B66A] hover:bg-[#087A47] text-[#0B0F0E] shadow-md shadow-[#18B66A]/20'
                              : 'bg-[#1F2925] text-[#A8B0AC]/40 cursor-not-allowed'
                          }`}
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Enviar Catálogo Padrão para o Supabase</span>
                        </button>
                        {syncStatusMsg && (
                          <span className="block text-[11px] text-[#18B66A] mt-1.5 text-center font-medium">
                            {syncStatusMsg}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Passo a Passo para Conectar */}
                  <div className="pt-4 border-t border-[#1F2925] space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#18B66A] flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4" />
                      Como Conectar seu Projeto Supabase em 3 Passos:
                    </h4>
                    
                    <ol className="text-xs text-[#A8B0AC] space-y-2 list-decimal list-inside leading-relaxed">
                      <li>
                        Crie uma conta gratuita em <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-[#18B66A] underline inline-flex items-center gap-0.5">supabase.com <ExternalLink className="w-3 h-3" /></a> e crie um novo projeto (ex: <code className="text-[#F7F7F5] bg-[#121816] px-1 py-0.5 rounded">mf-conveniencias</code>).
                      </li>
                      <li>
                        No menu lateral do Supabase, clique em <strong>SQL Editor</strong> e execute o script localizado em <code className="text-[#18B66A] bg-[#121816] px-1 py-0.5 rounded font-mono">supabase/schema.sql</code> deste projeto.
                      </li>
                      <li>
                        Em <strong>Project Settings &gt; API</strong>, copie a <strong>Project URL</strong> e a <strong>anon key</strong> e cole no arquivo <code className="text-[#F7F7F5] bg-[#121816] px-1 py-0.5 rounded font-mono">.env</code> do projeto.
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
