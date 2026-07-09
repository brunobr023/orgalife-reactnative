import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { getDBConnection } from '../database/localDB';
import { insertConta, insertCategoria, insertTransacao, getTransacoesComDetalhes } from '../database/dbOperations';

export default function DebugScreen() {
  const [transacoes, setTransacoes] = useState([]);
  const userIdFake = "user_bruno_123";

  const carregarDados = async () => {
    const lista = await getTransacoesComDetalhes(userIdFake);
    setTransacoes(lista);
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const rodarInjecaoDeDados = async () => {
    const timestampUnico = Date.now();
    // Ponto Importante: Sufixo aleatório para evitar colisões de IDs idênticos em cliques rápidos
    const sufixoAleatorio = Math.random().toString(36).substring(2, 7);

    const novaConta = {
      id_conta: `conta_itau_${timestampUnico}_${sufixoAleatorio}`,
      id_user: userIdFake,
      nome: "Itaú Corrente",
      tipo: "Conta Corrente",
      saldo_inicial: 1200,
      saldo_atual: 1200,
      cor_hex: "#FF6600"
    };

    const novaCategoria = {
      id_cate: `cat_esfiha_${timestampUnico}_${sufixoAleatorio}`,
      id_user: userIdFake,
      nome: "Portal da Esfiha",
      tipo: "Despesa",
      icone: "fast-food",
      cor_hex: "#ED1C24",
      limite_mensal: 600
    };

    const novaTransacao = {
      id_tran: `tran_${timestampUnico}_${sufixoAleatorio}`,
      id_user: userIdFake,
      valor: 45,
      data: timestampUnico,
      descricao: "Combo de Esfihas",
      tipo: "Despesa",
      id_cate: novaCategoria.id_cate,
      id_conta_origem: novaConta.id_conta,
      id_conta_destino: null,
      id_cartao: null
    };

    await insertConta(novaConta);
    await insertCategoria(novaCategoria);
    await insertTransacao(novaTransacao);

    carregarDados();
  };

  // Ponto Importante: Função utilitária essencial para resetar o ambiente durante testes locais
  const limparBancoLocal = async () => {
    try {
      const db = await getDBConnection();
      await db.execAsync(`
        DELETE FROM transacoes;
        DELETE FROM categorias;
        DELETE FROM contas;
      `);
      console.log("Banco local resetado com sucesso.");
      carregarDados();
    } catch (error) {
      console.error("Erro ao limpar banco local:", error);
    }
  };

  return (
    <View className="flex-1 bg-fundo-claro dark:bg-fundo-escuro p-6 pt-12">
      <Text className="text-2xl font-bold text-texto-principal-claro dark:text-white mb-2">Painel de Debug 🛠️</Text>
      <Text className="text-texto-secundario-claro dark:text-texto-secundario-escuro mb-6">Teste o banco de dados SQLite local inserindo ou limpando registros.</Text>

      {/* Grid de Botões de Ação */}
      <View className="flex-row space-x-3 mb-6">
        <TouchableOpacity 
          onPress={rodarInjecaoDeDados}
          className="flex-1 bg-emerald-600 p-4 rounded-xl items-center active:bg-emerald-700"
        >
          <Text className="text-white font-semibold text-sm">Injetar Transação</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={limparBancoLocal}
          className="flex-1 bg-rose-600 p-4 rounded-xl items-center active:bg-rose-700"
        >
          <Text className="text-white font-semibold text-sm">Resetar Banco</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-lg font-semibold text-texto-principal-claro dark:text-white mb-3">Registros no SQLite ({transacoes.length})</Text>

      <FlatList
        data={transacoes}
        keyExtractor={(item) => item.id_tran}
        renderItem={({ item }) => (
          <View className="bg-card-claro dark:bg-card-escuro p-4 rounded-xl mb-3 border border-zinc-200 dark:border-zinc-800">
            <View className="flex-row justify-between items-center mb-1">
              <Text className="text-texto-principal-claro dark:text-white font-medium text-base">{item.descricao}</Text>
              <Text className="text-red-600 dark:text-red-500 font-bold">- R$ {item.valor},00</Text>
            </View>
            
            <View className="flex-row justify-between mt-2">
              <Text className="text-xs text-texto-secundario-claro dark:text-texto-secundario-escuro">Conta: {item.nome_conta}</Text>
              <Text className="text-xs text-texto-secundario-claro dark:text-texto-secundario-escuro">Categoria: {item.nome_categoria}</Text>
            </View>

            <View className="flex-row justify-between mt-1">
              <Text className="text-[10px] text-zinc-400 dark:text-zinc-600">ID: {item.id_tran}</Text>
              <Text className="text-[10px] text-texto-secundario-claro dark:text-texto-secundario-escuro">
                Sincronizado: {item.sincronizado === 1 ? '✅ Sim' : '⏳ Não'}
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text className="text-texto-secundario-claro dark:text-texto-secundario-escuro text-center mt-8">Nenhum dado salvo no SQLite local ainda.</Text>
        }
      />
    </View>
  );
}