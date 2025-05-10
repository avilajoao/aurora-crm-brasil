
export interface Usuario {
  id: string;
  nome: string;
  email: string;
  senha?: string;
  foto?: string;
  telefone?: string;
  endereco?: string;
  cargo?: string;
  departamento?: string;
  dataContratacao?: Date;
  salario?: number;
  nivelAcesso: string[];
  ativo: boolean;
}

export interface Notificacao {
  id: string;
  titulo: string;
  mensagem: string;
  tipo: "info" | "success" | "warning" | "error";
  dataCriacao: Date;
  lida: boolean;
  usuarioId?: string;
  destinatarioIds?: string[];
  remetenteId?: string;
  dadosReferencia?: any;
}

export interface Projeto {
  id: string;
  nome: string;
  descricao?: string;
  clienteId: string;
  dataInicio: Date;
  dataTerminoPrevista?: Date;
  dataTerminoReal?: Date;
  status: "ativo" | "concluido" | "em_espera" | "cancelado";
  orcamento: number;
  progresso: number;
  equipeResponsavel?: string[];
  tarefas?: Tarefa[];
  comentarios?: Comentario[];
}

export interface Tarefa {
  id: string;
  projetoId: string;
  nome: string;
  descricao?: string;
  responsavelId: string;
  dataInicio: Date;
  dataTerminoPrevista: Date;
  dataTerminoReal?: Date;
  status: "pendente" | "em_andamento" | "concluida" | "cancelada";
  prioridade: "baixa" | "media" | "alta";
  comentarios?: Comentario[];
}

export interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  endereco?: string;
  cnpj?: string;
  contatoPrincipal?: string;
  projetos?: Projeto[];
  comentarios?: Comentario[];
}

export interface Lead {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  origem: string;
  status: "novo" | "qualificado" | "em_negociacao" | "convertido" | "perdido";
  dataContato: Date;
  vendedorId?: string;
  comentarios?: Comentario[];
}

export interface Orcamento {
  id: string;
  clienteId: string;
  projetoId?: string;
  dataCriacao: Date;
  dataValidade: Date;
  valorTotal: number;
  status: "pendente" | "aprovado" | "reprovado" | "aprovado_pelo_cliente" | "enviado_ao_cliente" | "em_revisao" | "rascunho" | "rejeitado_pelo_cliente";
  itens?: ItemOrcamento[];
  comentarios?: Comentario[];
  titulo?: string;
}

export interface ItemOrcamento {
  id: string;
  orcamentoId: string;
  nome: string;
  descricao?: string;
  quantidade: number;
  valorUnitario: number;
}

export interface Fornecedor {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  endereco?: string;
  cnpj?: string;
  contatoPrincipal?: string;
  segmento?: string;
  comentarios?: Comentario[];
}

export interface Equipe {
  id: string;
  nome: string;
  descricao?: string;
  membros?: Usuario[];
  projetos?: Projeto[];
  comentarios?: Comentario[];
}

export interface Comentario {
  id: string;
  autorId: string;
  dataCriacao: Date;
  texto: string;
}

export type StatusCompra = "pendente" | "parcialmente_recebida" | "recebida" | "cancelada";
export type StatusSolicitacao = "pendente" | "aprovada" | "reprovada" | "cancelada" | "concluida" | "parcialmente_aprovada" | "rejeitada";
export type PrioridadeSolicitacao = "baixa" | "media" | "alta" | "urgente";

export interface ItemSolicitacao {
  id: string;
  nome: string;
  quantidade: number;
  unidade: string;
  solicitacaoId: string;
  valorEstimado?: number;
  aprovado?: boolean;
  especificacoes?: string;
  descricao?: string;
  unidadeMedida?: string;
}

export interface ItemCompra {
  id: string;
  nome: string;
  quantidade: number;
  valorUnitario: number;
  unidade: string;
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
  itens: ItemCompra[];
}

export interface SolicitacaoCompra {
  id: string;
  solicitanteId: string;
  titulo: string;
  justificativa?: string;
  descricao?: string;
  status: StatusSolicitacao;
  urgente: boolean;
  dataSolicitacao: Date;
  dataAprovacao?: Date;
  projetoId?: string;
  itens: ItemSolicitacao[];
  prioridade: PrioridadeSolicitacao;
  comentarios: any[];
  aprovadorId?: string;
  observacoes?: string;
}

// User related types
export type User = Usuario;
export type UserRole = 'admin' | 'gestor' | 'supervisor' | 'rh' | 'operador' | 'cliente' | 'vendas' | 'comprador';

// Project related types
export type StatusProjeto = 'em_analise' | 'aguardando_aprovacao' | 'aprovado' | 'em_andamento' | 'em_pausa' | 'concluido' | 'cancelado';

// Task related types
export type StatusTarefa = 'pendente' | 'em_andamento' | 'em_revisao' | 'concluida' | 'bloqueada';
export type PrioridadeTarefa = 'baixa' | 'media' | 'alta' | 'urgente';

// Budget related types
export type StatusOrcamento = 'pendente' | 'aprovado' | 'reprovado' | 'aprovado_pelo_cliente' | 'enviado_ao_cliente' | 'em_revisao' | 'rascunho' | 'rejeitado_pelo_cliente';

// Financial types
export interface TransacaoFinanceira {
  id: string;
  tipo: 'receita' | 'despesa';
  valor: number;
  dataTransacao: Date;
  descricao: string;
  categoria: string;
  status: 'pendente' | 'concluida' | 'cancelada';
  projetoId?: string;
  arquivos?: string[];
}

// Chat types
export interface Mensagem {
  id: string;
  texto: string;
  remetenteId: string;
  destinatarioId: string;
  dataCriacao: Date;
  lida: boolean;
  anexos?: string[];
}

// Notification types
export type TipoNotificacao = 'info' | 'success' | 'warning' | 'error';
export type TipoReferencia = 'solicitacao' | 'orcamento' | 'projeto' | 'tarefa' | 'compra';

// Purchase request types
export type StatusSolicitacaoCompra = StatusSolicitacao;
