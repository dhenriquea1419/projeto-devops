import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'vendedor' | 'representante' | 'admin';
}

const AuthContext = createContext<{
  user: User | null;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}>({} as any);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Usuários de exemplo (simulação de banco de dados)
  const validUsers = [
    {
      id: '1',
      email: 'vendedor@farmacia.com',
      password: '123456',
      name: 'João Vendedor',
      role: 'vendedor' as const,
    },
    {
      id: '2',
      email: 'representante@farmacia.com',
      password: '123456',
      name: 'Maria Representante',
      role: 'representante' as const,
    },
    {
      id: '3',
      email: 'admin@farmacia.com',
      password: '123456',
      name: 'Admin Farmácia',
      role: 'admin' as const,
    },
  ];

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Simula delay de requisição
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const foundUser = validUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (!foundUser) {
        throw new Error('Email ou senha incorretos');
      }

      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, error, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);