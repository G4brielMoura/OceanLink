// src/app/login/_components/login-form.tsx
// src/app/login/_components/login-form.tsx
'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn } from 'lucide-react'; 

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    setIsLoading(false);

    if (result?.error) {
      // Mensagem clara para o Ponto de Observação 2 do Teste de Usabilidade
      setError('Credenciais inválidas. Verifique seu e-mail e senha. (Erro de Login)');
    } else {
      // Redireciona para o Dashboard em caso de sucesso
      router.push('/dashboard');
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold text-gray-800">Acesse sua Conta</h2>
      
      {error && (
        <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="login-email" className="block text-sm font-medium text-gray-700">
          E-mail
        </label>
        <input
          id="login-email"
          name="email"
          type="email"
          required
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">
          Senha
        </label>
        <input
          id="login-password"
          name="password"
          type="password"
          required
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center items-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400"
        disabled={isLoading}
      >
        {isLoading ? (
          'Entrando...' 
        ) : (
          <>
            <LogIn className="w-5 h-5 mr-2" />
            Entrar
          </>
        )}
      </button>
      
      <p className="text-xs text-center text-gray-500 mt-4">
        Credenciais de Teste: pescador@teste.com ou travessante@teste.com (senha: 123456)
      </p>
    </form>
  );
}