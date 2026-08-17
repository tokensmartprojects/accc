import { AppHeader } from "@/components/layout/AppHeader";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { WrongNetworkModal } from "@/components/wallet/WalletControls";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <AppHeader />
      <WrongNetworkModal />
      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-8 md:px-8 lg:px-12">
        {children}
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}
