'use client'

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

const AuthForm = ({ type }: { type: 'login' | 'signin' }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Escuchar cambios en el estado de autenticación y manejar retorno de OAuth
  useEffect(() => {
    // Verificar si hay una sesión existente al cargar el componente
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        console.log('✅ Sesión existente encontrada, redirigiendo...')
        router.push('/crear-pedido')
      }
    }

    checkSession()

    // Escuchar cambios en la autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.email)
      
      if (event === 'SIGNED_IN' && session) {
        console.log('✅ Usuario autenticado exitosamente:', session.user.email)
        setLoading(false)
        router.push('/crear-pedido')
      } else if (event === 'SIGNED_OUT') {
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  const handleGoogleLogin = async () => {
    if (loading) return;
    
    try {
      setLoading(true);
      
      // Detectar si es móvil para ajustar la configuración
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // URL base para redirección
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
      
      console.log('Iniciando OAuth con Google...', { isMobile, baseUrl });
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${baseUrl}/signin`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          },
          // Configuración especial para móviles
          ...(isMobile && {
            skipBrowserRedirect: false,
            scopes: 'openid email profile'
          })
        }
      });
      
      if (error) {
        console.error('Error logging in with Google:', error.message);
        setLoading(false);
        // Mostrar error más amigable en móvil
        if (isMobile) {
          alert('Error al iniciar sesión. Por favor, intenta nuevamente.');
        }
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-16">
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg md:text-xl font-bold">🍽️</span>
              </div>
              <h1 className="text-lg md:text-2xl font-bold text-gray-800">
                Criollo Lovers
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/landing')}
                className="text-gray-600 hover:text-gray-800 transition-colors duration-200 cursor-pointer text-sm md:text-base"
              >
                Volver al inicio
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Form */}
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-64px)] px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-200 max-w-md w-full">
          <div className="text-center mb-6 md:mb-8">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <span className="text-white text-xl md:text-2xl">🍽️</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              {type === 'login' ? 'Bienvenido de vuelta' : 'Crear cuenta nueva'}
            </h1>
            <p className="text-sm md:text-base text-gray-600">
              {type === 'login' 
                ? 'Inicia sesión para continuar con tus pedidos' 
                : 'Regístrate para disfrutar de la mejor comida criolla'
              }
            </p>
          </div>

          <button 
            onClick={handleGoogleLogin} 
            disabled={loading}
            className={`w-full font-bold py-3 px-4 md:py-4 md:px-6 rounded-xl text-base md:text-lg transition-all duration-200 shadow-lg flex items-center justify-center space-x-3 cursor-pointer ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-orange-600 hover:bg-orange-700 text-white hover:shadow-xl transform hover:scale-105'
            }`}
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>
              {loading 
                ? 'Iniciando sesión...' 
                : type === 'login' 
                  ? 'Iniciar sesión con Google' 
                  : 'Crear cuenta con Google'
              }
            </span>
            {loading && (
              <div className="animate-spin rounded-full h-4 w-4 md:h-5 md:w-5 border-b-2 border-white"></div>
            )}
          </button>

          <div className="mt-5 md:mt-6 text-center">
            <p className="text-gray-500 text-xs md:text-sm">
              {type === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
              <button
                onClick={() => router.push(type === 'login' ? '/signin' : '/login')}
                className="text-orange-600 hover:text-orange-700 font-medium ml-1 cursor-pointer text-xs md:text-sm"
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
