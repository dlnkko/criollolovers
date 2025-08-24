'use client'

import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

const AuthForm = ({ type }: { type: 'login' | 'signin' }) => {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/crear-pedido`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      });
      if (error) {
        console.error('Error logging in with Google:', error.message);
      }
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">🍽️</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">
                Criollo Lovers
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/landing')}
                className="text-gray-600 hover:text-gray-800 transition-colors duration-200 cursor-pointer"
              >
                Volver al inicio
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Form */}
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-64px)] px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🍽️</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {type === 'login' ? 'Bienvenido de vuelta' : 'Crear cuenta nueva'}
            </h1>
            <p className="text-gray-600">
              {type === 'login' 
                ? 'Inicia sesión para continuar con tus pedidos' 
                : 'Regístrate para disfrutar de la mejor comida criolla'
              }
            </p>
          </div>

          <button 
            onClick={handleGoogleLogin} 
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer flex items-center justify-center space-x-3"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>
              {type === 'login' ? 'Iniciar sesión con Google' : 'Crear cuenta con Google'}
            </span>
          </button>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              {type === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
              <button
                onClick={() => router.push(type === 'login' ? '/signin' : '/login')}
                className="text-orange-600 hover:text-orange-700 font-medium ml-1 cursor-pointer"
              >
                {type === 'login' ? 'Crear cuenta' : 'Iniciar sesión'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
