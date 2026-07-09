import * as SQLite from 'expo-sqlite';
import { migration_01 } from './migrations/01_create_metas_table';

const DATABASE_NAME = "orgalife.db";

export async function inicializarBancoDeDados() {
  const db = await SQLite.openDatabaseAsync(DATABASE_NAME);

  try {
    // Executa a primeira migração para garantir que a tabela com ID em formato de TEXT (UUID) existe
    await db.execAsync(migration_01);
    console.log("Banco de dados SQLite e tabelas inicializados com sucesso!");
    return db;
  } catch (error) {
    console.error("Erro ao inicializar o banco de dados:", error);
    throw error;
  }
}