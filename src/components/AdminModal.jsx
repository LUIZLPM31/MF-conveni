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
  ShieldCheck 
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
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
    isAdminModalOpen,
    setIsAdminModalOpen
  } = useProducts();

  // Estados locais
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [searchAdmin, setSearchAdmin] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('todos');

  // Estado do formulário de criação/edição
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [formError, setFormError] = useState('');
  const [successToast, setSuccessToast] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  if (!isAdminModalOpen) return null;

  const showToast = (message) => {
    setSuccessToast(message);
    setTimeout(() => setSuccessToast(''), 2500);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    const res = loginAdmin(passwordInput);
    if (!res.success) {
      setLoginError(res.message);
    } else {
      setPasswordInput('');
    }
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

  const handleSaveProduct = (e) => {
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
      // Atualizar existente
      updateProduct(currentEditId, formData);
      showToast(`Produto "${formData.name}" atualizado com sucesso!`);
    } else {
      // Criar novo
      addProduct(formData);
      showToast(`Produto "${formData.name}" cadastrado com sucesso!`);
    }

    setIsEditing(false);
    setCurrentEditId(null);
    setFormData(INITIAL_FORM_STATE);
  };

  const handleDeleteProduct = (id, name) => {
    deleteProduct(id);
    setConfirmDeleteId(null);
    showToast(`Produto "${name}" removido com sucesso!`);
  };

  const handleResetCatalog = () => {
    if (window.confirm('Tem certeza que deseja restaurar o catálogo original? Todas as alterações personalizadas serão redefinidas.')) {
      resetToDefaultProducts();
      showToast('Catálogo padrão restaurado com sucesso!');
    }
  };

  // Filtragem da tabela administrativa
  const filteredProducts = products.filter(p => {
    const matchesCategory = categoryFilter === 'todos' || p.category === categoryFilter;
    const matchesSearch = 
      searchAdmin.trim() === '' ||
      p.name.toLowerCase().includes(searchAdmin.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchAdmin.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-fade-in">
      {/* Toast de Sucesso */}
      {successToast && (
        <div className="fixed top-6 right-6 z-60 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 text-white font-bold text-xs shadow-2xl shadow-emerald-500/30 animate-bounce">
          <Check className="w-4 h-4" />
          <span>{successToast}</span>
        </div>
      )}

      <div className="relative w-full max-w-5xl bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Superior */}
        <div className="p-4 sm:p-6 bg-stone-950/90 border-b border-stone-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  Painel de Controle ADM
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  MF Conveniências
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Gerencie catálogo de produtos, adicione novos itens, altere preços e fotos.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminAuthenticated && (
              <button
                onClick={logoutAdmin}
                className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-red-300 text-xs font-bold transition-colors"
                title="Sair do modo administrador"
              >
                Sair
              </button>
            )}
            <button
              onClick={() => setIsAdminModalOpen(false)}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition-colors"
              title="Fechar painel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Conteúdo Dinâmico: Se não autenticado, pede login. Se autenticado, abre painel. */}
        {!isAdminAuthenticated ? (
          /* TELA DE LOGIN DO ADMINISTRADOR */
          <div className="p-6 sm:p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 shadow-lg shadow-amber-500/10">
              <Lock className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-black text-stone-100 mb-2">
              Acesso Restrito ao Administrador
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 max-w-sm mb-6 leading-relaxed">
              Insira sua senha de administrador para gerenciar, editar, adicionar ou excluir os produtos da loja.
            </p>

            <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
              <div>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Digite a senha de administrador..."
                  autoFocus
                  className="w-full px-4 py-3 bg-stone-950 border border-stone-800 rounded-2xl text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 text-center tracking-widest transition-all"
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
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 transition-all"
              >
                Acessar Painel ADM
              </button>

              <div className="pt-3">
                <p className="text-[11px] text-stone-500">
                  Dica: A senha padrão inicial é <span className="text-amber-400 font-mono font-bold">admin123</span>
                </p>
              </div>
            </form>
          </div>
        ) : (
          /* PAINEL ADMINISTRATIVO AUTENTICADO */
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar space-y-6">
            {/* Barra de Ações Rápidas & Estatísticas */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-stone-950/60 p-4 rounded-2xl border border-stone-800">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-300">
                  <Package className="w-4 h-4 text-amber-400" />
                  <span>Total de Produtos: <strong className="text-white font-black">{products.length}</strong></span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-300">
                  <Snowflake className="w-4 h-4 text-cyan-400" />
                  <span>Geladas: <strong className="text-white font-black">{products.filter(p => p.isCold).length}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleResetCatalog}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-400 hover:text-amber-300 text-xs font-semibold transition-colors"
                  title="Restaurar lista de produtos padrão"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Restaurar Catálogo Padrão</span>
                </button>

                <button
                  type="button"
                  onClick={openCreateForm}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                  <span>Novo Produto</span>
                </button>
              </div>
            </div>

            {/* FORMULÁRIO DE CRIAÇÃO / EDIÇÃO */}
            {isEditing && (
              <div className="p-5 sm:p-6 rounded-3xl bg-stone-950 border-2 border-amber-500/40 shadow-2xl relative animate-fade-in">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-800">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                      {currentEditId ? <Edit3 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </div>
                    <h3 className="text-base font-black text-stone-100">
                      {currentEditId ? 'Editar Produto' : 'Cadastrar Novo Produto'}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="p-1.5 rounded-lg bg-stone-900 text-stone-400 hover:text-white"
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
                      <label className="block text-[11px] font-bold uppercase text-stone-400 mb-1">
                        Nome do Produto *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ex: Cerveja Corona Extra 330ml"
                        className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                        required
                      />
                    </div>

                    {/* Categoria */}
                    <div className="sm:col-span-4">
                      <label className="block text-[11px] font-bold uppercase text-stone-400 mb-1">
                        Categoria *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                      >
                        {CATEGORIES.filter(c => c.id !== 'todos').map(c => (
                          <option key={c.id} value={c.id}>{c.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Preço Atual */}
                    <div className="sm:col-span-4">
                      <label className="block text-[11px] font-bold uppercase text-stone-400 mb-1">
                        Preço Atual (R$) *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        placeholder="Ex: 8.90"
                        className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-amber-400 font-bold focus:outline-none focus:border-amber-500"
                        required
                      />
                    </div>

                    {/* Preço Anterior (Promoção) */}
                    <div className="sm:col-span-4">
                      <label className="block text-[11px] font-bold uppercase text-stone-400 mb-1">
                        Preço De/Anterior (Opcional)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.oldPrice}
                        onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
                        placeholder="Ex: 10.50"
                        className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-stone-400 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    {/* Unidade / Volume */}
                    <div className="sm:col-span-4">
                      <label className="block text-[11px] font-bold uppercase text-stone-400 mb-1">
                        Unidade / Medida
                      </label>
                      <input
                        type="text"
                        value={formData.unit}
                        onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                        placeholder="Ex: Unidade 330ml, Pack c/ 6"
                        className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    {/* Badge / Selo */}
                    <div className="sm:col-span-6">
                      <label className="block text-[11px] font-bold uppercase text-stone-400 mb-1">
                        Badge / Destaque (Opcional)
                      </label>
                      <input
                        type="text"
                        value={formData.badge}
                        onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                        placeholder="Ex: Super Gelada, Mais Vendido, Promoção"
                        className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    {/* Checkbox Super Gelada */}
                    <div className="sm:col-span-6 flex items-center pt-5">
                      <label className="flex items-center gap-2.5 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={formData.isCold}
                          onChange={(e) => setFormData({ ...formData, isCold: e.target.checked })}
                          className="w-4 h-4 rounded border-stone-700 text-amber-500 focus:ring-amber-500 focus:ring-offset-stone-900"
                        />
                        <span className="text-xs font-bold text-stone-200 flex items-center gap-1">
                          <Snowflake className="w-3.5 h-3.5 text-cyan-400" />
                          Produto trincando de gelado (Exibe selo azul de gelada)
                        </span>
                      </label>
                    </div>

                    {/* Imagem do Produto */}
                    <div className="sm:col-span-12">
                      <label className="block text-[11px] font-bold uppercase text-stone-400 mb-1">
                        URL da Imagem
                      </label>
                      <div className="flex flex-col sm:flex-row gap-3 items-center">
                        <input
                          type="url"
                          value={formData.image}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          placeholder="Cole o link da foto do produto..."
                          className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                        />
                        {/* Preview rápido */}
                        <div className="w-12 h-12 rounded-xl bg-stone-900 border border-stone-800 overflow-hidden flex-shrink-0 flex items-center justify-center">
                          {formData.image ? (
                            <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon className="w-5 h-5 text-stone-600" />
                          )}
                        </div>
                      </div>

                      {/* Sugestões de Imagens Rápidas */}
                      <div className="mt-2 flex flex-wrap gap-1.5 items-center">
                        <span className="text-[10px] text-stone-500 font-semibold uppercase">Fotos rápidas:</span>
                        {SAMPLE_IMAGES.map((sample, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setFormData({ ...formData, image: sample.url })}
                            className="px-2 py-0.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-[10px] text-stone-400 hover:text-amber-300 transition-colors"
                          >
                            {sample.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Descrição */}
                    <div className="sm:col-span-12">
                      <label className="block text-[11px] font-bold uppercase text-stone-400 mb-1">
                        Descrição do Produto
                      </label>
                      <textarea
                        rows={2}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Ex: Cerveja puro malte gelada no ponto perfeito para o seu churrasco ou fim de semana."
                        className="w-full px-3.5 py-2 bg-stone-900 border border-stone-800 rounded-xl text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-800">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-bold transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 transition-all"
                    >
                      {currentEditId ? 'Salvar Alterações' : 'Cadastrar Produto'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* BARRA DE FILTRO E BUSCA NA TABELA */}
            <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                <input
                  type="text"
                  value={searchAdmin}
                  onChange={(e) => setSearchAdmin(e.target.value)}
                  placeholder="Buscar produto por nome..."
                  className="w-full pl-9 pr-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                <span className="text-[11px] text-stone-500 font-semibold whitespace-nowrap">Categoria:</span>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-1.5 bg-stone-950 border border-stone-800 rounded-xl text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                >
                  <option value="todos">Todas as Categorias</option>
                  {CATEGORIES.filter(c => c.id !== 'todos').map(c => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* TABELA / LISTA DE PRODUTOS CADASTRADOS */}
            <div className="rounded-2xl border border-stone-800 overflow-hidden bg-stone-950/60">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-stone-300">
                  <thead className="bg-stone-950 text-stone-400 uppercase font-black tracking-wider text-[10px] border-b border-stone-800">
                    <tr>
                      <th className="py-3 px-4">Produto</th>
                      <th className="py-3 px-3">Categoria</th>
                      <th className="py-3 px-3">Preço</th>
                      <th className="py-3 px-3">Selo / Gelada</th>
                      <th className="py-3 px-4 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800/80">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((prod) => (
                        <tr key={prod.id} className="hover:bg-stone-900/60 transition-colors">
                          {/* Produto e foto */}
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={prod.image}
                                alt={prod.name}
                                className="w-10 h-10 rounded-lg object-cover bg-stone-900 flex-shrink-0"
                              />
                              <div className="min-w-0 max-w-xs sm:max-w-md">
                                <span className="font-bold text-stone-100 block truncate">
                                  {prod.name}
                                </span>
                                <span className="text-[11px] text-stone-500">
                                  {prod.unit}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Categoria */}
                          <td className="py-3 px-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-stone-900 text-stone-400 border border-stone-800 capitalize">
                              {prod.category}
                            </span>
                          </td>

                          {/* Preço */}
                          <td className="py-3 px-3 font-extrabold text-amber-400 whitespace-nowrap">
                            R$ {Number(prod.price).toFixed(2).replace('.', ',')}
                            {prod.oldPrice && (
                              <span className="block text-[10px] text-stone-500 font-normal line-through">
                                De: R$ {Number(prod.oldPrice).toFixed(2).replace('.', ',')}
                              </span>
                            )}
                          </td>

                          {/* Selo / Gelada */}
                          <td className="py-3 px-3">
                            <div className="flex flex-wrap items-center gap-1.5">
                              {prod.isCold && (
                                <span className="flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800/50">
                                  <Snowflake className="w-3 h-3" />
                                  Gelada
                                </span>
                              )}
                              {prod.badge && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
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
                                className="p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-amber-400 transition-colors"
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
                                    className="px-2 py-1 rounded-lg bg-stone-800 text-stone-400 text-[11px]"
                                  >
                                    Não
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => setConfirmDeleteId(prod.id)}
                                  className="p-1.5 rounded-lg bg-stone-900 hover:bg-red-500/20 text-stone-400 hover:text-red-400 transition-colors"
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
                        <td colSpan={5} className="py-8 text-center text-stone-500">
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
      </div>
    </div>
  );
}
