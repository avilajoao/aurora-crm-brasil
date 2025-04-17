
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Dashboard } from "./pages/Dashboard";
import { ProjetosPage } from "./pages/ProjetosPage";
import { ClientesPage } from "./pages/ClientesPage";
import { LeadsPage } from "./pages/LeadsPage";
import { OrcamentosPage } from "./pages/OrcamentosPage";
import { ComprasPage } from "./pages/ComprasPage";
import { SolicitacoesCompraPage } from "./pages/SolicitacoesCompraPage";
import { FornecedoresPage } from "./pages/FornecedoresPage";
import { EquipesPage } from "./pages/EquipesPage";
import { CalendarioPage } from "./pages/CalendarioPage";
import { TarefasPage } from "./pages/TarefasPage";
import { ChatPage } from "./pages/ChatPage";
import { ConfiguracoesPage } from "./pages/ConfiguracoesPage";
import { RelatoriosPage } from "./pages/RelatoriosPage";
import { UsuariosPage } from "./pages/UsuariosPage";
import { FinanceiroPage } from "./pages/FinanceiroPage";
import NotFound from "./pages/NotFound";

// Cria um novo cliente do React Query para gerenciamento de estado e cache
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        {/* Componentes de toast para notificações ao usuário */}
        <Toaster />
        <Sonner />
        {/* Configuração de rotas da aplicação */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/leads" element={<LeadsPage />} />
            <Route path="/clientes" element={<ClientesPage />} />
            <Route path="/projetos" element={<ProjetosPage />} />
            <Route path="/orcamentos" element={<OrcamentosPage />} />
            <Route path="/compras" element={<ComprasPage />} />
            <Route path="/compras/solicitacoes" element={<SolicitacoesCompraPage />} />
            <Route path="/fornecedores" element={<FornecedoresPage />} />
            <Route path="/equipes" element={<EquipesPage />} />
            <Route path="/calendario" element={<CalendarioPage />} />
            <Route path="/tarefas" element={<TarefasPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/configuracoes" element={<ConfiguracoesPage />} />
            <Route path="/relatorios" element={<RelatoriosPage />} />
            <Route path="/usuarios" element={<UsuariosPage />} />
            <Route path="/financeiro" element={<FinanceiroPage />} />
            {/* Rota 404 para páginas não encontradas */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
