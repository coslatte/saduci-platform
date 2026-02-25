import { Footer } from "@/components/organisms/Footer";

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Bienvenido al Dashboard de Sadeci Platform.</p>
      </main>
      <Footer />
    </div>
  );
}