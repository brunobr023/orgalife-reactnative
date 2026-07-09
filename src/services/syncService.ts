import { supabase } from '../database/supabase';
import { type SQLiteDatabase } from 'expo-sqlite';

export async function sincronizarDadosLocais(db: SQLiteDatabase) {
  try {
    // 1. Pega o usuário logado atualmente (funciona offline se já logou antes)
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: 'Usuário não autenticado' };

    // --- ENVIAR DADOS LOCAIS PARA A NUVEM ---
    // 2. Busca no SQLite tudo que foi criado/alterado e está com sincronizado = 0
    const itensNaoSincronizados = await db.getAllAsync<any>(
      'SELECT * FROM metas WHERE sincronizado = 0'
    );

    if (itensNaoSincronizados.length > 0) {
      // 3. Faz o upload em massa (upsert) para o Supabase
      const dadosParaEnviar = itensNaoSincronizados.map((item) => ({
        id: item.id, // Garanta que usa UUIDs (ex: usando expo-crypto ou uuid) gerados localmente
        title: item.title,
        user_id: user.id,
      }));

      const { error: upsertError } = await supabase
        .from('metas')
        .upsert(dadosParaEnviar);

      if (!upsertError) {
        // 4. CORREÇÃO: Atualiza no SQLite apenas os IDs que foram enviados com sucesso
        const idsSincronizados = itensNaoSincronizados.map(item => `'${item.id}'`).join(',');
        await db.execAsync(
          `UPDATE metas SET sincronizado = 1 WHERE id IN (${idsSincronizados})`
        );
      } else {
        console.error("Erro ao subir dados para o Supabase:", upsertError);
      }
    }

    // --- PUXAR DADOS DA NUVEM PARA O DISPOSITIVO ---
    // 5. Busca as atualizações que estão no Supabase e baixa para o SQLite
    const { data: dadosNuvem, error: selectError } = await supabase
      .from('metas')
      .select('*')
      .eq('user_id', user.id);

    if (!selectError && dadosNuvem) {
      for (const item of dadosNuvem) {
        await db.runAsync(
          'INSERT OR REPLACE INTO metas (id, title, sincronizado) VALUES (?, ?, 1)',
          [item.id, item.title]
        );
      }
    }

    return { success: true };
  } catch (error) {
    console.error("Erro na sincronização:", error);
    return { success: false, error };
  }
}