import React, { useState, useRef } from 'react';
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
  LogOut,
  ChevronDown,
  ChevronUp,
  Upload,
  Camera,
  Link as LinkIcon
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { CATEGORIES } from '../data/products';
import ThemeToggle from './ThemeToggle';

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

// Classes reutilizáveis — seguem os tokens de tema definidos em index.css
const INPUT_CLS =
  'w-full px-3.5 py-2.5 bg-surface-2 border border-line rounded-xl text-xs text-ink placeholder:text-muted/60 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/30 transition';
const LABEL_CLS = 'block text-[11px] font-bold uppercase tracking-wide text-muted mb-1';
const PRIMARY_BTN =
  'bg-brand hover:bg-brand-strong text-on-brand font-black uppercase tracking-wider shadow-md shadow-brand/25 active:scale-95 transition disabled:opacity-60 disabled:cursor-not-allowed';
const ICON_BTN =
  'grid size-9 flex-none place-items-center rounded-full bg-surface-2 text-ink border border-line transition hover:bg-line active:scale-90';

export default function AdminModal() {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetToDefaultProducts,
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
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'credentials'
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

  // Upload e gerenciamento de imagem
  const fileInputRef = useRef(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [isProcessingImage, setIsProcessingImage] = useState(false);

  // Estados de alteração de credenciais
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [isSavingPassword, setIsSavingPassword] = useState(false);


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


  const handleImageFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFormError('Por favor, selecione um arquivo de imagem válido (PNG, JPG, WEBP, etc).');
      return;
    }

    setIsProcessingImage(true);
    setFormError('');

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        try {
          const maxDim = 800;
          let width = img.width;
          let height = img.height;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
          setFormData(prev => ({ ...prev, image: compressedDataUrl }));
        } catch {
          setFormData(prev => ({ ...prev, image: event.target.result }));
        } finally {
          setIsProcessingImage(false);
        }
      };
      img.onerror = () => {
        setFormError('Não foi possível processar a imagem selecionada.');
        setIsProcessingImage(false);
      };
      img.src = event.target.result;
    };
    reader.onerror = () => {
      setFormError('Erro ao ler arquivo do dispositivo.');
      setIsProcessingImage(false);
    };
    reader.readAsDataURL(file);
  };

  const openCreateForm = () => {
    setIsEditing(true);
    setCurrentEditId(null);
    setShowUrlInput(false);
    setFormData(INITIAL_FORM_STATE);
    setFormError('');
  };

  const openEditForm = (product) => {
    setIsEditing(true);
    setCurrentEditId(product.id);
    setShowUrlInput(false);
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

  const isOnline = isSupabaseConfigured && isDatabaseConnected;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/55 backdrop-blur-[2px] flex items-center justify-center p-3 sm:p-5 animate-fade-in">
      {/* Toast de Sucesso */}
      {successToast && (
        <div className="fixed top-6 right-6 z-60 flex items-center gap-2 px-4 py-2.5 rounded-full bg-ink text-surface font-bold text-xs shadow-2xl animate-rise">
          <span className="grid size-5 place-items-center rounded-full bg-brand text-on-brand">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </span>
          <span>{successToast}</span>
        </div>
      )}

      <div className="relative w-full max-w-5xl bg-app text-ink border border-line rounded-[28px] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-sheet-up">
        
        {/* Header Superior do Painel — mesmo estilo do topo do site */}
        <div className="p-4 sm:p-5 bg-header text-on-header border-b border-line">
          {/* Linha 1: Logo + Título + Ações */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="grid size-11 flex-none place-items-center rounded-2xl bg-ink text-brand shadow-sm">
                <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="min-w-0">
                <h2 className="text-base sm:text-xl font-black tracking-tight truncate font-display">
                  Painel de Controle ADM
                </h2>
                <p className="text-[11px] sm:text-xs font-medium opacity-75 truncate">
                  Gerenciamento de produtos e credenciais de acesso.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-none">
              <ThemeToggle />
              <button
                onClick={() => setIsAdminModalOpen(false)}
                className="group grid size-10 flex-none place-items-center rounded-full bg-on-header/10 text-on-header transition hover:bg-on-header/15 active:scale-90"
                title="Fechar painel"
                aria-label="Fechar painel"
              >
                <X className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
              </button>
            </div>
          </div>

          {/* Linha 2: Status do banco + Sair */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-on-header/10 text-[11px] font-bold">
              <span className="relative flex size-2">
                <span className={`absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping ${isOnline ? 'bg-success' : 'bg-danger'}`} />
                <span className={`relative inline-flex size-2 rounded-full ${isOnline ? 'bg-success' : 'bg-danger'}`} />
              </span>
              <Database className="w-3 h-3" />
              <span>{isOnline ? 'Supabase Conectado' : 'Modo Local'}</span>
            </div>

            {isAdminAuthenticated && (
              <button
                onClick={logoutAdmin}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-on-header/10 hover:bg-on-header/15 text-[11px] font-bold transition active:scale-95"
                title="Sair do modo administrador"
              >
                <LogOut className="w-3 h-3" />
                <span>Sair</span>
              </button>
            )}
          </div>
        </div>

        {/* Se NÃO autenticado: Tela de Login */}
        {!isAdminAuthenticated ? (
          <div className="p-6 sm:p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-brand text-on-brand flex items-center justify-center mb-4 shadow-lg shadow-brand/30 animate-pop">
              <Lock className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-black text-ink mb-2">
              Acesso Restrito ao Administrador
            </h3>
            <p className="text-xs sm:text-sm text-muted max-w-sm mb-6 leading-relaxed">
              Insira sua senha de administrador para gerenciar o catálogo e credenciais da conveniência.
            </p>

            <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
              <div>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Digite a senha de administrador..."
                  autoFocus
                  className="w-full px-4 py-3.5 bg-surface border border-line rounded-full text-sm text-ink placeholder:text-muted/60 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/30 text-center tracking-widest transition shadow-xs"
                />
              </div>

              {loginError && (
                <div className="flex items-center justify-center gap-1.5 text-xs text-danger font-semibold">
                  <AlertCircle className="w-4 h-4" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoggingIn}
                className={`w-full py-3.5 px-4 rounded-full text-xs flex items-center justify-center gap-2 ${PRIMARY_BTN}`}
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


            </form>
          </div>
        ) : (
          /* PAINEL ADMINISTRATIVO AUTENTICADO */
          <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-5">
            
            {/* Navegação por Abas — controle segmentado */}
            <div className="grid grid-cols-2 gap-1.5 p-1.5 rounded-full bg-surface border border-line">
              <button
                type="button"
                onClick={() => { setActiveTab('products'); setIsEditing(false); }}
                className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all active:scale-[0.98] ${
                  activeTab === 'products'
                    ? 'bg-brand text-on-brand shadow-sm'
                    : 'text-muted hover:text-ink hover:bg-surface-2'
                }`}
              >
                <Package className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">Gerenciar Produtos ({products.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('credentials')}
                className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all active:scale-[0.98] ${
                  activeTab === 'credentials'
                    ? 'bg-brand text-on-brand shadow-sm'
                    : 'text-muted hover:text-ink hover:bg-surface-2'
                }`}
              >
                <KeyRound className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">Credenciais do ADM</span>
              </button>
            </div>

            {/* ABA 1: GERENCIAR PRODUTOS */}
            {activeTab === 'products' && (
              <div className="space-y-4 animate-fade-in">
                {/* Barra de Ações Rápidas */}
                <div className="flex items-center justify-between gap-2 bg-surface p-3 rounded-2xl border border-line shadow-xs">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-2 text-[11px] text-muted" title="Total de produtos">
                      <Package className="w-3.5 h-3.5 text-ink" />
                      <strong className="text-ink">{products.length}</strong>
                      <span className="hidden sm:inline">produtos</span>
                    </span>
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-2 text-[11px] text-muted" title="Produtos gelados">
                      <Snowflake className="w-3.5 h-3.5 text-sky-500" />
                      <strong className="text-ink">{products.filter(p => p.isCold).length}</strong>
                      <span className="hidden sm:inline">gelados</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={refetchProducts}
                      className={ICON_BTN}
                      title="Recarregar produtos do banco"
                      aria-label="Recarregar produtos do banco"
                    >
                      <RefreshCw className={`w-4 h-4 ${isLoadingDatabase ? 'animate-spin' : ''}`} />
                    </button>

                    <button
                      type="button"
                      onClick={openCreateForm}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] sm:text-xs ${PRIMARY_BTN}`}
                    >
                      <Plus className="w-4 h-4 stroke-[3]" />
                      <span>Novo Produto</span>
                    </button>
                  </div>
                </div>



                {/* FILTROS E BUSCA */}
                <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
                  <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                    <input
                      type="text"
                      value={searchAdmin}
                      onChange={(e) => setSearchAdmin(e.target.value)}
                      placeholder="Buscar produto por nome..."
                      className="w-full pl-10 pr-3 py-2.5 bg-surface border border-line rounded-full text-xs text-ink placeholder:text-muted/60 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/30 transition shadow-xs"
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                    <span className="text-[11px] text-muted font-semibold whitespace-nowrap">Categoria:</span>
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="px-3.5 py-2 bg-surface border border-line rounded-full text-xs font-semibold text-ink focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/30 transition shadow-xs"
                    >
                      <option value="todos">Todas as Categorias</option>
                      {CATEGORIES.filter(c => c.id !== 'todos').map(c => (
                        <option key={c.id} value={c.id}>{c.emoji} {c.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* LISTA DE PRODUTOS EM CARDS */}
                <div className="space-y-2.5">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((prod) => (
                      <div
                        key={prod.id}
                        className="bg-surface border border-line rounded-2xl p-3 shadow-xs hover:border-brand hover:shadow-md transition-all"
                      >
                        <div className="flex items-start gap-3">
                          {/* Imagem */}
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover bg-surface-2 flex-shrink-0"
                          />
                          
                          {/* Info do produto */}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs sm:text-sm font-bold text-ink leading-tight line-clamp-2">
                              {prod.name}
                            </h4>
                            <p className="text-[11px] text-muted mt-0.5">
                              {prod.unit}
                            </p>
                            
                            {/* Preço + Badges */}
                            <div className="flex items-center flex-wrap gap-1.5 mt-1.5">
                              <span className="text-sm font-black text-ink font-display">
                                R$ {Number(prod.price).toFixed(2).replace('.', ',')}
                              </span>
                              {prod.oldPrice && (
                                <span className="text-[10px] text-muted/70 line-through">
                                  R$ {Number(prod.oldPrice).toFixed(2).replace('.', ',')}
                                </span>
                              )}
                              {prod.isCold && (
                                <span className="flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[9px] font-bold bg-sky-500/10 text-sky-600 dark:text-sky-400">
                                  <Snowflake className="w-2.5 h-2.5" />
                                  Gelada
                                </span>
                              )}
                              {prod.badge && (
                                <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wide bg-brand text-on-brand">
                                  {prod.badge}
                                </span>
                              )}
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-surface-2 text-muted capitalize">
                                {prod.category}
                              </span>
                            </div>
                          </div>

                          {/* Botões de Ação */}
                          <div className="flex flex-col gap-1.5 flex-shrink-0">
                            <button
                              type="button"
                              onClick={() => openEditForm(prod)}
                              className={`${ICON_BTN} hover:bg-brand hover:text-on-brand hover:border-brand`}
                              title="Editar produto"
                              aria-label={`Editar ${prod.name}`}
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>

                            {confirmDeleteId === prod.id ? (
                              <div className="flex flex-col gap-1 animate-fade-in">
                                <button
                                  type="button"
                                  onClick={() => handleDeleteProduct(prod.id, prod.name)}
                                  className="px-2 py-1.5 rounded-full bg-danger hover:opacity-90 text-white text-[10px] font-bold transition active:scale-95"
                                  title="Confirmar exclusão"
                                >
                                  Sim
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setConfirmDeleteId(null)}
                                  className="px-2 py-1.5 rounded-full bg-surface-2 text-muted text-[10px] font-bold border border-line transition active:scale-95"
                                >
                                  Não
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setConfirmDeleteId(prod.id)}
                                className={`${ICON_BTN} hover:bg-danger/15 hover:text-danger hover:border-danger/30`}
                                title="Excluir produto"
                                aria-label={`Excluir ${prod.name}`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-12 text-center text-muted bg-surface rounded-2xl border border-line">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 bg-surface-2">
                        <Package className="w-6 h-6" />
                      </div>
                      <p className="text-xs font-medium">Nenhum produto encontrado com os filtros aplicados.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ABA 2: CREDENCIAIS DO ADMINISTRADOR */}
            {activeTab === 'credentials' && (
              <div className="max-w-xl mx-auto space-y-6 animate-fade-in">
                <div className="p-6 rounded-3xl bg-surface border border-line shadow-xs">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="grid size-12 flex-none place-items-center rounded-2xl bg-brand text-on-brand shadow-md shadow-brand/25">
                      <KeyRound className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-ink">
                        Alterar Senha do Administrador
                      </h3>
                      <p className="text-xs text-muted">
                        A nova senha será salva diretamente no banco de dados e terá efeito imediato em todos os dispositivos.
                      </p>
                    </div>
                  </div>

                  {passwordSuccess && (
                    <div className="mb-4 p-3 rounded-xl bg-success/10 border border-success/30 text-success text-xs font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                      <span>{passwordSuccess}</span>
                    </div>
                  )}

                  {passwordError && (
                    <div className="mb-4 p-3 rounded-xl bg-danger/10 border border-danger/30 text-danger text-xs font-semibold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{passwordError}</span>
                    </div>
                  )}

                  <form onSubmit={handleSavePassword} className="space-y-4">
                    <div>
                      <label className={LABEL_CLS}>
                        Nova Senha de Acesso
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Mínimo 6 caracteres..."
                        required
                        className={INPUT_CLS}
                      />
                    </div>

                    <div>
                      <label className={LABEL_CLS}>
                        Confirmar Nova Senha
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Repita a nova senha..."
                        required
                        className={INPUT_CLS}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSavingPassword}
                      className={`w-full py-3.5 px-4 rounded-full text-xs flex items-center justify-center gap-2 ${PRIMARY_BTN}`}
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


          </div>
        )}
      </div>

      {/* MODAL DEDICADO DE EDIÇÃO / CADASTRO DE PRODUTOS */}
      {isEditing && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-[2px] flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-2xl bg-surface text-ink border border-line rounded-[28px] shadow-2xl flex flex-col max-h-[92vh] overflow-hidden my-auto animate-sheet-up">
            {/* Header do Modal de Edição */}
            <div className="p-4 sm:p-5 bg-surface border-b border-line flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="grid size-11 flex-none place-items-center rounded-2xl bg-brand text-on-brand shadow-md shadow-brand/25">
                  {currentEditId ? <Edit3 className="w-5 h-5" /> : <Plus className="w-5 h-5 stroke-[3]" />}
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-black text-ink truncate">
                    {currentEditId ? 'Editar Produto' : 'Cadastrar Novo Produto'}
                  </h3>
                  <p className="text-xs text-muted truncate">
                    {currentEditId 
                      ? (formData.name ? `Item: ${formData.name}` : 'Altere os dados e salve.')
                      : 'Preencha os dados para adicionar ao catálogo da conveniência.'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="grid size-9 flex-none place-items-center rounded-full bg-surface-2 text-ink transition hover:bg-line active:scale-90"
                title="Fechar formulário"
                aria-label="Fechar formulário"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Formulário com Scroll Suave */}
            <form onSubmit={handleSaveProduct} className="flex flex-col flex-1 overflow-hidden">
              <div className="p-4 sm:p-6 overflow-y-auto overscroll-contain space-y-4 flex-1">
                {formError && (
                  <div className="p-3 rounded-xl bg-danger/10 border border-danger/30 text-danger text-xs font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  {/* Nome do Produto */}
                  <div className="sm:col-span-8">
                    <label className={LABEL_CLS}>
                      Nome do Produto *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ex: Cerveja Heineken Long Neck 330ml"
                      className={INPUT_CLS}
                      required
                    />
                  </div>

                  {/* Categoria */}
                  <div className="sm:col-span-4">
                    <label className={LABEL_CLS}>
                      Categoria *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className={INPUT_CLS}
                    >
                      {CATEGORIES.filter(c => c.id !== 'todos').map(c => (
                        <option key={c.id} value={c.id}>{c.emoji} {c.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Preço Atual */}
                  <div className="sm:col-span-4">
                    <label className={LABEL_CLS}>
                      Preço Atual (R$) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="Ex: 8.99"
                      className={`${INPUT_CLS} font-black`}
                      required
                    />
                  </div>

                  {/* Preço Anterior (Promoção) */}
                  <div className="sm:col-span-4">
                    <label className={LABEL_CLS}>
                      Preço De / Anterior (Opcional)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.oldPrice}
                      onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
                      placeholder="Ex: 10.50"
                      className={`${INPUT_CLS} text-muted`}
                    />
                  </div>

                  {/* Unidade / Volume */}
                  <div className="sm:col-span-4">
                    <label className={LABEL_CLS}>
                      Unidade / Medida
                    </label>
                    <input
                      type="text"
                      value={formData.unit}
                      onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                      placeholder="Ex: Unidade 330ml, Garrafa 1L"
                      className={INPUT_CLS}
                    />
                  </div>

                  {/* Badge / Selo */}
                  <div className="sm:col-span-6">
                    <label className={LABEL_CLS}>
                      Badge / Selo (Opcional)
                    </label>
                    <input
                      type="text"
                      value={formData.badge}
                      onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                      placeholder="Ex: Super Gelada, Mais Vendido, Original"
                      className={INPUT_CLS}
                    />
                  </div>

                  {/* Checkbox Super Gelada */}
                  <div className="sm:col-span-6 flex items-center pt-1 sm:pt-6">
                    <label className="flex items-center gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={formData.isCold}
                        onChange={(e) => setFormData({ ...formData, isCold: e.target.checked })}
                        className="w-4 h-4 rounded accent-brand"
                      />
                      <span className="text-xs font-bold text-ink flex items-center gap-1">
                        <Snowflake className="w-3.5 h-3.5 text-sky-500" />
                        Item super gelado (destaca no catálogo)
                      </span>
                    </label>
                  </div>

                  {/* SEÇÃO DA IMAGEM DO PRODUTO: UPLOAD LOCAL & LINK */}
                  <div className="sm:col-span-12 p-4 rounded-2xl bg-surface-2 border border-line space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block text-[11px] font-black uppercase text-ink tracking-wider">
                        Foto do Produto
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowUrlInput(!showUrlInput)}
                        className="text-[11px] font-semibold text-muted hover:text-ink flex items-center gap-1 transition-colors"
                      >
                        <LinkIcon className="w-3 h-3" />
                        <span>{showUrlInput ? 'Ocultar Link URL' : 'Ou colar link URL'}</span>
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      {/* Preview da Imagem */}
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-2 border-brand overflow-hidden bg-surface flex-shrink-0 flex items-center justify-center relative shadow-md group">
                        {formData.image ? (
                          <>
                            <img 
                              src={formData.image} 
                              alt="Preview do produto" 
                              className="w-full h-full object-cover" 
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="text-[10px] text-white font-bold bg-black/70 px-2 py-1 rounded-full">Foto Atual</span>
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-col items-center gap-1 text-muted/60">
                            <ImageIcon className="w-8 h-8" />
                            <span className="text-[9px]">Sem imagem</span>
                          </div>
                        )}
                      </div>

                      {/* Botões de Ação para Imagem Local */}
                      <div className="flex-1 w-full space-y-2">
                        {/* Input de arquivo invisível acionado pelo botão */}
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageFileUpload}
                          accept="image/*"
                          className="hidden"
                        />

                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isProcessingImage}
                            className={`flex-1 min-w-[200px] py-2.5 px-4 rounded-full text-xs flex items-center justify-center gap-2 ${PRIMARY_BTN}`}
                          >
                            {isProcessingImage ? (
                              <>
                                <RefreshCw className="w-4 h-4 animate-spin" />
                                <span>Otimizando Foto...</span>
                              </>
                            ) : (
                              <>
                                <Upload className="w-4 h-4" />
                                <span>Escolher Foto do Aparelho / PC</span>
                              </>
                            )}
                          </button>

                          {formData.image && (
                            <button
                              type="button"
                              onClick={() => setFormData({ ...formData, image: '' })}
                              className="grid size-10 place-items-center rounded-full bg-surface hover:bg-danger/15 text-muted hover:text-danger border border-line transition active:scale-90"
                              title="Remover imagem atual"
                              aria-label="Remover imagem atual"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        <p className="text-[11px] text-muted leading-tight">
                          Selecione qualquer imagem da sua galeria ou arquivos (PNG, JPG, WEBP). Ela será redimensionada e salva automaticamente.
                        </p>
                      </div>
                    </div>

                    {/* Campo de URL opcional */}
                    {showUrlInput && (
                      <div className="pt-3 border-t border-line animate-fade-in">
                        <label className={LABEL_CLS}>
                          Ou digite / cole a URL da Imagem na Web:
                        </label>
                        <input
                          type="url"
                          value={formData.image}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          placeholder="https://exemplo.com/foto-do-produto.jpg"
                          className="w-full px-3.5 py-2.5 bg-surface border border-line rounded-xl text-xs text-ink placeholder:text-muted/60 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/30 transition"
                        />
                      </div>
                    )}

                    {/* Amostras Rápidas */}
                    <div className="pt-3 border-t border-line">
                      <span className="text-[10px] text-muted font-bold uppercase block mb-1.5">
                        Ou escolha uma foto de demonstração rápida:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {SAMPLE_IMAGES.map((sample, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setFormData({ ...formData, image: sample.url })}
                            className={`px-3 py-1 rounded-full border text-[10px] font-semibold transition active:scale-95 ${
                              formData.image === sample.url
                                ? 'bg-brand text-on-brand border-brand'
                                : 'bg-surface text-muted border-line hover:text-ink hover:border-brand'
                            }`}
                          >
                            {sample.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Descrição */}
                  <div className="sm:col-span-12">
                    <label className={LABEL_CLS}>
                      Descrição do Produto
                    </label>
                    <textarea
                      rows={2}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Ex: Cerveja puro malte gelada no ponto perfeito para o seu churrasco ou fim de semana."
                      className={INPUT_CLS}
                    />
                  </div>
                </div>
              </div>

              {/* Rodapé Fixo do Modal de Edição */}
              <div className="p-4 sm:p-5 bg-surface border-t border-line flex items-center justify-end gap-3 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2.5 rounded-full bg-surface-2 hover:bg-line text-ink text-xs font-bold transition active:scale-95"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isProcessingImage}
                  className={`px-6 py-2.5 rounded-full text-xs flex items-center gap-2 ${PRIMARY_BTN}`}
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>{currentEditId ? 'Salvar Alterações' : 'Cadastrar no Banco'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
