import React, { useState, useMemo, useRef } from 'react';
import { ProductProvider, useProducts } from './context/ProductContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
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
import { MessageCircle, Frown, Sparkles, X, Home, ShoppingBag } from 'lucide-react';

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
  const { isDark } = useTheme();
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
    <div
      className={`min-h-screen flex flex-col pb-16 sm:pb-0 transition-colors duration-300 ${
        isDark
          ? 'bg-[#18181B] text-[#FAFAFA] selection:bg-[#FACC15] selection:text-[#18181B]'
          : 'bg-[#FFFFFF] text-[#0F172A] selection:bg-[#FF4500] selection:text-white'
      }`}
    >
      {/* Barra de Notificação quando Lojista está Logado */}
      {isAdminAuthenticated && (
        <aside
          aria-label="Aviso de Modo Administrador"
          className={`px-4 py-2 text-xs font-bold flex flex-wrap items-center justify-between gap-2 shadow-lg z-50 sticky top-0 border-b ${
            isDark
              ? 'bg-[#FACC15] text-[#18181B] border-amber-600'
              : 'bg-[#00509E] text-white border-blue-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-current animate-ping" />
            <span>Modo Administrador Ativo (Lojista)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className={`px-3 py-1 rounded-md text-xs font-black uppercase transition-colors ${
                isDark
                  ? 'bg-[#18181B] text-[#FACC15] hover:bg-stone-900'
                  : 'bg-white text-[#00509E] hover:bg-slate-100'
              }`}
            >
              Abrir Painel ADM
            </button>
            <button
              onClick={logoutAdmin}
              className="px-2 py-1 hover:bg-black/10 rounded text-xs font-bold transition-colors"
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

      {/* Barra de Atalhos Rápidos de Busca (Pills) */}
      <section
        className={`border-b py-3.5 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
          isDark
            ? 'bg-[#18181B] border-[#3F3F46]'
            : 'bg-slate-50 border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-1">
          <div
            className={`flex items-center gap-1.5 text-xs font-bold flex-shrink-0 pr-2 ${
              isDark ? 'text-[#FACC15]' : 'text-[#00509E]'
            }`}
          >
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
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                    isSelected
                      ? isDark
                        ? 'bg-[#FACC15] text-[#18181B] border-[#FACC15] shadow-sm font-bold'
                        : 'bg-[#00509E] text-white border-[#00509E] shadow-sm font-bold'
                      : isDark
                      ? 'bg-[#27272A] hover:bg-[#323238] text-[#A1A1AA] hover:text-[#FAFAFA] border-[#3F3F46]'
                      : 'bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border-slate-200 shadow-sm'
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
              className={`ml-auto flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] transition-colors flex-shrink-0 ${
                isDark
                  ? 'bg-[#27272A] hover:bg-[#323238] text-[#A1A1AA] hover:text-[#FAFAFA]'
                  : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
              }`}
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
            <h2
              className={`text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-2.5 ${
                isDark ? 'text-[#FAFAFA]' : 'text-[#0F172A]'
              }`}
            >
              <span>Cardápio & Prateleira</span>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                  isDark
                    ? 'bg-[#FACC15]/15 text-[#FACC15] border-[#FACC15]/30'
                    : 'bg-blue-50 text-[#00509E] border-blue-200'
                }`}
              >
                {filteredProducts.length} itens
              </span>
            </h2>
            <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-[#A1A1AA]' : 'text-slate-500'}`}>
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
          <div
            className={`mb-5 flex items-center justify-between p-3 rounded-xl border ${
              isDark
                ? 'bg-[#27272A]/80 border-[#3F3F46]'
                : 'bg-slate-100 border-slate-200'
            }`}
          >
            <span className={`text-xs ${isDark ? 'text-[#A1A1AA]' : 'text-slate-700'}`}>
              Resultados para:{' '}
              <strong className={isDark ? 'text-[#FACC15]' : 'text-[#00509E]'}>
                "{searchQuery}"
              </strong>{' '}
              ({filteredProducts.length} itens encontrados)
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className={`text-xs underline ${
                isDark ? 'text-[#A1A1AA] hover:text-[#FAFAFA]' : 'text-slate-500 hover:text-slate-900'
              }`}
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
          <div
            className={`py-16 text-center rounded-3xl p-8 max-w-md mx-auto border ${
              isDark
                ? 'bg-[#27272A]/40 border-[#3F3F46]'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 ${
                isDark ? 'bg-[#18181B] text-[#A1A1AA]' : 'bg-slate-200 text-slate-500'
              }`}
            >
              <Frown className="w-7 h-7" />
            </div>
            <h3
              className={`text-base font-bold mb-1 ${
                isDark ? 'text-[#FAFAFA]' : 'text-[#0F172A]'
              }`}
            >
              Nenhum produto encontrado
            </h3>
            <p className={`text-xs mb-5 ${isDark ? 'text-[#A1A1AA]' : 'text-slate-500'}`}>
              Não encontramos resultados para "{searchQuery}". Tente buscar por cerveja, balde, gelo ou salgadinho.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('todos');
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-black uppercase transition-all cursor-pointer shadow-md ${
                isDark
                  ? 'bg-[#FACC15] hover:bg-[#EAB308] text-[#18181B]'
                  : 'bg-[#00509E] hover:bg-[#003B75] text-white'
              }`}
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

      {/* Botão Flutuante WhatsApp Desktop */}
      <div className="hidden sm:flex fixed bottom-6 right-6 z-30 flex-col items-end gap-2 group">
        <a
          href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
            'Olá! Gostaria de consultar o cardápio da MF Conveniências e fazer um pedido.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2.5 px-5 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 ${
            isDark
              ? 'bg-[#FACC15] hover:bg-[#EAB308] text-[#18181B] shadow-[#FACC15]/30'
              : 'bg-[#FF4500] hover:bg-[#E03E00] text-white shadow-[#FF4500]/40'
          }`}
          title="Falar no WhatsApp"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-current animate-pulse" />
          <MessageCircle className="w-5 h-5" />
          <span>PEDIR PELO WHATSAPP</span>
        </a>
      </div>

      {/* Barra de Navegação Fixa Inferior no Mobile (Bottom Bar) */}
      <nav
        aria-label="Navegação Rápida Mobile"
        className={`sm:hidden fixed bottom-0 left-0 right-0 z-40 backdrop-blur-xl border-t px-3 py-2 flex items-center justify-around shadow-2xl transition-colors duration-300 ${
          isDark
            ? 'bg-[#18181B]/95 border-[#3F3F46]'
            : 'bg-white/95 border-slate-200 shadow-slate-300'
        }`}
      >
        {/* Início */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold py-1 px-3 rounded-lg transition-colors cursor-pointer ${
            isDark
              ? 'text-[#A1A1AA] hover:text-[#FACC15]'
              : 'text-slate-600 hover:text-[#00509E]'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Início</span>
        </button>

        {/* Produtos */}
        <button
          onClick={scrollToCatalog}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold py-1 px-3 rounded-lg transition-colors cursor-pointer ${
            isDark
              ? 'text-[#A1A1AA] hover:text-[#FACC15]'
              : 'text-slate-600 hover:text-[#00509E]'
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
          <span>Produtos</span>
        </button>

        {/* Botão de Destaque WhatsApp */}
        <a
          href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
            'Olá! Gostaria de fazer um pedido na MF Conveniências.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider shadow-lg active:scale-95 transition-all ${
            isDark
              ? 'bg-[#FACC15] text-[#18181B] shadow-[#FACC15]/25'
              : 'bg-[#FF4500] text-white shadow-[#FF4500]/30'
          }`}
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>
      </nav>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ProductProvider>
        <MainContent />
      </ProductProvider>
    </ThemeProvider>
  );
}
