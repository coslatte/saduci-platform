import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { cleanup } from "@testing-library/react";
import { afterEach, mock } from "bun:test";
GlobalRegistrator.register();

// Stable stubs for Next.js hooks — prevents "app router not mounted" errors
// in any test that renders components using next/navigation.
mock.module("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({
    back: () => {},
    push: () => {},
    replace: () => {},
    prefetch: () => {},
    forward: () => {},
  }),
  useSearchParams: () => new URLSearchParams(),
}));

afterEach(() => {
  cleanup();
  document.body.innerHTML = "";
});
