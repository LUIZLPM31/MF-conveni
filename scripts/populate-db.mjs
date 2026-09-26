// Script para popular o banco Supabase via API REST
const SUPABASE_URL = 'https://vhousrkxtzdpuewxsfak.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZob3Vzcmt4dHpkcHVld3hzZmFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA0MzQ2NTAsImV4cCI6MjEwNjAxMDY1MH0.eC1T0Mfn2ydCsRwNdmHII2V3Y_cu3BBE1fHA790WgU0';

const products = [
  { id: 'balde-cerveja-gelo', name: 'Balde de Alumínio com 6 Long Necks Geladas + Gelo', category: 'cervejas', price: 54.90, old_price: 65.00, unit: 'Balde + 6 Long Necks + Gelo', badge: 'Destaque do Banner', is_cold: true, rating: 5.0, description: 'Balde de gelo caprichado com 6 Long Necks trincando de geladas.', image: 'https://images.unsplash.com/photo-1518176258769-f227c798150e?w=600&auto=format&fit=crop&q=80' },
  { id: 'heineken-longneck', name: 'Cerveja Heineken Long Neck 330ml', category: 'cervejas', price: 8.99, old_price: 10.50, unit: 'Unidade 330ml', badge: 'Super Gelada', is_cold: true, rating: 5.0, description: 'A clássica Heineken trincando de gelada, puro malte de qualidade premium.', image: 'https://images.unsplash.com/photo-1618886614638-80e3c15cd819?w=600&auto=format&fit=crop&q=80' },
  { id: 'heineken-lata-pack', name: 'Pack Cerveja Heineken 6 Latas 350ml', category: 'cervejas', price: 36.90, old_price: 42.00, unit: 'Pack c/ 6 unidades', badge: 'Mais Vendido', is_cold: true, rating: 4.9, description: 'Pack com 6 latas de Heineken geladas na temperatura ideal para o seu rolê.', image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=600&auto=format&fit=crop&q=80' },
  { id: 'budweiser-longneck', name: 'Cerveja Budweiser American Lager 330ml', category: 'cervejas', price: 7.99, old_price: 8.90, unit: 'Unidade 330ml', badge: 'Geladíssima', is_cold: true, rating: 4.8, description: 'Budweiser gelada com seu sabor marcante e refrescante.', image: 'https://images.unsplash.com/photo-1608270192802-53b9843a53e0?w=600&auto=format&fit=crop&q=80' },
  { id: 'corona-extra-330ml', name: 'Cerveja Corona Extra com Limão 330ml', category: 'cervejas', price: 9.50, old_price: 11.00, unit: 'Unidade 330ml', badge: 'Premium', is_cold: true, rating: 5.0, description: 'Corona trincando de gelada, perfeita com fatia de limão.', image: 'https://images.unsplash.com/photo-1584225064785-c62a8b43d148?w=600&auto=format&fit=crop&q=80' },
  { id: 'spaten-lata-pack', name: 'Pack Cerveja Spaten Munich Helles 6 Latas 350ml', category: 'cervejas', price: 32.90, old_price: 37.00, unit: 'Pack c/ 6 unidades', badge: 'Puro Malte', is_cold: true, rating: 4.9, description: 'Cerveja alemã puro malte com amargor suave e corpo marcante.', image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&auto=format&fit=crop&q=80' },
  { id: 'coca-cola-2l', name: 'Refrigerante Coca-Cola Original 2 Litros', category: 'refrigerantes', price: 11.99, old_price: 13.50, unit: 'Garrafa 2L', badge: 'Super Gelada', is_cold: true, rating: 5.0, description: 'Coca-Cola trincando de gelada para o almoço ou resenha com os amigos.', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80' },
  { id: 'coca-cola-zero-2l', name: 'Refrigerante Coca-Cola Sem Açúcar 2L', category: 'refrigerantes', price: 11.99, old_price: 13.50, unit: 'Garrafa 2L', badge: 'Zero Calorias', is_cold: true, rating: 4.8, description: 'Sabor original com zero açúcar.', image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=600&auto=format&fit=crop&q=80' },
  { id: 'fanta-laranja-2l', name: 'Refrigerante Fanta Laranja 2 Litros', category: 'refrigerantes', price: 9.90, old_price: 11.50, unit: 'Garrafa 2L', badge: 'Gelada', is_cold: true, rating: 4.7, description: 'Fanta Laranja bem gelada.', image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=600&auto=format&fit=crop&q=80' },
  { id: 'guarana-antarctica-2l', name: 'Refrigerante Guaraná Antarctica 2L', category: 'refrigerantes', price: 9.90, old_price: 11.50, unit: 'Garrafa 2L', badge: 'Original do Brasil', is_cold: true, rating: 4.9, description: 'O sabor original do Brasil geladinho.', image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80' },
  { id: 'red-bull-energy-250ml', name: 'Energético Red Bull Energy Drink 250ml', category: 'refrigerantes', price: 10.99, old_price: 12.50, unit: 'Lata 250ml', badge: 'Te Dá Asas', is_cold: true, rating: 4.9, description: 'O energético mais famoso do mundo, gelado.', image: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?w=600&auto=format&fit=crop&q=80' },
  { id: 'monster-energy-473ml', name: 'Energético Monster Energy Tradicional 473ml', category: 'refrigerantes', price: 11.90, old_price: 13.50, unit: 'Lata 473ml', badge: 'Lata Grande', is_cold: true, rating: 4.9, description: 'Lata grande de 473ml super gelada.', image: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=600&auto=format&fit=crop&q=80' },
  { id: 'salgadinho-doritos-140g', name: 'Salgadinho Doritos Queijo Nacho 140g', category: 'petiscos', price: 12.90, old_price: 14.90, unit: 'Pacote 140g', badge: 'O Favorito', is_cold: false, rating: 5.0, description: 'Doritos queijo nacho crocante e irresistível.', image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&auto=format&fit=crop&q=80' },
  { id: 'batata-ruffles-churrasco-135g', name: 'Batata Ruffles Sabor Churrasco 135g', category: 'petiscos', price: 11.90, old_price: 13.90, unit: 'Pacote 135g', badge: 'Crocante', is_cold: false, rating: 4.8, description: 'A clássica batata ondulada com sabor defumado.', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop&q=80' },
  { id: 'whisky-red-label-1l', name: 'Whisky Johnnie Walker Red Label 1 Litro', category: 'destilados', price: 98.90, old_price: 115.00, unit: 'Garrafa 1L', badge: '100% Original', is_cold: false, rating: 4.9, description: 'Scotch Whisky escocês autêntico com selo IPI.', image: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=600&auto=format&fit=crop&q=80' },
  { id: 'vodka-smirnoff-998ml', name: 'Vodka Smirnoff Red No. 21 998ml', category: 'destilados', price: 44.90, old_price: 52.00, unit: 'Garrafa 998ml', badge: 'Triplamente Destilada', is_cold: false, rating: 4.8, description: 'Vodka consagrada mundialmente, pura e cristalina.', image: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?w=600&auto=format&fit=crop&q=80' },
  { id: 'gin-tanqueray-london-dry-750ml', name: 'Gin Tanqueray London Dry Importado 750ml', category: 'destilados', price: 129.90, old_price: 145.00, unit: 'Garrafa 750ml', badge: 'Importado', is_cold: false, rating: 5.0, description: 'Gin premium botânico perfeito para compor seus drinks.', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80' },
  { id: 'saco-gelo-5kg', name: 'Saco de Gelo Filtrado em Cubos 5kg', category: 'gelo-churrasco', price: 12.00, old_price: 14.00, unit: 'Saco 5kg', badge: 'Trincando', is_cold: true, rating: 5.0, description: 'Gelo de água mineral filtrada em cubos sólidos.', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80' },
  { id: 'saco-carvao-3kg', name: 'Carvão Vegetal Especial para Churrasco 3kg', category: 'gelo-churrasco', price: 18.00, old_price: 22.00, unit: 'Saco 3kg', badge: 'Brasa Forte', is_cold: false, rating: 4.8, description: 'Carvão com pedaços grandes para rápida brasa.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80' }
];

async function populate() {
  console.log(`Enviando ${products.length} produtos para o Supabase...`);
  
  const response = await fetch(`${SUPABASE_URL}/rest/v1/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Prefer': 'resolution=merge-duplicates'
    },
    body: JSON.stringify(products)
  });

  if (response.ok) {
    console.log('✅ Todos os produtos foram inseridos com sucesso no Supabase!');
  } else {
    const errorBody = await response.text();
    console.error('❌ Erro ao inserir produtos:', response.status, errorBody);
  }

  // Verificar contagem
  const countResp = await fetch(`${SUPABASE_URL}/rest/v1/products?select=id`, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`
    }
  });
  const data = await countResp.json();
  console.log(`📦 Total de produtos no banco agora: ${data.length}`);
}

populate();
