'use client';

import { PrivyProvider } from '@privy-io/react-auth';

export default function ClientPrivyProvider({ children }: { children: React.ReactNode }) {
    return (
        <PrivyProvider
            key="privy-provider"
            appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
            config={{
                loginMethods: ['wallet', 'email', 'sms'],
                appearance: { theme: 'light' },
            }}
        >
            {children}
        </PrivyProvider>
    );
}
