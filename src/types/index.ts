
// Status types
export type StatusTarefa = "pendente" | "em_andamento" | "em_revisao" | "concluida" | "bloqueada";
export type StatusProjeto = "em_analise" | "aguardando_aprovacao" | "aprovado" | "em_andamento" | "em_pausa" | "concluido" | "cancelado";
export type StatusSolicitacaoCompra = "pendente" | "aprovada" | "parcialmente_aprovada" | "rejeitada" | "cancelada";
export type StatusCompra = "pendente" | "parcialmente_recebida" | "recebida" | "cancelada";
export type StatusOrcamento = "rascunho" | "enviado_ao_cliente" | "em_revisao" | "aprovado_pelo_cliente" | "rejeitado_pelo_cliente" | "aguardando_modificacoes" | "cancelado";
export type StatusFornecedor = "ativo" | "inativo" | "bloqueado" | "em_analise";
export type StatusEquipe = "ativa" | "inativa" | "temporaria";

// Priority types
export type PrioridadeTarefa = "baixa" | "media" | "alta" | "urgente";
export type PrioridadeSolicitacao = "baixa" | "media" | "alta" | "urgente";

// User roles
export type UserRole = "admin" | "gestor" | "supervisor" | "operador" | "rh" | "cliente" | "vendas" | "comprador";

// Notification types
export type TipoNotificacao = "info" | "success" | "warning" | "error";
export type TipoReferencia = "tarefa" | "projeto" | "orcamento" | "compra" | "solicitacao";

// User permissions
export type UserPermission = 
  | "view_purchase_values" 
  | "edit_purchase_values"
  | "view_budget_values"
  | "edit_budget_values"
  | "change_budget_status"
  | "edit_purchase_requests"
  | "change_purchase_status";

// Data types
export interface Usuario {
  id: string;
  nome: string;
  email: string;
  cargo: string;
  departamento: string;
  role: UserRole;
  avatar?: string;
  permissions: UserPermission[];
  equipeId?: string;
}

export interface Notificacao {
  id: string;
  titulo: string;
  mensagem: string;
  tipo: TipoNotificacao;
  dataCriacao: Date;
  lida: boolean;
  destinatarioIds: string[];
  dadosReferencia?: {
    tipo: TipoReferencia;
    id: string;
  };
}

export interface SolicitacaoCompra {
  id: string;
  titulo: string;
  descricao?: string;
  solicitanteId: string;
  aprovadorId?: string;
  dataAprovacao?: Date;
  dataSolicitacao: Date;
  status: StatusSolicitacaoCompra;
  itens: ItemSolicitacao[];
  prioridade: PrioridadeSolicitacao;
  observacoes?: string;
  projetoId?: string;
}

export interface ItemSolicitacao {
  id: string;
  nome: string;
  quantidade: number;
  unidade: string;
  especificacoes?: string;
  valorEstimado?: number;
  aprovado?: boolean;
  fornecedorSugerido?: string;
}

export interface Compra {
  id: string;
  solicitacaoId?: string;
  projetoId: string;
  fornecedorId: string;
  responsavelId: string;
  numeroNotaFiscal?: string;
  valorTotal: number;
  dataCompra: Date;
  dataEntrega?: Date;
  status: StatusCompra;
  itens: any[];
}

export interface Orcamento {
  id: string;
  clienteId: string;
  titulo: string;
  descricao?: string;
  status: StatusOrcamento;
  valorTotal: number;
  responsavelId: string;
  dataCriacao: Date;
  dataEnvio?: Date;
  dataAprovacao?: Date;
  dataValidade?: Date;
  itens: any[];
  comentarios: any[];
}

export interface Projeto {
  id: string;
  titulo: string;
  cliente: string;
  responsavel: string;
  valor: number;
  status: StatusProjeto;
  dataPrevista: string;
  descricao?: string;
}
