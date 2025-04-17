// Definição de tipos para o Aurora CRM Brasil

// Tipos de usuário
export type UserRole = 'admin' | 'gestor' | 'supervisor' | 'rh' | 'operador' | 'cliente' | 'vendas' | 'comprador';

// Interface de usuário
export interface User {
  id: string;
  nome: string;
  email: string;
  cargo: UserRole;
  avatar?: string;
  departamento?: string;
  telefone?: string;
  dataCriacao: Date;
  ultimoAcesso?: Date;
}

// Interface de cliente
export interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  empresa?: string;
  cnpj?: string;
  endereco?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  representante?: string;
  observacoes?: string;
  dataCadastro: Date;
  ultimoContato?: Date;
}

// Status de projeto
export type StatusProjeto = 
  | "em_analise" 
  | "aguardando_aprovacao" 
  | "aprovado" 
  | "em_andamento" 
  | "em_pausa" 
  | "concluido" 
  | "cancelado";

// Interface de projeto
export interface Projeto {
  id: string;
  titulo: string;
  clienteId: string;
  descricao: string;
  status: StatusProjeto;
  responsavelId: string;
  equipeIds: string[];
  dataInicio?: Date;
  dataPrevistaConclusao?: Date;
  dataConclusao?: Date;
  valorOrcado: number;
  valorAprovado?: number;
  etapas: Etapa[];
}

// Interface de etapa do projeto
export interface Etapa {
  id: string;
  projetoId: string;
  titulo: string;
  descricao?: string;
  status: StatusProjeto;
  responsavelId: string;
  dataInicio?: Date;
  dataConclusao?: Date;
  tarefas: Tarefa[];
}

// Status de tarefa
export type StatusTarefa = 
  | "pendente" 
  | "em_andamento" 
  | "em_revisao" 
  | "concluida" 
  | "bloqueada";

// Prioridade de tarefa
export type PrioridadeTarefa =
  | "baixa"
  | "media"
  | "alta"
  | "urgente";

// Interface de tarefa
export interface Tarefa {
  id: string;
  etapaId: string;
  titulo: string;
  descricao?: string;
  status: StatusTarefa;
  prioridade: PrioridadeTarefa;
  responsavelId: string;
  dataCriacao: Date;
  dataInicio?: Date;
  dataVencimento?: Date;
  dataConclusao?: Date;
  comentarios: Comentario[];
}

// Interface de comentário
export interface Comentario {
  id: string;
  referenciaId: string; // ID da tarefa, projeto, orçamento, etc.
  tipoReferencia: "tarefa" | "projeto" | "orcamento" | "compra";
  autorId: string;
  texto: string;
  dataCriacao: Date;
  anexos?: Anexo[];
}

// Interface de anexo
export interface Anexo {
  id: string;
  nome: string;
  url: string;
  tipo: string;
  tamanho: number;
  dataCriacao: Date;
}

// Status de orçamento
export type StatusOrcamento = 
  | "rascunho"
  | "enviado_ao_cliente"
  | "em_revisao"
  | "aprovado_pelo_cliente" 
  | "rejeitado_pelo_cliente"
  | "aguardando_modificacoes"
  | "cancelado";

// Interface de orçamento
export interface Orcamento {
  id: string;
  clienteId: string;
  titulo: string;
  descricao?: string;
  status: keyof StatusOrcamento;
  valorTotal: number;
  responsavelId: string;
  dataCriacao: Date;
  dataEnvio?: Date;
  dataAprovacao?: Date;
  dataValidade?: Date;
  itens: any[]; // Pode ser substituído por um tipo mais específico
  comentarios: any[]; // Pode ser substituído por um tipo mais específico
}

// Interface de item de orçamento
export interface ItemOrcamento {
  id: string;
  orcamentoId: string;
  descricao: string;
  quantidade: number;
  unidadeMedida: string;
  valorUnitario: number;
  valorTotal: number;
}

// Status de solicitação de compra
export type StatusSolicitacaoCompra = 
  | "rascunho"
  | "enviada"
  | "em_analise"
  | "aprovada"
  | "parcialmente_aprovada"
  | "rejeitada"
  | "cancelada";

// Interface de solicitação de compra
export interface SolicitacaoCompra {
  id: string;
  solicitanteId: string;
  responsavelAprovacaoId?: string;
  titulo: string;
  justificativa?: string;
  status: StatusSolicitacaoCompra;
  urgente: boolean;
  dataSolicitacao: Date;
  dataAprovacao?: Date;
  itens: ItemSolicitacaoCompra[];
  comentarios: Comentario[];
}

// Interface de item de solicitação de compra
export interface ItemSolicitacaoCompra {
  id: string;
  solicitacaoId: string;
  descricao: string;
  quantidade: number;
  unidadeMedida: string;
  valorEstimado?: number;
  aprovado?: boolean;
  quantidadeAprovada?: number;
  observacoes?: string;
}

// Status de compra
export type StatusCompra = 
  | "pendente" 
  | "parcialmente_recebida" 
  | "recebida" 
  | "cancelada";

// Interface de compra
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
  itens: any[]; // Pode ser substituído por um tipo mais específico
}

// Interface de item de compra
export interface ItemCompra {
  id: string;
  compraId: string;
  descricao: string;
  quantidade: number;
  unidadeMedida: string;
  valorUnitario: number;
  valorTotal: number;
  recebido: boolean;
  quantidadeRecebida?: number;
  dataRecebimento?: Date;
}

// Interface de fornecedor
export interface Fornecedor {
  id: string;
  nome: string;
  cnpj?: string;
  email?: string;
  telefone?: string;
  endereco?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  contato?: string;
  observacoes?: string;
  dataCadastro: Date;
}

// Interface de mensagem de chat
export interface Mensagem {
  id: string;
  conversaId: string;
  remetente: User;
  texto?: string;
  imagem?: string;
  dataCriacao: Date;
  lida: boolean;
}

// Interface de conversa
export interface Conversa {
  id: string;
  titulo?: string;
  participantes: User[];
  dataCriacao: Date;
  ultimaMensagem?: Mensagem;
  mensagens: Mensagem[];
}

// Permission structure for role-based access control
export interface Permission {
  id: string;
  name: string;
  description: string;
  key: string;
}

// User with permissions
export interface UserWithPermissions extends User {
  permissions: string[]; // Array of permission keys
}

// Interface for financial transactions
export interface TransacaoFinanceira {
  id: string;
  tipo: 'entrada' | 'saida';
  categoria: string;
  descricao: string;
  valor: number;
  dataPrevista: Date;
  dataEfetivada?: Date;
  status: 'pendente' | 'paga' | 'atrasada' | 'cancelada';
  referencia?: {
    tipo: 'fornecedor' | 'cliente' | 'funcionario' | 'projeto' | 'outro';
    id: string;
    nome: string;
  };
  comprovante?: string;
  observacoes?: string;
}

// Interface for team allocation
export interface AlocacaoEquipe {
  id: string;
  projetoId: string;
  membroId: string;
  dataInicio: Date;
  dataFim?: Date;
  horasDiarias?: number;
  observacoes?: string;
}

// Interface for notifications
export interface Notificacao {
  id: string;
  titulo: string;
  mensagem: string;
  tipo: "info" | "success" | "warning" | "error";
  lida: boolean;
  dataCriacao: Date;
  destinatarioIds: string[];
  dadosReferencia?: {
    tipo: "solicitacao" | "orcamento" | "compra" | "projeto" | "tarefa";
    id: string;
  };
}
