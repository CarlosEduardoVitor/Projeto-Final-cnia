// next-intl.config.js (na raiz)
/** @type {import('next-intl').NextIntlConfig} */
module.exports = {
  // Configurações que o getLocale precisa ler
  locales: ["pt", "en"],
  defaultLocale: "pt",
  messagesDirectory: "./src/i18n/messages",
};