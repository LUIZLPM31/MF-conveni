import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { STORE_CONFIG } from '../data/products';

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
        colors: ['#f59e0b', '#fbbf24', '#ef4444', '#10b981', '#ffffff'],
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

    text += `🏪 *Modalidade:* Retirada no Balcão\n`;

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
      text += `• *${item.quantity}x* ${item.name} (${item.unit}) - R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}\n`;
    });

    text += `\n--------------------------------\n`;
    text += `💰 *TOTAL: R$ ${total.toFixed(2).replace('.', ',')}*\n`;
    text += `--------------------------------\n`;
    text += `Favor confirmar a disponibilidade dos itens para retirada! 🍻`;

    triggerCelebration();

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
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
