import React from 'react';
import { 
  Trash2, 
  ShoppingBag, 
  Store, 
  CreditCard, 
  QrCode, 
  Banknote,
  MapPin,
  ArrowRight
} from 'lucide-react';
import Sheet from './Sheet';
import QuantityStepper from './QuantityStepper';
import { useCart } from '../context/CartContext';
import { STORE_CONFIG } from '../data/products';
import { formatBRL } from '../lib/format';

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
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

  const isFormValid = items.length > 0;

  return (
    <Sheet
      open={isCartOpen}
      onClose={() => setIsCartOpen(false)}
      title="Sua Sacola"
      headerAction={
        items.length > 0 ? (
          <button
            type="button"
            onClick={clearCart}
            aria-label="Limpar sacola"
            className="p-2 text-xs font-semibold text-muted hover:text-danger flex items-center gap-1 transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Limpar</span>
          </button>
        ) : null
      }
      footer={
        items.length > 0 ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted font-medium">Total com retirada</span>
              <span className="text-xl font-black text-ink font-display">
                {formatBRL(total)}
              </span>
            </div>

            <button
              type="button"
              onClick={sendOrderToWhatsApp}
              disabled={!isFormValid}
              className={`w-full py-4 px-5 rounded-full flex items-center justify-center gap-2 text-sm font-black uppercase tracking-wider transition-all shadow-lg active:scale-98 ${
                isFormValid
                  ? 'bg-whatsapp hover:bg-whatsapp-strong text-white shadow-whatsapp/25'
                  : 'bg-line text-muted cursor-not-allowed shadow-none'
              }`}
            >
              <img src="/whatsapp-icon.png" alt="" className="w-5 h-5 object-contain" />
              <span>Enviar Pedido no WhatsApp</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        ) : null
      }
    >
      <div className="p-4 sm:p-5 space-y-5">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-12 text-muted">
            <div className="w-16 h-16 rounded-full bg-surface-2 border border-line flex items-center justify-center mb-4 text-muted/60">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-base font-extrabold text-ink mb-1">
              Sua sacola está vazia
            </h3>
            <p className="text-xs text-muted max-w-xs mb-5">
              Adicione cervejas trincando de geladas, petiscos e combos para pedir na MF.
            </p>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="px-6 py-2.5 rounded-full bg-brand text-on-brand font-black text-xs uppercase tracking-wider transition-all shadow-xs active:scale-95"
            >
              Explorar Cardápio
            </button>
          </div>
        ) : (
          <>
            {/* Lista de Itens */}
            <div className="space-y-2.5">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-surface-2 border border-line"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover bg-surface flex-none border border-line"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-ink truncate font-sans">
                      {item.name}
                    </h4>
                    <span className="text-[11px] text-muted block">
                      {item.unit}
                    </span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-xs sm:text-sm font-black text-ink">
                        {formatBRL(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>

                  {/* Quantity Stepper Compacto */}
                  <div className="flex-none">
                    <QuantityStepper
                      quantity={item.quantity}
                      size="sm"
                      label={item.name}
                      onIncrement={() => updateQuantity(item.id, 1)}
                      onDecrement={() => updateQuantity(item.id, -1)}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Modalidade de Retirada */}
            <div className="p-3.5 rounded-2xl bg-brand/15 border border-brand/40 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-brand text-on-brand flex-none mt-0.5">
                <Store className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <h4 className="font-extrabold text-ink uppercase tracking-wide">
                  Retirada Rápida no Balcão
                </h4>
                <p className="text-muted mt-0.5 leading-relaxed">
                  Separamos seu pedido gelado para retirada imediata sem filas.
                </p>
                <div className="flex items-center gap-1 mt-1 text-[11px] text-ink font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-brand" />
                  <span>{STORE_CONFIG.address}</span>
                </div>
              </div>
            </div>

            {/* Dados do Cliente e Pagamento */}
            <div className="space-y-3.5 p-4 rounded-2xl bg-surface border border-line">
              <div>
                <label className="block text-xs font-bold text-ink mb-1.5">
                  Seu Nome (opcional)
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Ex: Carlos Silva"
                  className="w-full px-3.5 py-2.5 bg-surface-2 border border-line rounded-xl text-xs text-ink placeholder:text-muted/60 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition"
                />
              </div>

              {/* Forma de Pagamento */}
              <div>
                <label className="block text-xs font-bold text-ink mb-1.5">
                  Forma de Pagamento Pretendida
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'PIX', label: 'PIX', icon: QrCode },
                    { id: 'Cartão', label: 'Cartão', icon: CreditCard },
                    { id: 'Dinheiro', label: 'Dinheiro', icon: Banknote },
                  ].map((method) => {
                    const Icon = method.icon;
                    const isSelected = paymentMethod === method.id;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id)}
                        className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-brand text-on-brand border-brand shadow-xs font-black'
                            : 'bg-surface-2 border-line text-muted hover:text-ink'
                        }`}
                      >
                        <Icon className="w-4 h-4 mb-1" />
                        <span>{method.label}</span>
                      </button>
                    );
                  })}
                </div>

                {paymentMethod === 'Dinheiro' && (
                  <div className="mt-2.5">
                    <input
                      type="text"
                      value={changeFor}
                      onChange={(e) => setChangeFor(e.target.value)}
                      placeholder="Troco para quanto? (Ex: R$ 50)"
                      className="w-full px-3.5 py-2 bg-surface-2 border border-line rounded-xl text-xs text-ink placeholder:text-muted/60 focus:outline-none focus:border-brand"
                    />
                  </div>
                )}
              </div>

              {/* Observações */}
              <div>
                <label className="block text-xs font-bold text-ink mb-1.5">
                  Observações (opcional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex: Cerveja trincando, por favor!"
                  className="w-full px-3.5 py-2.5 bg-surface-2 border border-line rounded-xl text-xs text-ink placeholder:text-muted/60 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </Sheet>
  );
}
