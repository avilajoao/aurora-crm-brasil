
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
