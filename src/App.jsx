import React, { useState, useMemo, useRef } from 'react';
import { ProductProvider, useProducts } from './context/ProductContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AgeGateModal from './components/AgeGateModal';
import CategoryFilter from './components/CategoryFilter';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CombosSection from './components/CombosSection';
import AdminModal from './components/AdminModal';
import StoreInfo from './components/StoreInfo';
import Footer from './components/Footer';
import { STORE_CONFIG } from './data/products';
import { MessageCircle, Frown, Sparkles, Search, X } from 'lucide-react';

const QUICK_TAGS = [
  { label: 'Balde de Cervejas', query: 'Balde' },
  { label: 'Heineken Gelada', query: 'Heineken' },
  { label: 'Combo Sextou', query: 'Sextou' },
  { label: 'Coca-Cola 2L', query: 'Coca-Cola' },
  { label: 'Fanta Laranja', query: 'Fanta' },
  { label: 'Doritos', query: 'Doritos' },
  { label: 'Ruffles', query: 'Ruffles' },
  { label: 'Trident', query: 'Trident' },
  { label: 'Saco de Gelo', query: 'Gelo' },
  { label: 'Carvão 3kg', query: 'Carvão' },
];

function MainContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('todos');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { products, isAdminAuthenticated, logoutAdmin, setIsAdminModalOpen } = useProducts();
  const catalogRef = useRef(null);

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectCategory = (category) => {
    setActiveCategory(category);
    setSearchQuery('');
    scrollToCatalog();
  };

  const handleQuickTagClick = (tagQuery) => {
    setSearchQuery(tagQuery);
    setActiveCategory('todos');
    scrollToCatalog();
  };

  // Filtragem combinada por categoria e busca
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === 'todos' || product.category === activeCategory;

      const matchesSearch =
        searchQuery.trim() === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.badge && product.badge.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#0c0e13] text-stone-100 flex flex-col selection:bg-amber-500 selection:text-black">
      {/* Barra de Notificação quando Lojista está Logado */}
      {isAdminAuthenticated && (
        <aside aria-label="Aviso de Modo Administrador" className="bg-amber-500 text-stone-950 px-4 py-2 text-xs font-bold flex flex-wrap items-center justify-between gap-2 shadow-lg z-50 sticky top-0 border-b border-amber-600">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-stone-950 animate-ping" />
            <span>Modo Administrador Ativo (Lojista)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="px-3 py-1 rounded-md bg-stone-950 text-amber-400 hover:bg-stone-900 text-xs font-black uppercase transition-colors"
            >
              Abrir Painel ADM
            </button>
            <button
              onClick={logoutAdmin}
              className="px-2 py-1 text-stone-950 hover:bg-amber-600/30 rounded text-xs font-bold transition-colors"
            >
              Encerrar Sessão
            </button>
          </div>
        </aside>
      )}

      {/* Verificação +18 */}
      <AgeGateModal />

      {/* Barra de Navegação */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Banner Principal Hero com Vitrine Oficial */}
      <Hero 
        onExploreClick={scrollToCatalog} 
        onSelectCategory={handleSelectCategory}
      />

      {/* Barra de Atalhos Rápidos de Busca (Pills do Banner) */}
      <section className="bg-stone-950/70 border-b border-stone-800/60 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-1">
          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold flex-shrink-0 pr-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mais Buscados:</span>
          </div>

          <div className="flex items-center gap-2 flex-nowrap">
            {QUICK_TAGS.map((tag) => {
              const isSelected = searchQuery.toLowerCase() === tag.query.toLowerCase();
              return (
                <button
                  key={tag.label}
                  onClick={() => handleQuickTagClick(tag.query)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                      : 'bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800'
                  }`}
                >
                  {tag.label}
                </button>
              );
            })}
          </div>

          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="ml-auto flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-800 hover:bg-stone-700 text-[11px] text-stone-400 hover:text-white transition-colors flex-shrink-0"
            >
              <X className="w-3 h-3" />
              <span>Limpar busca</span>
            </button>
          )}
        </div>
      </section>

      {/* Destaque: Combos Prontos da Galera */}
      {searchQuery.trim() === '' && activeCategory === 'todos' && (
        <CombosSection onQuickView={setSelectedProduct} />
      )}

      {/* Catálogo de Bebidas e Conveniência */}
      <main
        ref={catalogRef}
        id="catalogo"
        className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
              <span>Cardápio & Prateleira</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">
                {filteredProducts.length} itens
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 mt-1">
              Bebidas trincando de geladas, petiscos e combos. Escolha e retire direto no balcão da MF!
            </p>
          </div>

          {/* Filtro por Categorias */}
          <div className="max-w-2xl w-full md:w-auto">
            <CategoryFilter
              activeCategory={activeCategory}
              onSelectCategory={(cat) => {
                setActiveCategory(cat);
                setSearchQuery('');
              }}
            />
          </div>
        </div>

        {/* Feedback visual de busca ativa */}
        {searchQuery && (
          <div className="mb-5 flex items-center justify-between p-3 rounded-xl bg-stone-900/60 border border-stone-800">
            <span className="text-xs text-stone-300">
              Resultados para: <strong className="text-amber-400">"{searchQuery}"</strong> ({filteredProducts.length} itens encontrados)
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-stone-400 hover:text-white underline"
            >
              Ver cardápio completo
            </button>
          </div>
        )}

        {/* Grid de Produtos */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setSelectedProduct}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center rounded-3xl bg-stone-900/40 border border-stone-800/80 p-8 max-w-md mx-auto">
            <div className="w-14 h-14 rounded-full bg-stone-800 flex items-center justify-center mx-auto mb-3 text-stone-400">
              <Frown className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-stone-200 mb-1">
              Nenhum produto encontrado
            </h3>
            <p className="text-xs text-stone-400 mb-5">
              Não encontramos resultados para "{searchQuery}". Tente buscar por cerveja, balde, gelo ou salgadinho.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('todos');
              }}
              className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black uppercase transition-colors cursor-pointer"
            >
              Ver Todas as Bebidas
            </button>
          </div>
        )}
      </main>

      {/* Informações da Loja, Horários e Chave PIX */}
      <StoreInfo />

      {/* Rodapé Institucional */}
      <Footer />

      {/* Modal de Detalhes do Produto */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Modal do Painel de Controle ADM */}
      <AdminModal />

      {/* Botão Flutuante WhatsApp Mobile / Desktop com Tooltip */}
      <div className="fixed bottom-5 right-4 z-30 flex flex-col items-end gap-2 group">
        <a
          href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Olá! Gostaria de consultar a disponibilidade de bebidas na MF Conveniências.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-xl shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all duration-200"
          title="Falar no WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="font-extrabold text-xs uppercase tracking-wider hidden sm:inline">
            Pedir no Balcão
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping hidden sm:inline" />
        </a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ProductProvider>
      <MainContent />
    </ProductProvider>
  );
}
