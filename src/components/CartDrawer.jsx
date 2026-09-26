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
        className="absolute inset-0 bg-[#0B0F0E]/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#121816] border-l border-[#1F2925] shadow-2xl flex flex-col justify-between">
          
          {/* Header do Carrinho */}
          <div className="p-4 sm:p-5 border-b border-[#1F2925] bg-[#0B0F0E]/90 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-[#18B66A]/10 text-[#18B66A]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-black text-[#F7F7F5] uppercase tracking-wide">
                  Sua Lista de Itens
                </h2>
                <p className="text-xs text-[#A8B0AC]">
                  {items.length} {items.length === 1 ? 'item selecionado' : 'itens selecionados'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="p-2 text-xs text-[#A8B0AC] hover:text-red-400 transition-colors"
                  title="Limpar itens"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-xl bg-[#0B0F0E] hover:bg-[#1a2320] text-[#A8B0AC] hover:text-[#F7F7F5] border border-[#1F2925] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Conteúdo rolável */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6 custom-scrollbar">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-[#A8B0AC]">
                <div className="w-16 h-16 rounded-full bg-[#0B0F0E] border border-[#1F2925] flex items-center justify-center mb-4 text-[#A8B0AC]/60">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-[#F7F7F5] mb-1">
                  Sua lista está vazia
                </h3>
                <p className="text-xs text-[#A8B0AC] max-w-xs mb-6">
                  Selecione cervejas trincando, petiscos ou combos para pedir direto pelo WhatsApp.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-[#18B66A] hover:bg-[#087A47] text-[#0B0F0E] font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-[#18B66A]/20"
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
                      className="flex items-center gap-3 p-3 rounded-2xl bg-[#0B0F0E] border border-[#1F2925] hover:border-[#18B66A]/40 transition-colors"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover bg-[#0B0F0E] flex-shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-[#F7F7F5] truncate">
                          {item.name}
                        </h4>
                        <span className="text-[11px] text-[#A8B0AC] block">
                          {item.unit}
                        </span>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="text-xs font-extrabold text-[#F7F7F5]">
                            R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                          </span>
                          {item.quantity > 1 && (
                            <span className="text-[10px] text-[#A8B0AC]/70">
                              (R$ {item.price.toFixed(2).replace('.', ',')} cada)
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Controle de Quantidade */}
                      <div className="flex items-center bg-[#121816] border border-[#1F2925] rounded-lg p-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#1F2925] text-[#A8B0AC] hover:text-[#F7F7F5]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-[#F7F7F5] min-w-[18px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#1F2925] text-[#A8B0AC] hover:text-[#F7F7F5]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Excluir */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 text-[#A8B0AC] hover:text-red-400 transition-colors"
                        title="Remover item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Modalidade de Retirada */}
                <div className="p-3.5 rounded-2xl bg-[#18B66A]/10 border border-[#18B66A]/30 flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-[#18B66A]/20 text-[#18B66A] flex-shrink-0 mt-0.5">
                    <Store className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#18B66A] uppercase tracking-wide">
                      Modalidade: Retirada no Balcão
                    </h4>
                    <p className="text-[11px] text-[#A8B0AC] mt-0.5 leading-relaxed">
                      Nosso catálogo permite que você escolha tudo com agilidade e envie direto para o atendente separar na loja física!
                    </p>
                    <div className="flex items-center gap-1 mt-1.5 text-[10px] text-[#18B66A] font-medium">
                      <MapPin className="w-3 h-3" />
                      <span>{STORE_CONFIG.address}</span>
                    </div>
                  </div>
                </div>

                {/* Dados do Cliente e Pagamento */}
                <div className="space-y-3 p-4 rounded-2xl bg-[#0B0F0E] border border-[#1F2925]">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#A8B0AC] mb-1">
                      Seu Nome (opcional)
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Ex: Carlos Silva"
                      className="w-full px-3 py-2 bg-[#121816] border border-[#1F2925] rounded-xl text-xs text-[#F7F7F5] placeholder-[#A8B0AC]/50 focus:outline-none focus:border-[#18B66A]"
                    />
                  </div>

                  {/* Forma de Pagamento */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#A8B0AC] mb-1">
                      Forma de Pagamento Pretendida
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('PIX')}
                        className={`flex flex-col items-center justify-center p-2 rounded-xl border text-[11px] font-bold transition-all ${
                          paymentMethod === 'PIX'
                            ? 'bg-[#18B66A]/15 border-[#18B66A] text-[#18B66A]'
                            : 'bg-[#121816] border-[#1F2925] text-[#A8B0AC] hover:text-[#F7F7F5]'
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
                            ? 'bg-[#18B66A]/15 border-[#18B66A] text-[#18B66A]'
                            : 'bg-[#121816] border-[#1F2925] text-[#A8B0AC] hover:text-[#F7F7F5]'
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
                            ? 'bg-[#18B66A]/15 border-[#18B66A] text-[#18B66A]'
                            : 'bg-[#121816] border-[#1F2925] text-[#A8B0AC] hover:text-[#F7F7F5]'
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
                          className="w-full px-3 py-2 bg-[#121816] border border-[#1F2925] rounded-xl text-xs text-[#F7F7F5] placeholder-[#A8B0AC]/50 focus:outline-none focus:border-[#18B66A]"
                        />
                      </div>
                    )}
                  </div>

                  {/* Observações */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#A8B0AC] mb-1">
                      Observações adicionais (opcional)
                    </label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Ex: Gostaria de confirmar se tem cerveja trincando"
                      className="w-full px-3 py-2 bg-[#121816] border border-[#1F2925] rounded-xl text-xs text-[#F7F7F5] placeholder-[#A8B0AC]/50 focus:outline-none focus:border-[#18B66A]"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer com Total e Botão de Envio WhatsApp */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#1F2925] bg-[#0B0F0E] space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#A8B0AC]">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-base font-black text-[#F7F7F5] pt-2 border-t border-[#1F2925]">
                  <span>Total Estimado</span>
                  <span className="text-[#18B66A] text-lg">
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
                    ? 'bg-[#18B66A] hover:bg-[#087A47] text-[#0B0F0E] shadow-[#18B66A]/25 hover:scale-[1.02] active:scale-[0.98]'
                    : 'bg-[#1F2925] text-[#A8B0AC]/40 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>Enviar Pedido no WhatsApp</span>
              </button>

              <p className="text-[11px] text-center text-[#A8B0AC]/70">
                Seu pedido será enviado formatado diretamente para nosso atendente.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
