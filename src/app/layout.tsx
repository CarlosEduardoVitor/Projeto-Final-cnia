
import './globals.css';
import { ReactNode } from "react";
import Providers from "../providers/Providers";
import { defaultLocale } from "../../i18n"; 
import { Toaster } from "sonner";

async function loadMessages(locale: string) {
    try {
        return (await import(`@/i18n/messages/${locale}.json`)).default;
    } catch (error) {
        return (await import(`@/i18n/messages/${defaultLocale}.json`)).default;
    }
}

export default async function RootLayout({ children }: { children: ReactNode }) {
    
    const locale = defaultLocale; 
    
    const messages = await loadMessages(locale);
    
    return (
        <html lang={locale} suppressHydrationWarning> 
            <body>
                <Toaster richColors position="top-right" />
                <Providers locale={locale} messages={messages}>{children}</Providers> 
            </body>
        </html>
    );
}