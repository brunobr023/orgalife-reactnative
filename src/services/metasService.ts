import * as Crypto from 'expo-crypto';
import { type SQLiteDatabase } from 'expo-sqlite';

interface CriarMetaProps {
  db: SQLiteDatabase;
  title: string;
}

export async function criarMetaLocal({ db, title }: CriarMetaProps) {
  // 1. Passo 1 concluído: Geramos o ID único universal (UUID) antes de salvar
  const uuid = Crypto.randomUUID(); 

  try {
    await db.runAsync(
      'INSERT INTO metas (id, title, sincronizado) VALUES (?, ?, 0)',
      [uuid, title]
    );
    return { success: true, id: uuid };
  } catch (error) {
    console.error("Erro ao criar meta localmente:", error);
    return { success: false, error };
  }
}