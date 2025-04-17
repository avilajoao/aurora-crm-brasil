
import { Notificacao, TipoReferencia, TipoNotificacao } from "@/types";

interface CriarNotificacaoProps {
  titulo: string;
  mensagem: string;
  tipo: TipoNotificacao;
  destinatarioIds: string[];
  dadosReferencia?: {
    tipo: TipoReferencia;
    id: string;
  };
}

export const criarNotificacao = (notificacaoData: CriarNotificacaoProps): Notificacao => {
  const novaNotificacao: Notificacao = {
    id: Date.now().toString(),
    dataCriacao: new Date(),
    lida: false,
    ...notificacaoData
  };

  // Aqui poderia ter lógica para persistir a notificação em um banco de dados
  console.log("Nova notificação:", novaNotificacao);
  
  return novaNotificacao;
};

export const marcarComoLida = (notificacaoId: string): void => {
  // Aqui iria a lógica para marcar como lida no banco de dados
  console.log(`Notificação ${notificacaoId} marcada como lida`);
};

export const obterNotificacoesUsuario = (usuarioId: string): Notificacao[] => {
  // Aqui iria a lógica para buscar notificações de um usuário específico
  // Por enquanto retorna um array vazio
  return [];
};
