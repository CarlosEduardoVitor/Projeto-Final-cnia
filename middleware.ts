// middleware.ts
import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n"; // Importe suas configs

export default createMiddleware({
  locales,
  defaultLocale,
  // 🎯 A CHAVE: Define que a localidade não deve prefixar a URL
  localePrefix: 'never' // <--- ADICIONE ESTA LINHA
});

export const config = {
  // Ajuste o matcher para capturar todas as rotas
  matcher: ["/((?!api|_next|.*\\..*).*)"] 
};