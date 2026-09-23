import React from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Send, 
  Store, 
  CreditCard, 
  QrCode, 
  Banknote,
  MapPin
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { STORE_CONFIG } from '../data/products';

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    total,
    customerName,
    setCustomerName,
    paymentMethod,
    setPaymentMethod,
    changeFor,
    setChangeFor,
    notes,
    setNotes,
    sendOrderToWhatsApp
  } = useCart();

  if (!isCartOpen) return null;

  const isFormValid = items.length > 0;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-stone-900 border-l border-stone-800 shadow-2xl flex flex-col justify-between">
          
          {/* Header do Carrinho */}
          <div className="p-4 sm:p-5 border-b border-stone-800 bg-stone-950/70 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-black text-stone-100 uppercase tracking-wide">
                  Sua Lista de Itens
                </h2>
                <p className="text-xs text-stone-400">
                  {items.length} {items.length === 1 ? 'item selecionado' : 'itens selecionados'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="p-2 text-xs text-stone-400 hover:text-red-400 transition-colors"
                  title="Limpar itens"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Conteúdo rolável */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6 custom-scrollbar">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-stone-400">
                <div className="w-16 h-16 rounded-full bg-stone-800/80 flex items-center justify-center mb-4 text-stone-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-stone-200 mb-1">
                  Sua lista está vazia
                </h3>
                <p className="text-xs text-stone-400 max-w-xs mb-6">
                  Selecione cervejas geladas, petiscos ou combos para consultar ou retirar no balcão.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Ver Catálogo
                </button>
              </div>
            ) : (
              <>
                {/* Lista de Itens */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 rounded-2xl bg-stone-950/60 border border-stone-800/80 hover:border-stone-700 transition-colors"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover bg-stone-900 flex-shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-stone-200 truncate">
                          {item.name}
                        </h4>
                        <span className="text-[11px] text-stone-400 block">
                          {item.unit}
                        </span>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="text-xs font-extrabold text-amber-400">
                            R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                          </span>
                          {item.quantity > 1 && (
                            <span className="text-[10px] text-stone-500">
                              (R$ {item.price.toFixed(2).replace('.', ',')} cada)
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Controle de Quantidade */}
                      <div className="flex items-center bg-stone-900 border border-stone-800 rounded-lg p-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 flex items-center justify-center rounded hover:bg-stone-800 text-stone-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-stone-100 min-w-[18px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 flex items-center justify-center rounded hover:bg-stone-800 text-stone-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Excluir */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 text-stone-500 hover:text-red-400 transition-colors"
                        title="Remover item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Modalidade de Retirada */}
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 flex-shrink-0 mt-0.5">
                    <Store className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wide">
                      Modalidade: Retirada no Balcão
                    </h4>
                    <p className="text-[11px] text-stone-300 mt-0.5 leading-relaxed">
                      Nosso site funciona como vitrine e catálogo. Você separa seus itens e retira direto em nossa loja física!
                    </p>
                    <div className="flex items-center gap-1 mt-1.5 text-[10px] text-amber-400 font-medium">
                      <MapPin className="w-3 h-3" />
                      <span>{STORE_CONFIG.address}</span>
                    </div>
                  </div>
                </div>

                {/* Dados do Cliente e Pagamento */}
                <div className="space-y-3 p-4 rounded-2xl bg-stone-950/40 border border-stone-800">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-400 mb-1">
                      Seu Nome (opcional)
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Ex: Carlos Silva"
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-xl text-xs text-stone-200 placeholder-stone-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {/* Forma de Pagamento */}
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-400 mb-1">
                      Forma de Pagamento Pretendida
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('PIX')}
                        className={`flex flex-col items-center justify-center p-2 rounded-xl border text-[11px] font-bold transition-all ${
                          paymentMethod === 'PIX'
                            ? 'bg-amber-500/15 border-amber-500 text-amber-300'
                            : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-white'
                        }`}
                      >
                        <QrCode className="w-4 h-4 mb-1" />
                        <span>PIX</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('Cartão')}
                        className={`flex flex-col items-center justify-center p-2 rounded-xl border text-[11px] font-bold transition-all ${
                          paymentMethod === 'Cartão'
                            ? 'bg-amber-500/15 border-amber-500 text-amber-300'
                            : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-white'
                        }`}
                      >
                        <CreditCard className="w-4 h-4 mb-1" />
                        <span>Cartão</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('Dinheiro')}
                        className={`flex flex-col items-center justify-center p-2 rounded-xl border text-[11px] font-bold transition-all ${
                          paymentMethod === 'Dinheiro'
                            ? 'bg-amber-500/15 border-amber-500 text-amber-300'
                            : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-white'
                        }`}
                      >
                        <Banknote className="w-4 h-4 mb-1" />
                        <span>Dinheiro</span>
                      </button>
                    </div>

                    {paymentMethod === 'Dinheiro' && (
                      <div className="mt-2">
                        <input
                          type="text"
                          value={changeFor}
                          onChange={(e) => setChangeFor(e.target.value)}
                          placeholder="Precisa de troco para quanto? (Ex: R$ 50)"
                          className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-xl text-xs text-stone-200 placeholder-stone-600 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    )}
                  </div>

                  {/* Observações */}
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-400 mb-1">
                      Observações adicionais (opcional)
                    </label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Ex: Gostaria de confirmar se tem cerveja trincando"
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-xl text-xs text-stone-200 placeholder-stone-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer com Total e Botão de Envio WhatsApp */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-stone-800 bg-stone-950 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-400">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-base font-black text-stone-100 pt-2 border-t border-stone-800/80">
                  <span>Total Estimado</span>
                  <span className="text-amber-400 text-lg">
                    R$ {total.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={sendOrderToWhatsApp}
                disabled={!isFormValid}
                className={`w-full py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider transition-all duration-200 shadow-xl ${
                  isFormValid
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98]'
                    : 'bg-stone-800 text-stone-500 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>Enviar Consulta / Pedido no WhatsApp</span>
              </button>

              <p className="text-[11px] text-center text-stone-500">
                Seu pedido será enviado formatado diretamente para nosso atendente.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
