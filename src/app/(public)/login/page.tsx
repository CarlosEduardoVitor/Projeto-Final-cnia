"use client";

import { useLogin } from "@/features/auth/hooks/useLogin";
import { useTranslations } from "next-intl"; 
import { toast } from "sonner"; 

export default function Login() {
  const t = useTranslations("Auth"); 
  const { emailLogin, passwordLogin, setEmailLogin, setPasswordLogin, handleLogin, loading } =
    useLogin();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

  const loginPromise = handleLogin(); 

  await toast.promise(loginPromise, {
    loading: t('login_pending'),
    success: (msg) => msg, 
    error: (err) => err.message, 
  });
};


  return (
    <div className="bg-gray-100 dark:bg-gray-900 w-full min-h-[calc(100vh-56px)] flex justify-center items-center p-4">
      <form 
        onSubmit={handleLoginSubmit} 
        className="flex flex-col bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-sm gap-4 text-gray-900 dark:text-gray-100"
      >
        <h2 className="text-3xl font-bold text-center text-green-600 dark:text-green-500 mb-4">
          {t('login_title') || 'Login'}
        </h2>

        <label className="font-medium text-sm">{t('login_email_label')}</label> 
        <input
          type="email"
          placeholder={t('login_email_placeholder')}
          value={emailLogin}
          onChange={(e) => setEmailLogin(e.target.value)}
          className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-green-500 focus:border-green-500 transition-colors"
          required
        />
        
        <label className="font-medium text-sm mt-2">{t('login_password_label')}</label> 
        <input
          type="password"
          placeholder={t('login_password_placeholder')}
          value={passwordLogin}
          onChange={(e) => setPasswordLogin(e.target.value)}
          className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-green-500 focus:border-green-500 transition-colors"
          required
        />
        
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? t('login_pending') : t('login_button')} 
        </button>
      </form>
    </div>
  );
}