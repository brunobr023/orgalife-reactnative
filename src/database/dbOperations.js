import { getDBConnection } from './localDB';

// ==========================================
// OPERAÇÕES DE CONTAS
// ==========================================
export const insertConta = async (conta) => {
  const db = await getDBConnection();
  const { id_conta, id_user, nome, tipo, saldo_inicial, saldo_atual, cor_hex } = conta;
  
  try {
    const statement = await db.prepareAsync(
      `INSERT INTO contas (id_conta, id_user, nome, tipo, saldo_inicial, saldo_atual, cor_hex, sincronizado) 
       VALUES ($id_conta, $id_user, $nome, $tipo, $saldo_inicial, $saldo_atual, $cor_hex, 0);`
    );
    
    try {
      await statement.executeAsync({
        $id_conta: id_conta,
        $id_user: id_user,
        $nome: nome,
        $tipo: tipo,
        $saldo_inicial: saldo_inicial,
        $saldo_atual: saldo_atual,
        $cor_hex: cor_hex
      });
      console.log(`Conta "${nome}" salva localmente!`);
      return true;
    } finally {
      await statement.finalizeAsync();
    }
  } catch (error) {
    console.error("Erro ao inserir conta no SQLite:", error);
    return false;
  }
};

// ==========================================
// OPERAÇÕES DE CATEGORIAS
// ==========================================
export const insertCategoria = async (categoria) => {
  const db = await getDBConnection();
  const { id_cate, id_user, nome, tipo, icone, cor_hex, limite_mensal } = categoria;

  try {
    const statement = await db.prepareAsync(
      `INSERT INTO categorias (id_cate, id_user, nome, tipo, icone, cor_hex, limite_mensal, sincronizado) 
       VALUES ($id_cate, $id_user, $nome, $tipo, $icone, $cor_hex, $limite_mensal, 0);`
    );

    try {
      await statement.executeAsync({
        $id_cate: id_cate,
        $id_user: id_user,
        $nome: nome,
        $tipo: tipo,
        $icone: icone,
        $cor_hex: cor_hex,
        $limite_mensal: limite_mensal
      });
      console.log(`Categoria "${nome}" salva localmente!`);
      return true;
    } finally {
      await statement.finalizeAsync();
    }
  } catch (error) {
    console.error("Erro ao inserir categoria no SQLite:", error);
    return false;
  }
};

// ==========================================
// OPERAÇÕES DE TRANSAÇÕES
// ==========================================
export const insertTransacao = async (transacao) => {
  const db = await getDBConnection();
  const { 
    id_tran, id_user, valor, data, descricao, tipo, id_cate, id_conta_origem, id_conta_destino, id_cartao 
  } = transacao;

  try {
    const statement = await db.prepareAsync(
      `INSERT INTO transacoes (id_tran, id_user, valor, data, descricao, tipo, id_cate, id_conta_origem, id_conta_destino, id_cartao, sincronizado) 
       VALUES ($id_tran, $id_user, $valor, $data, $descricao, $tipo, $id_cate, $id_conta_origem, $id_conta_destino, $id_cartao, 0);`
    );

    try {
      await statement.executeAsync({
        $id_tran: id_tran,
        $id_user: id_user,
        $valor: valor,
        $data: data,
        $descricao: descricao,
        $tipo: tipo,
        $id_cate: id_cate,
        $id_conta_origem: id_conta_origem,
        $id_conta_destino: id_conta_destino,
        $id_cartao: id_cartao
      });
      console.log(`Transação "${descricao}" salva localmente!`);
      return true;
    } finally {
      await statement.finalizeAsync();
    }
  } catch (error) {
    console.error("Erro ao inserir transação no SQLite:", error);
    return false;
  }
};
// Buscar todas as transações do usuário com detalhes da conta e categoria
export const getTransacoesComDetalhes = async (id_user) => {
  const db = await getDBConnection();
  try {
    const query = `
      SELECT 
        t.*, 
        c.nome AS nome_conta, 
        cat.nome AS nome_categoria 
      FROM transacoes t
      LEFT JOIN contas c ON t.id_conta_origem = c.id_conta
      LEFT JOIN categorias cat ON t.id_cate = cat.id_cate
      WHERE t.id_user = ?
      ORDER BY t.data DESC;
    `;
    const result = await db.getAllAsync(query, [id_user]);
    return result;
  } catch (error) {
    console.error("Erro ao buscar transações detalhadas:", error);
    return [];
  }
};