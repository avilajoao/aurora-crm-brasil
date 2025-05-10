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
  tipo: "info" | "alerta" | "erro";
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
  status: "pendente" | "aprovado" | "reprovado";
  itens?: ItemOrcamento[];
  comentarios?: Comentario[];
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
export type StatusSolicitacao = "pendente" | "aprovada" | "reprovada" | "cancelada" | "concluida";
export type PrioridadeSolicitacao = "baixa" | "media" | "alta" | "urgente";

export interface ItemSolicitacao {
  id: string;
  nome: string;
  quantidade: number;
  unidade: string;
  solicitacaoId: string;
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
  status: StatusSolicitacao;
  urgente: boolean;
  dataSolicitacao: Date;
  dataAprovacao?: Date;
  projetoId?: string;
  itens: ItemSolicitacao[];
  prioridade: PrioridadeSolicitacao;
  comentarios: any[];
}
