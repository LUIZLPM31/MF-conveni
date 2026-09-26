-- ==============================================================================
-- SCHEMA DO BANCO DE DADOS SUPABASE - MF CONVENIÊNCIAS
-- ==============================================================================
-- Instruções de Execução:
-- 1. Acesse o seu projeto no painel do Supabase: https://supabase.com/dashboard
-- 2. Vá em "SQL Editor" no menu lateral esquerdo.
-- 3. Cole todo o conteúdo deste arquivo e clique no botão "RUN".
-- ==============================================================================

-- 1. CRIAÇÃO DA TABELA DE PRODUTOS
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    old_price NUMERIC(10, 2),
    unit TEXT DEFAULT 'Unidade',
    badge TEXT,
    is_cold BOOLEAN DEFAULT true,
    rating NUMERIC(3, 1) DEFAULT 5.0,
    description TEXT,
    image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. CRIAÇÃO DA TABELA DE CREDENCIAIS DO ADMINISTRADOR
CREATE TABLE IF NOT EXISTS public.admin_auth (
    id TEXT PRIMARY KEY DEFAULT 'primary_admin',
    password TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Inserir senha padrão caso não exista
INSERT INTO public.admin_auth (id, password)
VALUES ('primary_admin', 'admin123')
ON CONFLICT (id) DO NOTHING;

-- 3. POLÍTICAS DE SEGURANÇA (RLS - Row Level Security)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_auth ENABLE ROW LEVEL SECURITY;

-- Permitir leitura pública dos produtos para todos os clientes
DROP POLICY IF EXISTS "Permitir leitura pública de produtos" ON public.products;
CREATE POLICY "Permitir leitura pública de produtos" 
ON public.products FOR SELECT 
USING (true);

-- Permitir modificações de produtos (Inserção, Edição e Exclusão)
DROP POLICY IF EXISTS "Permitir modificações de produtos" ON public.products;
CREATE POLICY "Permitir modificações de produtos" 
ON public.products FOR ALL 
USING (true)
WITH CHECK (true);

-- Permitir leitura e atualização de credenciais do administrador
DROP POLICY IF EXISTS "Permitir leitura e atualização de credenciais" ON public.admin_auth;
CREATE POLICY "Permitir leitura e atualização de credenciais" 
ON public.admin_auth FOR ALL 
USING (true)
WITH CHECK (true);

-- 4. POVOAMENTO INICIAL DOS PRODUTOS DA CONVENIÊNCIA
INSERT INTO public.products (id, name, category, price, old_price, unit, badge, is_cold, rating, description, image)
VALUES
('balde-cerveja-gelo', 'Balde de Alumínio com 6 Long Necks Geladas + Gelo', 'cervejas', 54.90, 65.00, 'Balde + 6 Long Necks + Gelo', 'Destaque do Banner', true, 5.0, 'Balde de gelo caprichado com 6 Long Necks trincando de geladas.', 'https://images.unsplash.com/photo-1518176258769-f227c798150e?w=600&auto=format&fit=crop&q=80'),
('heineken-longneck', 'Cerveja Heineken Long Neck 330ml', 'cervejas', 8.99, 10.50, 'Unidade 330ml', 'Super Gelada', true, 5.0, 'A clássica Heineken trincando de gelada, puro malte de qualidade premium.', 'https://images.unsplash.com/photo-1618886614638-80e3c15cd819?w=600&auto=format&fit=crop&q=80'),
('heineken-lata-pack', 'Pack Cerveja Heineken 6 Latas 350ml', 'cervejas', 36.90, 42.00, 'Pack c/ 6 unidades', 'Mais Vendido', true, 4.9, 'Pack com 6 latas de Heineken geladas na temperatura ideal para o seu rolê.', 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=600&auto=format&fit=crop&q=80'),
('budweiser-longneck', 'Cerveja Budweiser American Lager 330ml', 'cervejas', 7.99, 8.90, 'Unidade 330ml', 'Geladíssima', true, 4.8, 'Budweiser gelada com seu sabor marcante e refrescante.', 'https://images.unsplash.com/photo-1608270192802-53b9843a53e0?w=600&auto=format&fit=crop&q=80'),
('corona-extra-330ml', 'Cerveja Corona Extra com Limão 330ml', 'cervejas', 9.50, 11.00, 'Unidade 330ml', 'Premium', true, 5.0, 'Corona trincando de gelada, perfeita para acompanhar com fatia de limão.', 'https://images.unsplash.com/photo-1584225064785-c62a8b43d148?w=600&auto=format&fit=crop&q=80'),
('spaten-lata-pack', 'Pack Cerveja Spaten Munich Helles 6 Latas 350ml', 'cervejas', 32.90, 37.00, 'Pack c/ 6 unidades', 'Puro Malte', true, 4.9, 'Cerveja alemã puro malte com amargor suave e corpo marcante.', 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&auto=format&fit=crop&q=80'),
('coca-cola-2l', 'Refrigerante Coca-Cola Original 2 Litros', 'refrigerantes', 11.99, 13.50, 'Garrafa 2L', 'Super Gelada', true, 5.0, 'Coca-Cola trincando de gelada para o almoço ou resenha com os amigos.', 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80'),
('coca-cola-zero-2l', 'Refrigerante Coca-Cola Sem Açúcar 2L', 'refrigerantes', 11.99, 13.50, 'Garrafa 2L', 'Zero Calorias', true, 4.8, 'Sabor original com zero açúcar.', 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=600&auto=format&fit=crop&q=80'),
('fanta-laranja-2l', 'Refrigerante Fanta Laranja 2 Litros', 'refrigerantes', 9.90, 11.50, 'Garrafa 2L', 'Gelada', true, 4.7, 'Fanta Laranja bem gelada.', 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=600&auto=format&fit=crop&q=80'),
('guarana-antarctica-2l', 'Refrigerante Guaraná Antarctica 2L', 'refrigerantes', 9.90, 11.50, 'Garrafa 2L', 'Original do Brasil', true, 4.9, 'O sabor original do Brasil geladinho.', 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80'),
('red-bull-energy-250ml', 'Energético Red Bull Energy Drink 250ml', 'refrigerantes', 10.99, 12.50, 'Lata 250ml', 'Te Dá Asas', true, 4.9, 'O energético mais famoso do mundo, gelado para dar aquele up no rolê.', 'https://images.unsplash.com/photo-1560512823-829485b8bf24?w=600&auto=format&fit=crop&q=80'),
('monster-energy-473ml', 'Energético Monster Energy Tradicional 473ml', 'refrigerantes', 11.90, 13.50, 'Lata 473ml', 'Lata Grande', true, 4.9, 'Lata grande de 473ml super gelada.', 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=600&auto=format&fit=crop&q=80'),
('salgadinho-doritos-140g', 'Salgadinho Doritos Queijo Nacho 140g', 'petiscos', 12.90, 14.90, 'Pacote 140g', 'O Favorito', false, 5.0, 'Doritos queijo nacho crocante e irresistível.', 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&auto=format&fit=crop&q=80'),
('batata-ruffles-churrasco-135g', 'Batata Ruffles Sabor Churrasco 135g', 'petiscos', 11.90, 13.90, 'Pacote 135g', 'Crocante', false, 4.8, 'A clássica batata ondulada com sabor defumado.', 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop&q=80'),
('whisky-red-label-1l', 'Whisky Johnnie Walker Red Label 1 Litro', 'destilados', 98.90, 115.00, 'Garrafa 1L', '100% Original', false, 4.9, 'Scotch Whisky escocês autêntico com selo IPI.', 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=600&auto=format&fit=crop&q=80'),
('vodka-smirnoff-998ml', 'Vodka Smirnoff Red No. 21 998ml', 'destilados', 44.90, 52.00, 'Garrafa 998ml', 'Triplamente Destilada', false, 4.8, 'Vodka consagrada mundialmente, pura e cristalina.', 'https://images.unsplash.com/photo-1560512823-829485b8bf24?w=600&auto=format&fit=crop&q=80'),
('gin-tanqueray-london-dry-750ml', 'Gin Tanqueray London Dry Importado 750ml', 'destilados', 129.90, 145.00, 'Garrafa 750ml', 'Importado', false, 5.0, 'Gin premium botânico perfeito para compor seus drinks.', 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80'),
('saco-gelo-5kg', 'Saco de Gelo Filtrado em Cubos 5kg', 'gelo-churrasco', 12.00, 14.00, 'Saco 5kg', 'Trincando', true, 5.0, 'Gelo de água mineral filtrada em cubos sólidos que demoram a derreter.', 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80'),
('saco-carvao-3kg', 'Carvão Vegetal Especial para Churrasco 3kg', 'gelo-churrasco', 18.00, 22.00, 'Saco 3kg', 'Brasa Forte', false, 4.8, 'Carvão com pedaços grandes e selecionados para rápida brasa.', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80')
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    category = EXCLUDED.category,
    price = EXCLUDED.price,
    old_price = EXCLUDED.old_price,
    unit = EXCLUDED.unit,
    badge = EXCLUDED.badge,
    is_cold = EXCLUDED.is_cold,
    description = EXCLUDED.description,
    image = EXCLUDED.image,
    updated_at = timezone('utc'::text, now());
