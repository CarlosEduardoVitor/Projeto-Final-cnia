"use client";

import { useRegister } from "@/features/auth/hooks/useRegister";
import { useTranslations } from "next-intl"; 
import { toast } from "sonner"; /

export default function Register() {
  const t = useTranslations("Auth"); 
  const { name, email, password, confirmPassword, setName, setEmail, setPassword, setConfirmPassword, handleRegister, loading } =
    useRegister();

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error(t('toast_passwords_not_match') || 'As senhas não coincidem.');
      return;
    }
    
    const registerPromise = handleRegister(e);

    await toast.promise(registerPromise, {
      loading: t('register_pending'),
      success: () => {
        // A navegação geralmente ocorre dentro do hook handleRegister em caso de sucesso
        return t('toast_register_success') || 'Registro realizado com sucesso!';
      },
      error: (err) => {
        // Captura o erro lançado pelo useRegister
        const message = err.response?.data?.message || t('toast_register_error') || 'Erro ao tentar registrar o usuário.';
        return message;
      },
    });
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 w-full min-h-[calc(100vh-56px)] flex justify-center items-center p-4">
      <form
        onSubmit={handleRegisterSubmit}
        className="flex flex-col bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-sm gap-4 text-gray-900 dark:text-gray-100"
      >
        <h2 className="text-3xl font-bold text-center text-green-600 dark:text-green-500 mb-4">
          {t('register_title') || 'Criar Conta'}
        </h2>

        <label className="font-medium text-sm">{t('register_name_label')}</label>
        <input
          type="text"
          placeholder={t('register_name_placeholder')}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-green-500 focus:border-green-500 transition-colors"
          required
        />
        
        <label className="font-medium text-sm">{t('login_email_label')}</label>
        <input
          type="email"
          placeholder={t('login_email_placeholder')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-green-500 focus:border-green-500 transition-colors"
          required
        />
        
        <label className="font-medium text-sm">{t('login_password_label')}</label>
        <input
          type="password"
          placeholder={t('login_password_placeholder')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-green-500 focus:border-green-500 transition-colors"
          required
        />
        
        <label className="font-medium text-sm">{t('register_confirm_password_placeholder')}</label>
        <input
          type="password"
          placeholder={t('register_confirm_password_placeholder')}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-green-500 focus:border-green-500 transition-colors"
          required
        />
        
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? t('register_pending') : t('register_button')}
        </button>
      </form>
    </div>
  );
}