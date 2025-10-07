// src/app/dashboard/page.tsx

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
// --- CORREÇÃO AQUI: Importando diretamente de sua pasta _components via alias @ ---
import LogoutButton from "./_components/logoutbutton" 

// --- Tipos Customizados ---
// Garante que o TypeScript reconheça os tipos customizados após a declaração em next-auth.d.ts
type UserType = 'PESCADOR' | 'TRAVESSANTE';

// Componente para exibir os dados do usuário
const UserDataCard = ({ user, userType }: { 
    user: any, 
    userType: UserType 
}) => {
  const isPescador = userType === 'PESCADOR';
  // Cores de destaque para diferenciar visualmente os perfis (ótimo para usabilidade!)
  const headerClass = isPescador ? 'bg-green-600' : 'bg-blue-600';
  const typeLabel = isPescador ? 'PESCADOR' : 'TRAVESSANTE';
  
  return (
    <div className="max-w-4xl p-6 mx-auto mt-8 bg-white rounded-xl shadow-lg">
      
      {/* Ponto de Observação 3: Identificação de Perfil */}
      <header className={`p-4 text-white rounded-t-xl ${headerClass}`}>
        <h2 className="text-2xl font-bold">Perfil de Acesso: {typeLabel}</h2>
        <p className="text-sm">Logado como: {user.email}</p>
      </header>
      
      <div className="p-6 space-y-6">
        <h3 className="text-xl font-extrabold text-gray-800 border-b pb-2">Dados do Cadastro</h3>
        
        {/* Ponto de Observação 4: Encontrando Dados - Layout em Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
            <p className="text-sm font-medium text-gray-500">Nome Completo</p>
            <p className="text-lg font-bold text-gray-900">{user.name}</p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
            <p className="text-sm font-medium text-gray-500">Tipo de Usuário</p>
            <p className="text-lg font-bold text-gray-900 uppercase">{typeLabel}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
            <p className="text-sm font-medium text-gray-500">Idade</p>
            <p className="text-lg font-bold text-gray-900">{user.age || 'Não Informada'}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
            <p className="text-sm font-medium text-gray-500">Membro Desde (Data de Cadastro)</p>
            <p className="text-lg font-bold text-gray-900">
              {new Date(user.createdAt).toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 mt-6 border-t border-gray-200">
        <h3 className="text-xl font-extrabold text-gray-800 mb-4">Área de Ações</h3>
        {/* Ponto de Observação 4: Ação Crítica (Simulada) */}
        {isPescador ? (
          <div className="space-y-3">
            <button className="w-full md:w-auto px-6 py-3 text-white bg-green-500 rounded-lg hover:bg-green-600 transition duration-200 font-semibold">
              Solicitar/Renovar Autorização de Pesca
            </button>
            <p className="text-sm text-gray-500 mt-1">
                Acesse aqui a gestão de suas permissões.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <button className="w-full md:w-auto px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200 font-semibold">
              Gerenciar Documentos (Travessante)
            </button>
            <p className="text-sm text-gray-500 mt-1">
                Visualize ou atualize seus documentos de identificação.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Página Principal do Dashboard ---
export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // Ponto de Observação 2: Proteção de Rota (Redireciona para o login se não houver sessão)
  if (!session || !session.user?.email) {
    redirect('/login');
  }

  // Busca dados completos do usuário no banco (Prisma)
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    // Se a sessão existe mas o usuário foi deletado do banco, redireciona para login
    redirect('/login'); 
  }
  
  // O userType é acessado via token/session, que configuramos em lib/auth.ts
  const userType = session.user.userType; 

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900">
            Bem-vindo(a), {user.name.split(' ')[0]}!
        </h1>
        <p className="text-gray-600">
            Esta é sua área exclusiva na Plataforma Oceanlink.
        </p>

        {/* Exibe o Card de Dados baseado no perfil */}
        <UserDataCard user={user} userType={userType as UserType} />

        {/* Ponto de Observação 5: Botão de Logout */}
        <div className="max-w-4xl mx-auto mt-6">
            <LogoutButton /> 
        </div>
      </div>
    </main>
  );
}