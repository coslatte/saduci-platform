"use client";

import LoginForm from "./components/LoginForm";
import LoginHero from "./components/LoginHero";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-primary-50 via-white to-secondary-50">
      <div className="w-full max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center">
            <LoginForm />
          </div>

          <div className="hidden md:flex justify-center">
            <LoginHero />
          </div>
        </div>
      </div>
    </div>
  );
}
