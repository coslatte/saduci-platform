/* eslint-disable @next/next/no-img-element */

import "../../setup";
import { render } from "@testing-library/react";
import { describe, expect, it, mock } from "bun:test";

type ImageMockProps = {
  src: string;
  alt?: string;
  className?: string;
};

mock.module("next/image", () => ({
  default: (props: ImageMockProps) => (
    <img src={props.src} alt={props.alt ?? ""} className={props.className} />
  ),
}));

mock.module("@/lib/auth", () => ({
  useAuth: () => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    token: null,
    login: async () => {},
    logout: () => {},
  }),
}));

import LoginPage from "@/app/login/page";

describe("LoginPage", () => {
  it("gives the hero more space on large screens", () => {
    const { container } = render(<LoginPage />);

    const root = container.firstElementChild;
    expect(root?.className.includes("min-h-screen")).toBe(true);

    const grid = container.querySelector(".grid");
    expect(grid?.className.includes("md:grid-cols-2")).toBe(true);
    expect(
      grid?.className.includes(
        "lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)]",
      ),
    ).toBe(true);

    const heroWrapper = Array.from(container.querySelectorAll("div")).find(
      (node) =>
        node.className.includes("hidden md:flex") &&
        node.className.includes("lg:justify-end"),
    );

    expect(heroWrapper).toBeTruthy();
    expect(container.querySelector("img")).toBeTruthy();
  });
});
