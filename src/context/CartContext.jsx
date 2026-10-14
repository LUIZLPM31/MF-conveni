import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { STORE_CONFIG } from '../data/products';
import { formatBRL, whatsappUrl } from '../lib/format';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('mf_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('PIX'); // 'PIX' | 'Cartão' | 'Dinheiro'
  const [changeFor, setChangeFor] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('mf_cart_items', JSON.stringify(items));
    } catch (e) {
      console.error('Erro ao salvar carrinho no localStorage', e);
    }
  }, [items]);

  const addToCart = (product, quantity = 1) => {
    setItems(prevItems => {
      const existing = prevItems.find(item => item.id === product.id);
      if (existing) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setItems(prevItems => {
      return prevItems
        .map(item => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const getQuantity = (productId) =>
    items.find(item => item.id === productId)?.quantity ?? 0;

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  const deliveryFee = 0;
  
  const total = subtotal;

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFC51A', '#F0B400', '#171614', '#16A34A', '#ffffff'],
      });
    } catch (e) {
      // Ignora se não carregar
    }
  };

  const sendOrderToWhatsApp = () => {
    if (items.length === 0) return;

    let text = `👑 *CONSULTA / PEDIDO - ${STORE_CONFIG.name.toUpperCase()}* 👑\n`;
    text += `_${STORE_CONFIG.slogan}_\n\n`;

    if (customerName.trim()) {
      text += `👤 *Cliente:* ${customerName.trim()}\n`;
    }

    text += `🏪 *Modalidade:* Retirada no Balcão (Av. Vicente Monteggia, 2140)\n`;

    text += `💳 *Pagamento Pretendido:* ${paymentMethod}`;
    if (paymentMethod === 'Dinheiro' && changeFor) {
      text += ` (Troco para R$ ${changeFor})`;
    }
    text += `\n`;

    if (notes.trim()) {
      text += `📝 *Observação:* ${notes.trim()}\n`;
    }

    text += `\n🛒 *ITENS SELECIONADOS:*\n`;
    items.forEach(item => {
      text += `• *${item.quantity}x* ${item.name} (${item.unit}) - ${formatBRL(item.price * item.quantity)}\n`;
    });

    text += `\n--------------------------------\n`;
    text += `💰 *TOTAL: ${formatBRL(total)}*\n`;
    text += `--------------------------------\n`;
    text += `Favor confirmar a disponibilidade dos itens para retirada! 🍻`;

    triggerCelebration();

    window.open(whatsappUrl(text), '_blank');
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        getQuantity,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        deliveryFee,
        total,
        isCartOpen,
        setIsCartOpen,
        customerName,
        setCustomerName,
        paymentMethod,
        setPaymentMethod,
        changeFor,
        setChangeFor,
        notes,
        setNotes,
        sendOrderToWhatsApp,
        triggerCelebration
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
}
