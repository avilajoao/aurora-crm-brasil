
import { useState } from "react";
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  User, 
  Building, 
  Bell, 
  Shield, 
  Users, 
  Mail, 
  Smartphone,
  Save
} from 'lucide-react';

export function ConfiguracoesPage() {
  const [notificacoesEmail, setNotificacoesEmail] = useState(true);
  const [notificacoesPush, setNotificacoesPush] = useState(true);
  const [notificacoesMensagens, setNotificacoesMensagens] = useState(true);
  const [notificacoesTarefas, setNotificacoesTarefas] = useState(true);
  const [modoEscuro, setModoEscuro] = useState(false);

  return (
    <AppLayout>
      <div className="container py-6 space-y-8 max-w-6xl">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
          <p className="text-muted-foreground">Gerencie as configurações do sistema</p>
        </div>

        <Tabs defaultValue="perfil">
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2">
            <TabsTrigger value="perfil">Perfil</TabsTrigger>
            <TabsTrigger value="empresa">Empresa</TabsTrigger>
            <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
            <TabsTrigger value="seguranca">Segurança</TabsTrigger>
            <TabsTrigger value="equipe">Equipe</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="perfil">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" /> Informações de Perfil
                  </CardTitle>
                  <CardDescription>
                    Atualize suas informações pessoais e de contato
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome Completo</Label>
                      <Input id="nome" defaultValue="Usuário Exemplo" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input id="email" type="email" defaultValue="usuario@auroracrm.com.br" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cargo">Cargo</Label>
                      <Input id="cargo" defaultValue="Gestor" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input id="telefone" defaultValue="(11) 98765-4321" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="bio">Biografia</Label>
                      <Input id="bio" defaultValue="Gestor de projetos com 5 anos de experiência em construção civil." />
                    </div>
                  </div>
                  <Button className="mt-4">
                    <Save className="mr-2 h-4 w-4" /> Salvar Alterações
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="empresa">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" /> Informações da Empresa
                  </CardTitle>
                  <CardDescription>
                    Configure informações gerais da sua empresa
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nomeEmpresa">Nome da Empresa</Label>
                      <Input id="nomeEmpresa" defaultValue="Aurora CRM Brasil" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cnpj">CNPJ</Label>
                      <Input id="cnpj" defaultValue="12.345.678/0001-90" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="endereco">Endereço</Label>
                      <Input id="endereco" defaultValue="Av. Paulista, 1000, São Paulo - SP" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emailEmpresa">E-mail de Contato</Label>
                      <Input id="emailEmpresa" type="email" defaultValue="contato@auroracrm.com.br" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefoneEmpresa">Telefone</Label>
                      <Input id="telefoneEmpresa" defaultValue="(11) 3456-7890" />
                    </div>
                  </div>
                  <Button className="mt-4">
                    <Save className="mr-2 h-4 w-4" /> Salvar Alterações
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notificacoes">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" /> Preferências de Notificação
                  </CardTitle>
                  <CardDescription>
                    Configure como e quando deseja receber notificações
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <Label htmlFor="notificacoesEmail">Notificações por E-mail</Label>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Receba atualizações importantes por e-mail
                        </p>
                      </div>
                      <Switch
                        id="notificacoesEmail"
                        checked={notificacoesEmail}
                        onCheckedChange={setNotificacoesEmail}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-4 w-4" />
                          <Label htmlFor="notificacoesPush">Notificações Push</Label>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Receba notificações em tempo real no navegador
                        </p>
                      </div>
                      <Switch
                        id="notificacoesPush"
                        checked={notificacoesPush}
                        onCheckedChange={setNotificacoesPush}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="notificacoesMensagens">Novas Mensagens</Label>
                        <p className="text-sm text-muted-foreground">
                          Notificações quando receber novas mensagens
                        </p>
                      </div>
                      <Switch
                        id="notificacoesMensagens"
                        checked={notificacoesMensagens}
                        onCheckedChange={setNotificacoesMensagens}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="notificacoesTarefas">Tarefas e Prazos</Label>
                        <p className="text-sm text-muted-foreground">
                          Lembretes sobre tarefas e prazos
                        </p>
                      </div>
                      <Switch
                        id="notificacoesTarefas"
                        checked={notificacoesTarefas}
                        onCheckedChange={setNotificacoesTarefas}
                      />
                    </div>
                  </div>
                  <Button>
                    <Save className="mr-2 h-4 w-4" /> Salvar Preferências
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="seguranca">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" /> Segurança
                  </CardTitle>
                  <CardDescription>
                    Gerencie sua senha e configurações de segurança
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="senha-atual">Senha Atual</Label>
                      <Input id="senha-atual" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nova-senha">Nova Senha</Label>
                      <Input id="nova-senha" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmar-senha">Confirmar Nova Senha</Label>
                      <Input id="confirmar-senha" type="password" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <div className="space-y-0.5">
                      <Label htmlFor="modoEscuro">Modo Escuro</Label>
                      <p className="text-sm text-muted-foreground">
                        Ativar tema escuro para o sistema
                      </p>
                    </div>
                    <Switch
                      id="modoEscuro"
                      checked={modoEscuro}
                      onCheckedChange={setModoEscuro}
                    />
                  </div>
                  <Button className="mt-4">
                    <Save className="mr-2 h-4 w-4" /> Salvar Alterações
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="equipe">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" /> Gerenciamento de Equipe
                  </CardTitle>
                  <CardDescription>
                    Adicione e gerencie membros da sua equipe
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Funcionalidade disponível apenas para administradores do sistema.</p>
                  <Button className="mt-4" variant="outline">
                    <Users className="mr-2 h-4 w-4" /> Solicitar Acesso de Administrador
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </AppLayout>
  );
}
