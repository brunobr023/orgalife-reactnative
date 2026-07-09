import * as SQLite from 'expo-sqlite';

// Abre ou cria o arquivo de banco de dados no celular
export const getDBConnection = async () => {
  return await SQLite.openDatabaseAsync('orgalife_local.db');
};

// Cria as tabelas na primeira vez que o app abre
export const initializeDatabase = async () => {
  try {
    const db = await getDBConnection();
    
    await db.execAsync(`
      PRAGMA foreign_keys = ON;

      CREATE TABLE IF NOT EXISTS contas (
        id_conta TEXT PRIMARY KEY NOT NULL,
        id_user TEXT NOT NULL,
        nome TEXT NOT NULL,
        tipo TEXT NOT NULL,
        saldo_inicial INTEGER NOT NULL DEFAULT 0,
        saldo_atual INTEGER NOT NULL DEFAULT 0,
        cor_hex TEXT,
        sincronizado INTEGER DEFAULT 0
      );

      CREATE TABLE IF NOT EXISTS categorias (
        id_cate TEXT PRIMARY KEY NOT NULL,
        id_user TEXT NOT NULL,
        nome TEXT NOT NULL,
        tipo TEXT NOT NULL,
        icone TEXT,
        cor_hex TEXT,
        limite_mensal INTEGER,
        sincronizado INTEGER DEFAULT 0
      );

      CREATE TABLE IF NOT EXISTS transacoes (
        id_tran TEXT PRIMARY KEY NOT NULL,
        id_user TEXT NOT NULL,
        valor INTEGER NOT NULL,
        data INTEGER NOT NULL, 
        descricao TEXT,
        tipo TEXT NOT NULL,
        id_cate TEXT,
        id_conta_origem TEXT NOT NULL,
        id_conta_destino TEXT,
        id_cartao TEXT,
        sincronizado INTEGER DEFAULT 0,
        FOREIGN KEY (id_conta_origem) REFERENCES contas (id_conta) ON DELETE CASCADE,
        FOREIGN KEY (id_cate) REFERENCES categorias (id_cate) ON DELETE SET NULL
      );
    `);
    console.log("Banco de dados SQLite inicializado com sucesso!");
  } catch (error) {
    console.error("Erro ao inicializar o banco de dados:", error);
  }
};