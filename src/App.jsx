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
import { MessageCircle, Frown } from 'lucide-react';

function MainContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('todos');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { products, isAdminAuthenticated, logoutAdmin, setIsAdminModalOpen } = useProducts();
  const catalogRef = useRef(null);

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
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
        (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#0e1015] text-stone-100 flex flex-col selection:bg-amber-500 selection:text-black">
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

      {/* Banner Principal Hero */}
      <Hero onExploreClick={scrollToCatalog} />

      {/* Destaque: Combos Prontos */}
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
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Cardápio & Prateleira</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">
                {filteredProducts.length} itens
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 mt-1">
              Escolha suas bebidas trincando de geladas e petiscos, consulte nosso catálogo e retire no balcão.
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
              Não encontramos resultados para "{searchQuery}". Tente buscar por cerveja, gelo ou salgadinho.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('todos');
              }}
              className="px-5 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black uppercase transition-colors"
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

      {/* Botão Flutuante WhatsApp Mobile / Desktop */}
      <div className="fixed bottom-5 right-4 z-30 flex flex-col gap-3">
        <a
          href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Olá! Gostaria de consultar a disponibilidade de bebidas na MF Conveniências.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all"
          title="Falar no WhatsApp"
        >
          <MessageCircle className="w-7 h-7" />
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
