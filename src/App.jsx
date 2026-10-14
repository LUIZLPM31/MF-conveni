import React, { useState, useMemo, useRef } from 'react';
import { ProductProvider, useProducts } from './context/ProductContext';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import AppHeader from './components/AppHeader';
import PromoCarousel from './components/PromoCarousel';
import CategoryFilter from './components/CategoryFilter';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CombosSection from './components/CombosSection';
import CartDrawer from './components/CartDrawer';
import FloatingCartBar from './components/FloatingCartBar';
import MobileNavBar from './components/MobileNavBar';
import AgeGateModal from './components/AgeGateModal';
import AdminModal from './components/AdminModal';
import StoreInfo from './components/StoreInfo';
import Footer from './components/Footer';
import { normalizeText } from './lib/format';
import { Frown, Sparkles, X } from 'lucide-react';

function MainContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('todos');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { products, isAdminAuthenticated, logoutAdmin, setIsAdminModalOpen } = useProducts();
  const catalogRef = useRef(null);
  const searchInputRef = useRef(null);

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectCategory = (category) => {
    setActiveCategory(category);
    setSearchQuery('');
    scrollToCatalog();
  };

  // Filtragem tolerante a acentuação e caixa
  const filteredProducts = useMemo(() => {
    const q = normalizeText(searchQuery);

    return products.filter((product) => {
      const matchesCategory =
        activeCategory === 'todos' || product.category === activeCategory;

      if (!matchesCategory) return false;
      if (!q) return true;

      const name = normalizeText(product.name);
      const desc = normalizeText(product.description);
      const cat = normalizeText(product.category);
      const badge = normalizeText(product.badge);

      return name.includes(q) || desc.includes(q) || cat.includes(q) || badge.includes(q);
    });
  }, [products, activeCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-app text-ink transition-colors duration-300">
      {/* Barra de Notificação quando Lojista está Logado */}
      {isAdminAuthenticated && (
        <aside
          aria-label="Aviso de Modo Administrador"
          className="px-4 py-2 text-xs font-bold flex flex-wrap items-center justify-between gap-2 bg-brand text-on-brand sticky top-0 z-50 shadow-sm border-b border-brand-strong"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-current animate-ping" />
            <span>Modo Lojista Ativo</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="px-2.5 py-1 rounded-md bg-ink text-surface text-xs font-black uppercase transition"
            >
              Painel ADM
            </button>
            <button
              onClick={logoutAdmin}
              className="px-2 py-1 hover:bg-black/10 rounded text-xs font-bold transition"
            >
              Sair
            </button>
          </div>
        </aside>
      )}

      {/* Verificação Legal +18 */}
      <AgeGateModal />

      {/* Topo estilo App Zé Delivery com Endereço e Busca */}
      <AppHeader
        ref={searchInputRef}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={scrollToCatalog}
      />

      {/* Carrossel de Banners em Destaque (mostrado quando não está buscando) */}
      {!searchQuery && (
        <PromoCarousel onSelectCategory={handleSelectCategory} />
      )}

      {/* Barra Sticky de Categorias */}
      <CategoryFilter
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* Seção de Combos Promocionais em Destaque */}
      {!searchQuery && activeCategory === 'todos' && (
        <CombosSection onQuickView={setSelectedProduct} />
      )}

      {/* Catálogo de Produtos */}
      <main
        ref={catalogRef}
        id="catalogo"
        className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6"
      >
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-baseline gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-ink tracking-tight font-display">
              {activeCategory === 'todos' ? 'Todos os Produtos' : 'Itens Selecionados'}
            </h2>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-brand/20 text-ink">
              {filteredProducts.length} itens
            </span>
          </div>

          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-xs font-bold text-muted hover:text-ink flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Limpar busca</span>
            </button>
          )}
        </div>

        {/* Feedback visual de busca ativa */}
        {searchQuery && (
          <div className="mb-4 p-3 rounded-xl bg-surface border border-line text-xs text-muted flex items-center justify-between">
            <span>
              Resultados para <strong className="text-ink">"{searchQuery}"</strong>
            </span>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('todos');
              }}
              className="underline text-ink font-bold"
            >
              Ver cardápio completo
            </button>
          </div>
        )}

        {/* Grid de Produtos: 2 colunas no mobile, 3 ou 4 no desktop */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setSelectedProduct}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center rounded-3xl p-8 max-w-sm mx-auto bg-surface border border-line">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 bg-surface-2 text-muted">
              <Frown className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-extrabold text-ink mb-1">
              Nenhum produto encontrado
            </h3>
            <p className="text-xs text-muted mb-4">
              Não encontramos resultados para "{searchQuery}". Tente pesquisar por Heineken, Gelo, Vodka ou Doritos.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('todos');
              }}
              className="px-5 py-2.5 rounded-full text-xs font-black uppercase bg-brand text-on-brand shadow-xs active:scale-95 transition"
            >
              Ver Todas as Bebidas
            </button>
          </div>
        )}
      </main>

      {/* Informações da Loja, Horários e PIX */}
      <StoreInfo />

      {/* Rodapé com Direitos e Área do Lojista */}
      <Footer />

      {/* Modal / Bottom Sheet de Detalhes do Produto */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Sacola Lateral / Bottom Sheet */}
      <CartDrawer />

      {/* Barra Flutuante de Sacola (Mobile & Desktop) */}
      <FloatingCartBar />

      {/* Navegação Inferior Nativa do Mobile */}
      <MobileNavBar
        onCatalogClick={() => {
          scrollToCatalog();
          searchInputRef.current?.focus();
        }}
      />

      {/* Modal do Painel Administrativo */}
      <AdminModal />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ProductProvider>
        <CartProvider>
          <MainContent />
        </CartProvider>
      </ProductProvider>
    </ThemeProvider>
  );
}
