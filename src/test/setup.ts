import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { cleanup } from "@testing-library/react";
import { afterEach, mock } from "bun:test";

GlobalRegistrator.register();

// Provide a default mock for `next/navigation` so components using the App
// Router (useRouter, usePathname, useSearchParams) do not throw during tests.
// Individual tests may override this mock if they need custom behavior.
try {
  if (typeof mock?.module === "function") {
    mock.module("next/navigation", () => ({
      usePathname: () => "/",
      useRouter: () => ({ back: () => {}, push: () => {}, replace: () => {} }),
      useSearchParams: () => new URLSearchParams(),
      redirect: () => {},
    }));
  }
} catch {
  // ignore when not running under Bun test environment
}

afterEach(() => {
  cleanup();
  GlobalRegistrator.unregister();
  GlobalRegistrator.register();
});
