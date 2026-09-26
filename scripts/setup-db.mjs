import fs from 'fs';
import path from 'path';
import pg from 'pg';

const connectionString = 'postgresql://postgres:Luizlpm3130@db.vhousrkxtzdpuewxsfak.supabase.co:5432/postgres';

async function setup() {
  console.log('Conectando ao banco de dados Supabase...');
  const client = new pg.Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Conectado com sucesso ao PostgreSQL do Supabase!');

    const schemaPath = path.resolve('supabase/schema.sql');
    const sql = fs.readFileSync(schemaPath, 'utf8');

    console.log('Executando schema.sql...');
    await client.query(sql);
    console.log('Tabelas criadas e catálogo inicial povoado com sucesso!');

    // Testar leitura da tabela products
    const res = await client.query('SELECT count(*) FROM public.products');
    console.log(`Total de produtos no banco Supabase: ${res.rows[0].count}`);

    // Testar leitura de admin_auth
    const resAdmin = await client.query('SELECT * FROM public.admin_auth');
    console.log(`Credenciais do admin inicializadas: ${resAdmin.rows.length}`);

  } catch (err) {
    console.error('Erro na conexão/execução:', err.message);
  } finally {
    await client.end();
  }
}

setup();
