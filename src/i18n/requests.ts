import { cookies, headers } from "next/headers";
import { getRequestConfig } from "next-intl/server"

export default getRequestConfig(async () => {
  const cookiesStore = await cookies();
  const headersList = await headers();

  const cookieLocale = cookiesStore.get('locale')?.value;
  const acceptLanguage = headersList.get('accept-language') || '';
  const detectedBrowserLang = acceptLanguage.split(',')[0].toLowerCase();

  const mapLocale = (lang: string): string => {
    if (lang.startsWith('pt')) return 'pt';
    if (lang.startsWith('en')) return 'en';
    if (lang.startsWith('es')) return 'es';
    return 'pt';
  };

  const locale = mapLocale(cookieLocale || detectedBrowserLang);

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});